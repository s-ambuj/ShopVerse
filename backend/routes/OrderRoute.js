import express from 'express';
import { placeOrder, placeOrderRazorpay, placeOrderStripe, adminOrder, getOrder, updateOrderStatus, verifyOrderStripe, verifyrazorpay, cancelOrder } from '../controllers/orderController.js';
import adminAuth from '../middleware/adminauth.js';
import auth from '../middleware/auth.js';


const orderRouter = express.Router();

//Admin Routes
orderRouter.post('/list', adminAuth, adminOrder);
orderRouter.post('/status', adminAuth, updateOrderStatus);

// Payment Routes
orderRouter.post('/place', auth, placeOrder);
orderRouter.post('/stripe', auth, placeOrderStripe);
orderRouter.post('/razorpay', auth, placeOrderRazorpay);

// User Routes
orderRouter.post('/userorders', auth, getOrder);
orderRouter.post('/cancel', auth, cancelOrder);

// Verify Order
orderRouter.post('/verifystripe', auth, verifyOrderStripe);
orderRouter.post('/verifyrazorpay', auth, verifyrazorpay);

export default orderRouter;