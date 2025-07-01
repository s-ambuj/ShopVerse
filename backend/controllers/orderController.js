import OrderModel from "../models/orderModel.js"
import userModel from "../models/userModel.js";
import Stripe from "stripe";
import Razorpay from "razorpay";


const currency = "INR";
const deliveryCharges = 10;
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

//Place Order Controller
const placeOrder = async (req, res) => {

    try {
        const { items, amount, address} = req.body;
        const userId = req.body.userId;
        const orderData = {
            userId,
            items,
            amount,
            paymentMethod:"COD",
            payment:false,
            date: Date.now(),
            address,
        }

        const newOrder = new OrderModel(orderData);
        await newOrder.save();

        await userModel.findByIdAndUpdate(userId, {cartData: {}});
        res.json({ success: true, message: "Order placed successfully"});
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
        
    }
}


// Place Order with Stripe
const placeOrderStripe = async (req, res) => {

    try {
        const { items, amount, address} = req.body;
        const userId = req.body.userId;
        const { origin } = req.headers;

        const orderData = {
            userId,
            items,
            amount,
            paymentMethod:"Stripe",
            payment:false,
            date: Date.now(),
            address,
        }

        const newOrder = new OrderModel(orderData);
        await newOrder.save();

        const lineItems = items.map((item) => ({
            price_data: {
                currency: currency,
                product_data: {
                    name: item.name,
                    images: [Array.isArray(item.image) ? item.image[0] : item.image],
                },
                unit_amount: item.price * 100,
            },
            quantity: item.quantity,
        }));

        lineItems.push({
            price_data: {
                currency: currency,
                product_data: {
                    name: "Shipping Charges",
                },
                unit_amount: deliveryCharges * 100,
            },
            quantity: 1,
        });

        const session = await stripe.checkout.sessions.create({
            success_url: `${origin}/verify?success=true&orderId=${newOrder._id}`,
            cancel_url: `${origin}/verify?success=false&orderId=${newOrder._id}`,
            line_items: lineItems,
            mode: "payment",
        });

        res.json({ success: true, session_url: session.url });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}

// Verify Order with Stripe
const verifyOrderStripe = async (req, res) => {

    const { orderId, success } = req.body;
    const userId = req.body.userId;

    try {
        if (success) {
            await OrderModel.findByIdAndUpdate(orderId, { payment: true, status: "Order Placed" });
            await userModel.findByIdAndUpdate(userId, { cartData: {} });
            res.json({ success: true, message: "Order placed successfully" });
        } else {
            await OrderModel.findByIdAndUpdate(orderId, { payment: false, status: "Order Failed" });
            res.json({ success: false, message: "Order failed" });
        }
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}

// Place Order with Razorpay
const placeOrderRazorpay = async (req, res) => {
}

// Admin Order Controller
const adminOrder = async (req, res) => {

    try {
        const orders = await OrderModel.find({})
        res.json({success: true, orders})
    } catch (error) {
        console.log(error);
        res.json({success: false, message:error.message})
    }
}

// Get Order Controller
const getOrder = async (req, res) => {

    try {
        const userId = req.body.userId;
        const orders = await OrderModel.find({ userId })
        res.json({success: true, orders})
    } catch (error) {
        console.log(error);
        res.json({success: false, message: error.message});
    }
}


// Update Order Status Controller
const updateOrderStatus = async (req, res) => {

    try {
        const { orderId, status } = req.body;
        await OrderModel.findByIdAndUpdate(orderId, { status });
        res.json({success:true, message:"Status Updated"})
    } catch (error) {
        console.log(error);
        res.json({success:false, message:error.message})
        
    }
}

export { placeOrder, placeOrderStripe, placeOrderRazorpay, adminOrder, getOrder, updateOrderStatus, verifyOrderStripe };