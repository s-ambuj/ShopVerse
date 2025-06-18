import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/frontend_assets/assets'
import NewsLetter from '../components/NewsLetter'

const Contact = () => {
  return (
    <div>
      
      <div className='text-center text-2xl pt-10 border-t'>
        <Title text1={'CONTACT'} text2={'US'} />
      </div>

      <div className='my-10 flex flex-col justify-center md:flex-row gap-10 mb-28'>
        <img className='w-full md:max-w-[480px]' src={assets.contact_img} />
        <div className='flex flex-col justify-center items-start gap-6'>
          <p className='font-semibold text-xl text-gray-600'>Our Store</p>
          <p className='text-gray-500'>Vaishnavi Summit, Ground Floor, 7th Main, 80 Feet Road, 3rd Block, <br /> Koramangala Industrial Layout, Bangalore KA IN 560034</p>
          <p className='text-gray-500'>Call: 9876543210 <br /> Email: contact@shopverse.com </p>
          <p className='font-semibold text-xl text-gray-600'>Careers at ShopVerse</p>
          <p className='text-gray-500'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Hic, iusto.</p>
          <button className='border border-black px-8 py-4 text-sm hover:bg-black hover:text-white transition-all duration-500'>Explore Jobs</button>
        </div>
      </div>
      <NewsLetter />
    </div>
  )
}

export default Contact
