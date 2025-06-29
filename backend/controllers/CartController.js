import userModel from "../models/userModel.js";

// Adding a new item to the cart
const addToCart = async (req, res) => {
  try {
    const { itemId, size } = req.body;
    const userId = req.body.userId;

    const userData = await userModel.findById(userId);
    let cartData = userData.cartData || {};

    if (cartData[itemId]) {
      cartData[itemId][size] = (cartData[itemId][size] || 0) + 1;
    } else {
      cartData[itemId] = { [size]: 1 };
    }

    await userModel.findByIdAndUpdate(userId, { cartData });
    res.json({ success: true, message: "Item added to cart successfully" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// Updating the cart with new items or quantities
const UpdateCart = async (req, res) => {
  try {
    const { itemId, size, quantity } = req.body;
    const userId = req.body.userId;

    const userData = await userModel.findById(userId);
    let cartData = userData.cartData || {};

    if (!cartData[itemId]) cartData[itemId] = {};
    cartData[itemId][size] = quantity;

    await userModel.findByIdAndUpdate(userId, { cartData });
    res.json({ success: true, message: "Cart updated successfully" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// Fetching the current cart items
const getCart = async (req, res) => {
  try {
    const userId = req.body.userId;
    const userData = await userModel.findById(userId);
    const cartData = userData.cartData || {};

    res.json({ success: true, cartData });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export { addToCart, UpdateCart, getCart };