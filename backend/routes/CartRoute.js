import express from 'express';
import { addToCart, getCart, UpdateCart } from '../controllers/CartController.js';
import auth from '../middleware/auth.js';

const cartRouter = express.Router();

cartRouter.post('/add', auth, addToCart);
cartRouter.post('/update', auth, UpdateCart);
cartRouter.post('/get', auth, getCart);

export default cartRouter;