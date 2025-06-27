import React from 'react'
import Hero from '../components/Hero'
import LatestCollection from '../components/LatestCollection'
import BestSeller from '../components/BestSeller'
import OurPolicy from '../components/OurPolicy'
import NewsLetter from '../components/NewsLetter'
import { motion } from 'framer-motion'

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 1) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.2,
      duration: 0.6
    }
  })
}

const Home = () => {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={{
        visible: {
          transition: {
            staggerChildren: 0.3
          }
        }
      }}
    >
      <motion.div variants={fadeInUp}>
        <Hero />
      </motion.div>
      <motion.div variants={fadeInUp}>
        <LatestCollection />
      </motion.div>
      <motion.div variants={fadeInUp}>
        <BestSeller />
      </motion.div>
      <motion.div variants={fadeInUp}>
        <OurPolicy />
      </motion.div>
      <motion.div variants={fadeInUp}>
        <NewsLetter />
      </motion.div>
    </motion.div>
  )
}

export default Home