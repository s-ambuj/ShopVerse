import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from '../components/Title'
import { assets } from '../assets/frontend_assets/assets'
import CartTotal from '../components/CartTotal'
import { motion } from 'framer-motion'

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const Cart = () => {
  const { products, currency, cartItems, updateQuantity, navigate } = useContext(ShopContext)
  const [cartData, setCartData] = useState([])

  useEffect(() => {
    if (products.length > 0) {
      const tempData = []
      for (const items in cartItems) {
        for (const item in cartItems[items]) {
          if (cartItems[items][item] > 0) {
            tempData.push({
              _id: items,
              size: item,
              quantity: cartItems[items][item],
            })
          }
        }
      }
      setCartData(tempData)
    }
  }, [cartItems, products])

  return (
    <motion.div
      className='border-t pt-14'
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <motion.div className='text-2xl mb-3' variants={fadeUp}>
        <Title text1={'YOUR'} text2={'CART'} />
      </motion.div>

      {cartData.length === 0 ? (
        <motion.div className='text-center text-gray-500 mt-20 text-lg' variants={fadeUp}>
          Your cart is empty. Add some products to see them here.
        </motion.div>
      ) : (
        <>
          <motion.div variants={containerVariants}>
            {cartData.map((item, index) => {
              const productData = products.find((product) => product._id === item._id)
              if (!productData) return null

              return (
                <motion.div
                  key={index}
                  className='py-4 border-t border-b text-gry-700 grid grid-cols-[4fr_0.5fr_0.5fr] sm:grid-cols-[4fr_2fr_0.5fr] items-center gap-4'
                  variants={itemVariants}
                >
                  <div className='flex items-start gap-6'>
                    <img className='w-16 sm:w-20' src={productData.image[0]} alt={productData.name} />
                    <div>
                      <p className='text-xs sm:text-lg font-medium'>{productData.name}</p>
                      <div className='flex items-center gap-5 mt-2'>
                        <p>{currency}{productData.price}</p>
                        <p className='px-2 sm:px-3 sm:py-1 border bg-slate-50'>{item.size}</p>
                      </div>
                    </div>
                  </div>
                  <input
                    onChange={(e) =>
                      e.target.value === '' || e.target.value === '0'
                        ? null
                        : updateQuantity(item._id, item.size, Number(e.target.value))
                    }
                    className='border max-w-10 sm:max-w-20 sm:px-2 py-1'
                    type='number'
                    min={1}
                    defaultValue={item.quantity}
                  />
                  <img
                    onClick={() => updateQuantity(item._id, item.size, 0)}
                    className='w-4 mr-4 sm:w-5 cursor-pointer'
                    src={assets.bin_icon}
                    alt='Delete'
                  />
                </motion.div>
              )
            })}
          </motion.div>

          <motion.div className='flex justify-end my-20' variants={fadeUp}>
            <div className='w-full sm:w-[450px]'>
              <CartTotal />
              <div className='w-full sm:w-[450px]'>
                <button
                  onClick={() => navigate('/placeorder')}
                  className='bg-black text-white text-sm my-8 px-8 py-3'
                >
                  PROCEED TO CHECKOUT
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </motion.div>
  )
}

export default Cart
