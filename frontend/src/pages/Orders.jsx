import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext'
import { assets } from '../assets/frontend_assets/assets'
import RelatedProducts from '../components/RelatedProducts'
import { motion } from 'framer-motion'

const Product = () => {
  const { productID } = useParams()
  const { products, currency, addToCart } = useContext(ShopContext)
  const [productData, setProductData] = useState(false)
  const [image, setImage] = useState('')
  const [size, setSize] = useState('')

  const fetchProductData = async () => {
    products.map((item) => {
      if (item._id === productID) {
        setProductData(item)
        setImage(item.image[0])
        return null
      }
    })
  }

  useEffect(() => {
    fetchProductData()
  }, [productID, products])

  return productData ? (
    <motion.div
      className='border-t-2 pt-10'
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className='flex gap-12 flex-col sm:flex-row'>
        <div className='flex-1 flex flex-col-reverse gap-3 sm:flex-row'>
          <div className='flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full'>
            {productData.image.map((item, index) => (
              <motion.img
                whileHover={{ scale: 1.05 }}
                onClick={() => setImage(item)}
                src={item}
                key={index}
                className='w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer'
                alt=''
              />
            ))}
          </div>
          <motion.div
            className='w-full sm:w-[80%]'
            key={image}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
          >
            <img className='w-full h-auto' src={image} />
          </motion.div>
        </div>

        <div className='flex-1'>
          <h1 className='font-medium text-2xl mt-2'>{productData.name}</h1>
          <div className='flex items-center gap-1 mt-2'>
            <img className='w-3 5' src={assets.star_icon} alt='' />
            <img className='w-3 5' src={assets.star_icon} alt='' />
            <img className='w-3 5' src={assets.star_icon} alt='' />
            <img className='w-3 5' src={assets.star_icon} alt='' />
            <img className='w-3 5' src={assets.star_dull_icon} alt='' />
            <p className='pl-2'>(122)</p>
          </div>
          <p className='mt-5 text-3xl font-medium'>{currency}{productData.price}</p>
          <p className='mt-5 text-gray-500 md:w-4/5'>{productData.description}</p>
          <div className='flex flex-col gap-4 my-8'>
            <p>Select Size</p>
            <div className='flex gap-2'>
              {productData.sizes.map((item, index) => (
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSize(item)}
                  className={`border py-2 px-4 bg-gray-100 ${item === size ? 'border-orange-500' : ''}`}
                  key={index}
                >
                  {item}
                </motion.button>
              ))}
            </div>
          </div>
          <motion.button
            onClick={() => addToCart(productData._id, size)}
            className='bg-black text-white px-8 py-3 text-sm active:bg-gray-700'
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            Add To Cart
          </motion.button>
          <hr className='mt-8 sm:w-4/5' />
          <div className='text-sm text-gray-500 mt-5 flex flex-col gap-1'>
            <p>100% Authentic Product.</p>
            <p>Cash on Delivery is available.</p>
            <p>Easy return and exchange policy.</p>
          </div>
        </div>
      </div>

      <div className='mt-20'>
        <div className='flex'>
          <b className='border px-5 py-3 text-sm'>Description</b>
          <p className='border px-5 py-3 text-sm'> Reviews (122)</p>
        </div>
        <div className='flex flex-col gap-4 border px-6 py-6 text-sm text-gray-500'>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit...</p>
          <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit...</p>
        </div>
      </div>

      <RelatedProducts category={productData.category} subCategory={productData.subCategory} />
    </motion.div>
  ) : <div className="opacity-0"></div>
}

export default Product