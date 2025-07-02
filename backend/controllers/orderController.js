import OrderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import Stripe from "stripe";
import Razorpay from "razorpay";


const currency = "INR";
const deliveryCharges = 10;

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_SECRET_KEY,
});

//Place Order Controller
const placeOrder = async (req, res) => {
  try {
    const { items, amount, address } = req.body;
    const userId = req.userId;
    const updatedItems = items.map((item) => ({
      ...item,
      status: "Order Placed",
    }));

    const orderData = {
      userId,
      items: updatedItems,

      amount,
      paymentMethod: "COD",
      payment: false,
      date: Date.now(),
      address,
    };

    const newOrder = new OrderModel(orderData);
    await newOrder.save();

    await userModel.findByIdAndUpdate(userId, { cartData: {} });
    res.json({ success: true, message: "Order placed successfully" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// Place Order with Stripe
const placeOrderStripe = async (req, res) => {
  try {
    const { items, amount, address } = req.body;
    const userId = req.userId;
    const { origin } = req.headers;

    const updatedItems = items.map((item) => ({
      ...item,
      status: "Order Placed",
    }));

    const orderData = {
      userId,
      items: updatedItems,

      amount,
      paymentMethod: "Stripe",
      payment: false,
      date: Date.now(),
      address,
    };

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
};

// Verify Order with Stripe
const verifyOrderStripe = async (req, res) => {
  const { orderId, success } = req.body;
  const userId = req.userId;

  try {
    if (success) {
      await OrderModel.findByIdAndUpdate(orderId, {
        payment: true,
        status: "Order Placed",
      });
      await userModel.findByIdAndUpdate(userId, { cartData: {} });
      res.json({ success: true, message: "Order placed successfully" });
    } else {
      await OrderModel.findByIdAndUpdate(orderId, {
        payment: false,
        status: "Order Failed",
      });
      res.json({ success: false, message: "Order failed" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// Place Order with Razorpay
const placeOrderRazorpay = async (req, res) => {
  try {
    const { items, amount, address } = req.body;
    const userId = req.userId;

    const updatedItems = items.map((item) => ({
      ...item,
      status: "Order Placed",
    }));

    const orderData = {
      userId,
      items: updatedItems,

      amount,
      paymentMethod: "Razorpay",
      payment: false,
      date: Date.now(),
      address,
    };

    const newOrder = new OrderModel(orderData);
    await newOrder.save();

    const options = {
      amount: (amount + deliveryCharges) * 100,
      currency: currency,
      receipt: newOrder._id.toString(),
    };

    await razorpay.orders.create(options, (error, order) => {
      if (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
      } else {
        res.json({ success: true, order });
      }
    });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// Verify Razorpay Order
const verifyrazorpay = async (req, res) => {
  try {
    const { razorpay_order_id } = req.body;
    const userId = req.userId;

    const orderInfo = await razorpay.orders.fetch(razorpay_order_id);
    if (orderInfo.status === "paid") {
      await OrderModel.findByIdAndUpdate(orderInfo.receipt, { payment: true });
      await userModel.findByIdAndUpdate(userId, { cartData: {} });
      res.json({ success: true, message: "Order placed successfully" });
    } else {
      res.json({ success: false, message: "Order failed" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// Admin Order Controller
const adminOrder = async (req, res) => {
  try {
    const orders = await OrderModel.find({});
    res.json({ success: true, orders });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// Get Order Controller
const getOrder = async (req, res) => {
  try {
    const userId = req.userId;
    const orders = await OrderModel.find({ userId });
    res.json({ success: true, orders });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// Update Order Status Controller
const updateOrderStatus = async (req, res) => {
  try {
    const { orderId, status } = req.body;
    await OrderModel.findByIdAndUpdate(orderId, { status });
    res.json({ success: true, message: "Status Updated" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// Cancel Order Controller
const cancelOrder = async (req, res) => {
  const { itemId } = req.body;
  const userId = req.userId;

  try {
    const userOrders = await OrderModel.find({ userId });

    for (let order of userOrders) {
      const itemIndex = order.items.findIndex(item => item._id.toString() === itemId);
      if (itemIndex !== -1) {
        const itemStatus = order.items[itemIndex].status;

        const nonCancelableStatuses = ["In Transit", "Out for Delivery", "Delivered", "Cancelled"];
        if (nonCancelableStatuses.includes(itemStatus)) {
          return res.json({ success: false, message: `Cannot cancel order with status "${itemStatus}"` });
        }

        order.items[itemIndex].status = "Cancelled";
        await order.save();
        return res.json({ success: true, message: "Order cancelled successfully" });
      }
    }

    res.json({ success: false, message: "Item not found in your orders" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};


export {
  placeOrder,
  placeOrderStripe,
  placeOrderRazorpay,
  cancelOrder,
  adminOrder,
  getOrder,
  updateOrderStatus,
  verifyOrderStripe,
  verifyrazorpay,
};
