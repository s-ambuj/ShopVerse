import OrderModel from "../models/orderModel.js"
import userModel from "../models/userModel.js";

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

export { placeOrder, placeOrderStripe, placeOrderRazorpay, adminOrder, getOrder, updateOrderStatus };