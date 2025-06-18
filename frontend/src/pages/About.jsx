import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/frontend_assets/assets'
import NewsLetter from '../components/NewsLetter'

const About = () => {
  return (
    <div>
      <div className='text-2xl text-center pt-8 border-t'>
        <Title text1={'ABOUT'} text2={'US'} />
      </div>

      <div className='my-10 flex flex-col md:flex-row gap-16'>
        <img className='w-full md:max-w-[450px]' src={assets.about_img} />
        <div className='flex flex-col justify-center gap-6 md:w-2/4 text-gray-600'>
          <p>
            At our core, we are dedicated to providing high-quality products that not only meet your expectations but exceed them. Our journey began with a simple goal: to offer a seamless and satisfying shopping experience for everyone.
          </p>
          <p>
            We believe that great products should be accessible, affordable, and sustainable. From curating our collections to ensuring fast and reliable delivery, every step we take is focused on enhancing customer satisfaction.
          </p>
          <b className='text-gray-800'>Our Mission</b>
          <p>
            Our mission is to redefine convenience in shopping by blending innovation with a customer-first approach. We are committed to building a community of happy customers by delivering value, trust, and excellence in every interaction.
          </p>
        </div>
      </div>

      <div className='text-xl py-4'>
        <Title text1={'WHY'} text2={'CHOOSE US'} />
      </div>

      <div className='flex flex-col md:flex-row text-sm mb-20'>
        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b>Quality Assurance:</b>
          <p className='text-gray-600'>
            We ensure that every product goes through strict quality checks before it reaches you. Our team collaborates with trusted suppliers to bring you durable and reliable items you can count on.
          </p>
        </div>
        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b>Convenience:</b>
          <p className='text-gray-600'>
            From intuitive navigation to hassle-free checkout, our platform is designed to make your shopping experience as smooth as possible. With fast shipping and secure payment options, we take care of the details so you don't have to.
          </p>
        </div>
        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b>Exceptional Customer Service:</b>
          <p className='text-gray-600'>
            Our dedicated support team is always here to help. Whether you have questions, need assistance, or want to provide feedback, we’re just a message away—committed to resolving your concerns quickly and efficiently.
          </p>
        </div>
      </div>

      <NewsLetter />
    </div>
  )
}

export default About