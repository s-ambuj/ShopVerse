import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import Contact from './pages/contact'
import Product from './pages/Product'
import Collection from './pages/collection'
import Cart from './pages/Cart'
import LoginPage from './pages/LoginPage'
import PlaceOrder from './pages/PlaceOrder'
import Orders from './pages/Orders'
import Navbar from './components/navbar'
import Footer from './components/Footer'
import SearchBar from './components/SearchBar'
import { ToastContainer, toast } from 'react-toastify';


const App = () => {
  return (
    <div className = 'px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]'>
      <ToastContainer />
      <Navbar />
      <SearchBar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/About' element={<About />} />
        <Route path='/Contact' element={<Contact />} />
        <Route path='/Collection' element={<Collection />} />
        <Route path='/Product/:productID' element={<Product />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='place-order' element={<PlaceOrder />} />
        <Route path='/orders' element={<Orders />} />
      </Routes>
      <Footer />
    </div>
  )
}

export default App
