import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  items: [{
    name: String,
    image: Array,
    price: Number,
    quantity: Number,
    size: String,
    status: { type: String, default: "Order Placed" }
  }],
  amount: { type: Number, required: true },
  address: { type: Object, required: true },
  status: { type: String, required: true, default: "Order Placed" },
  paymentMethod: { type: String, required: true },
  payment: { type: Boolean, required: true, default: false },
  date: { type: Number, required: true },
});

const OrderModel = mongoose.models.order || mongoose.model("order", orderSchema);

export default OrderModel;