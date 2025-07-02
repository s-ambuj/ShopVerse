import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { backendURL, currency } from "../App";
import { toast } from "react-toastify";
import { assets } from "../assets/admin_assets/assets";

const Orders = ({ token }) => {
  const [orders, setOrders] = useState([]);

  const fetchAllOrders = async () => {
    if (!token) {
      return null;
    }

    try {
      const response = await axios.post(backendURL + "/api/order/list", {}, { headers: { token } });
      if (response.data.success) {
        setOrders(response.data.orders.reverse());
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const statushandler = async (e, orderId) => {
    try {
      const response = await axios.post(backendURL + '/api/order/status', { orderId, status: e.target.value }, { headers: { token } });
      if (response.data.success) {
        await fetchAllOrders();
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, [token]);

  return (
    <div>
      <h3>Orders</h3>
      <div>
        {orders.map((order, index) => (
          <div
            className="grid grid-cols-1 sm:grid-cols-[0.5fr_2fr_1fr] lg:grid-cols-[0.5fr_2fr_1fr_1fr_1fr] gap-3 items-start border-2 border-gray-200 p-5 md:p-8 my-3 md:my-4 text-xs sm:text-sm text-gray-700"
            key={index}
          >
            <img src={assets.parcel_icon} alt="Parcel Icon" className="w-8 sm:w-12" />
            <div>
              <div className="mb-2">
                {order.items.map((item, idx) => (
                  <p key={idx} className={`${item.status === "Cancelled" ? "text-red-500 line-through" : ""}`}>
                    {item.name} x {item.quantity} <span>{item.size}</span>
                    {item.status === "Cancelled" && " (Cancelled)"}
                    {idx !== order.items.length - 1 && ","}
                  </p>
                ))}
                {order.items.some(item => item.status === "Cancelled") && (
                  <p className="text-xs font-semibold text-red-600">Some items cancelled</p>
                )}
              </div>
              <p className="mt-3 mb-2 font-medium">
                {order.address.firstName} {order.address.lastName}
              </p>
              <div>
                <p>{order.address.street},</p>
                <p>
                  {order.address.city}, {order.address.state}, {order.address.country}, {order.address.zipCode}
                </p>
              </div>
              <p>{order.address.phone}</p>
            </div>
            <div>
              <p className="text-sm sm:text-[15px]">Items : {order.items.length}</p>
              <p className="mt-3">Payment Method : {order.paymentMethod}</p>
              <p>Payment : {order.payment ? "Paid" : "Pending"}</p>
              <p>Order Date : {new Date(order.date).toLocaleDateString()}</p>
            </div>
            <div>
              <p className="text-sm sm:text-[15px]">
                {currency} {order.amount}
              </p>
            </div>
            <div>
              <select
                onChange={(e) => statushandler(e, order._id)}
                className="p-2 font-semibold"
                value={order.status}
                disabled={order.items.every(item => item.status === "Cancelled")}
              >
                <option value="Order Placed">Order Placed</option>
                <option value="Packing">Packing</option>
                <option value="In Transit">In Transit</option>
                <option value="Out for Delivery">Out for Delivery</option>
                <option value="Delivered">Delivered</option>
              </select>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;