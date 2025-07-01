import React, { useEffect } from 'react'
import { useContext } from "react";
import { useSearchParams } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import axios from "axios";
import { toast } from "react-toastify";

const Verify = () => {

    const { navigate, token, setCartItems, backendURL } = useContext(ShopContext);
    const [searchParams, setSearchParams] = useSearchParams();
    const orderId = searchParams.get("orderId");
    const success = searchParams.get("success");

    const verifyOrder = async () => {

        try {
            if (!token ) {
                return null;
            }

            const response = await axios.post(backendURL + '/api/order/verifystripe', { orderId, success }, { headers: { token } });
            if (response.data.success) {
                if (success === "true") {
                    toast.success("Order placed successfully");
                    setCartItems({});
                    navigate("/orders");
                } else {
                    navigate("/cart");
                    toast.error("Order failed");
                }
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    }

    useEffect(() => {
        verifyOrder();
    }, [token] );

  return (
    <div>
      
    </div>
  )
}

export default Verify
