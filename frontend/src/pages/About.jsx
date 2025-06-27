import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/frontend_assets/assets'
import NewsLetter from '../components/NewsLetter'
import { motion } from 'framer-motion'

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
}

const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2,
    },
  },
}

const About = () => {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={staggerContainer}
    >
      <motion.div variants={fadeUp} className='text-2xl text-center pt-8 border-t'>
        <Title text1={'ABOUT'} text2={'US'} />
      </motion.div>

      <motion.div
        variants={fadeUp}
        className='my-10 flex flex-col md:flex-row gap-16'
      >
        <img className='w-full md:max-w-[450px]' src={assets.about_img} alt="about" />
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
      </motion.div>

      <motion.div variants={fadeUp} className='text-xl py-4'>
        <Title text1={'WHY'} text2={'CHOOSE US'} />
      </motion.div>

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className='flex flex-col md:flex-row text-sm mb-20'
      >
        {[
          {
            title: 'Quality Assurance:',
            desc: 'We ensure that every product goes through strict quality checks before it reaches you. Our team collaborates with trusted suppliers to bring you durable and reliable items you can count on.'
          },
          {
            title: 'Convenience:',
            desc: 'From intuitive navigation to hassle-free checkout, our platform is designed to make your shopping experience as smooth as possible. With fast shipping and secure payment options, we take care of the details so you don\'t have to.'
          },
          {
            title: 'Exceptional Customer Service:',
            desc: 'Our dedicated support team is always here to help. Whether you have questions, need assistance, or want to provide feedback, we’re just a message away—committed to resolving your concerns quickly and efficiently.'
          }
        ].map((item, i) => (
          <motion.div
            key={i}
            variants={fadeUp}
            className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'
          >
            <b>{item.title}</b>
            <p className='text-gray-600'>{item.desc}</p>
          </motion.div>
        ))}
      </motion.div>

      <motion.div variants={fadeUp}>
        <NewsLetter />
      </motion.div>
    </motion.div>
  )
}

export default About