import express from 'express';
import { placeOrder, placeOrderRazorpay, placeOrderStripe, adminOrder, getOrder, updateOrderStatus } from '../controllers/orderController.js';
import adminAuth from '../middleware/adminauth.js';
import auth from '../middleware/auth.js';


const orderRouter = express.Router();

//Admin Routes
orderRouter.get('/list', adminAuth, adminOrder);
orderRouter.post('/status', adminAuth, updateOrderStatus);

// Payment Routes
orderRouter.post('/place', auth, placeOrder);
orderRouter.post('/stripe', auth, placeOrderStripe);
orderRouter.post('/razorpay', auth, placeOrderRazorpay);

// User Routes
orderRouter.get('/user-order', auth, getOrder);

export default orderRouter;