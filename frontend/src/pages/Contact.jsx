import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/frontend_assets/assets'
import NewsLetter from '../components/NewsLetter'
import { motion } from 'framer-motion'

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
}

const Contact = () => {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={{
        visible: {
          transition: {
            staggerChildren: 0.2
          }
        }
      }}
    >
      <motion.div className='text-center text-2xl pt-10 border-t' variants={fadeUp}>
        <Title text1={'CONTACT'} text2={'US'} />
      </motion.div>

      <motion.div
        variants={fadeUp}
        className='my-10 flex flex-col justify-center md:flex-row gap-10 mb-28'
      >
        <motion.img
          className='w-full md:max-w-[480px]'
          src={assets.contact_img}
          alt='Contact'
          variants={fadeUp}
        />
        <motion.div
          className='flex flex-col justify-center items-start gap-6'
          variants={fadeUp}
        >
          <p className='font-semibold text-xl text-gray-600'>Our Store</p>
          <p className='text-gray-500'>
            Vaishnavi Summit, Ground Floor, 7th Main, 80 Feet Road, 3rd Block, <br />
            Koramangala Industrial Layout, Bangalore KA IN 560034
          </p>
          <p className='text-gray-500'>
            Call: 9876543210 <br /> Email: contact@shopverse.com
          </p>
          <p className='font-semibold text-xl text-gray-600'>Careers at ShopVerse</p>
          <p className='text-gray-500'>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Hic, iusto.
          </p>
          <motion.button
            className='border border-black px-8 py-4 text-sm hover:bg-black hover:text-white transition-all duration-500'
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.4, delay: 0.2 } }
            }}
          >
            Explore Jobs
          </motion.button>
        </motion.div>
      </motion.div>

      <motion.div variants={fadeUp}>
        <NewsLetter />
      </motion.div>
    </motion.div>
  )
}

export default Contact