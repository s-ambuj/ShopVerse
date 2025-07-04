import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from '../components/Title'
import { motion } from 'framer-motion'
import { useState } from 'react'
import { useEffect } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
}

const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2,
    },
  },
}

const Orders = () => {
  const { backendURL, token, currency } = useContext(ShopContext);
  const [orderData, setOrderData] = useState([])

  const fetchOrderData = async () => {
    try {
      if (!token) {
        return null
      }

      const response = await axios.post(backendURL + '/api/order/userorders', {}, { headers: { token } });
      if (response.data.success) {
        let orderitems = []
        response.data.orders.map((order) => {
          order.items.map((item) => {
            item['_id'] = item._id
            item['status'] = item.status
            item['payment'] = order.payment
            item['paymentMethod'] = order.paymentMethod
            item['date'] = order.date
            orderitems.push(item)
          })
        })
        setOrderData(orderitems.reverse())
      }
    } catch (error) {}
  }

  const cancelOrder = async (itemId) => {
    try {
      const response = await axios.post(`${backendURL}/api/order/cancel`, { itemId }, { headers: { token } });
      if (response.data.success) {
        toast.success("Order cancelled successfully");
        fetchOrderData();
      } else {
        toast.error(response.data.message || "Cancellation failed");
      }
    } catch (error) {
      toast.error("Error cancelling order");
    }
  };

  useEffect(() => {
    fetchOrderData()
  }, [token])

  return (
    <motion.div
      className='border-t pt-16'
      initial="hidden"
      animate="visible"
      variants={staggerContainer}
    >
      <motion.div className='text-2xl' variants={fadeUp}>
        <Title text1={'MY'} text2={'ORDERS'} />
      </motion.div>

      <motion.div variants={staggerContainer}>
        {
          orderData.map((item, index) => (
            <motion.div
              key={index}
              className={`py-4 border-t text-gray-700 flex flex-col md:flex-row md:items-center md:justify-between gap-4 ${item.status === "Cancelled" ? "opacity-50" : ""}`}
              variants={fadeUp}
            >
              <div className='flex items-start gap-6 text-sm'>
                <img className='w-16 sm:w-20' src={item.image[0]} alt={item.name} />
                <div>
                  <p className='sm:text-base font-medium'>{item.name}</p>
                  <div className='flex items-center gap-3 mt-1 text-base text-gray-700'>
                    <p>{currency}{item.price}</p>
                    <p>Quantity: {item.quantity}</p>
                    <p>Size: {item.size}</p>
                  </div>
                  <p className='mt-1'>Date: <span className='text-gray-400'>{new Date(item.date).toDateString()}</span></p>
                  <p className='mt-1'>Payment: <span className='text-gray-400'>{item.paymentMethod}</span></p>
                </div>
              </div>

              <div className='md:w-1/2 flex flex-col sm:flex-row justify-between gap-2 sm:gap-0'>
                <div className='flex items-center gap-2'>
                  <p className='min-w-2 h-2 rounded-full bg-green-500'></p>
                  <p className='text-sm md:text-base'>{item.status}</p>
                </div>
                <div className='flex gap-2'>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className='border px-4 py-2 text-sm font-medium rounded-sm'
                    onClick={fetchOrderData}
                  >
                    Track Order
                  </motion.button>
                  {!["Delivered", "Cancelled", "In Transit", "Out for Delivery"].includes(item.status) && (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className='border px-4 py-2 text-sm font-medium rounded-sm text-red-600 border-red-400'
                      onClick={() => cancelOrder(item._id)}
                    >
                      Cancel Order
                    </motion.button>
                  )}
                </div>
              </div>
            </motion.div>
          ))
        }
      </motion.div>
    </motion.div>
  )
}

export default Orders
