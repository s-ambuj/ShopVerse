import userModel from "../models/userModel.js";
//Adding a new item to the cart

const addToCart = async (req, res) => {
    try {
        const { UserId, ProductId, size } = req.body;
        const userData = await userModel.findById(UserId);
        let cartData = await userData.cartData;

        if (cartData[ProductId]) {
            if (cartData[ProductId][size]) {
                cartData[ProductId][size] += 1;
            } else {
                cartData[ProductId][size] = 1;
            }
        } else{
            cartData[ProductId] = { [size]: 1 };
        }

        await userModel.findByIdAndUpdate(UserId, { cartData });
        res.json({ success: true, message: "Item added to cart successfully" });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}


// Updating the cart with new items or quantities

const UpdateCart = async (req, res) => {
}


// Fetching the current cart items

const getCart = async (req, res) => {
}


export { addToCart, UpdateCart, getCart };