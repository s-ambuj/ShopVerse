import React from 'react'
import { assets } from '../assets/frontend_assets/assets'
import { motion } from 'framer-motion'

const Footer = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
    >
      <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm'>
        <div>
          <img className='w-32' src={assets.logo} alt='' />
          <p className='w-full md:w-2/3 text-gray-600'>
            Beyond Shopping, Into the Verse.
          </p>
        </div>

        <div>
          <p className='text-xl font-medium mb-5'>COMPANY</p>
          <ul className='flex flex-col gap-1 text-gray-600'>
            <li>Home</li>
            <li>About Us</li>
            <li>Delivery</li>
            <li>Privacy Policy</li>
          </ul>
        </div>

        <div>
          <p className='text-xl font-medium mb-5'>GET IN TOUCH</p>
          <ul className='flex flex-col gap-1 text-gray-600'>
            <li>9876543210</li>
            <li>contact@shopverse.com</li>
          </ul>
        </div>
      </div>

      <div>
        <hr />
        <p className='py-5 text-sm text-center'>
          &copy; 2025 shopverse.com - All Rights Reserved.
        </p>
      </div>
    </motion.div>
  )
}

export default Footer