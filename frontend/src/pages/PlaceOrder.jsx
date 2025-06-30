import React, { useContext, useState } from 'react'
import Title from '../components/Title'
import CartTotal from '../components/CartTotal'
import { assets } from '../assets/frontend_assets/assets'
import { ShopContext } from '../context/ShopContext'
import axios from 'axios'
import { toast } from 'react-toastify'

const PlaceOrder = () => {

  const [payment, setPayment] = useState('cod');
  const { navigate, backendURL, token, cartItems, setCartItems, getCartAmount, deliveryfee, products } = useContext(ShopContext);
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    street: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
    phone: ''
  });

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      let orderData = []

      for (const items in cartItems) {
        for (const item in cartItems[items]) {
          if (cartItems[items][item] > 0) {
            const itemInfo = structuredClone(products.find(p => p._id === items));
            if (itemInfo) {
              itemInfo.size = item;
              itemInfo.quantity = cartItems[items][item];
              orderData.push(itemInfo);
            }
          }
        }
      }

      let orders = {
        items: orderData,
        amount: getCartAmount() + deliveryfee,
        address: formData,
      }

      switch (payment) {
        case 'cod':
          const response = await axios.post(backendURL + '/api/order/place', orders, { headers: {token} });
          if (response.data.success){
            setCartItems({})
            navigate('/orders')
          } else {
            toast.error(response.data.message)
          }
        break;

        default:
          break;
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  }
  return (
    <form onSubmit={onSubmitHandler} className='flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t'>
      {/* Delivery Information */}

      <div className='flex flex-col gap-4 w-full sm:max-w-[480px]'>
        <div className='text-xl sm:text-2xl my-3'>
          <Title text1={'DELIVERY'} text2={'INFORMATION'} />
        </div>
        <div className='flex gap-3'>
          <input required onChange={onChangeHandler} name='firstName' value={formData.firstName} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type='text' placeholder='First Name' />
        </div>
        <div className='flex gap-3'>
          <input required onChange={onChangeHandler} name='lastName' value={formData.lastName} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type='text' placeholder='Last Name' />
        </div>
          <input required onChange={onChangeHandler} name='email' value={formData.email} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type='email' placeholder='Email address' />
          <input required onChange={onChangeHandler} name='street' value={formData.street} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type='text' placeholder='Street' />
        <div className='flex gap-3'>
          <input required onChange={onChangeHandler} name='city' value={formData.city} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type='text' placeholder='City' />
          <input required onChange={onChangeHandler} name='state' value={formData.state} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type='text' placeholder='State' />
        </div>
        <div className='flex gap-3'>
          <input required onChange={onChangeHandler} name='zipCode' value={formData.zipCode} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type='text' placeholder='ZipCode' />
          <input required onChange={onChangeHandler} name='country' value={formData.country} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type='text' placeholder='Country' />
        </div>
          <input required onChange={onChangeHandler} name='phone' value={formData.phone} className='no-increment border border-gray-300 rounded py-1.5 px-3.5 w-full' type='number' min='0' placeholder='Phone Number' />
    </div>

    {/* Payment Information */}

    <div className='mt-8'>
      <div className='mt-8 min-w-80'>
        <CartTotal />
      </div>
      <div className='mt-12'>
        <Title text1={'PAYMENT'} text2={'METHOD'} />

        {/* Payment Gateways */}
        
        <div className='flex gap-3 flex-col lg:flex-row'>
          <div onClick={() => setPayment('stripe')}className='flex items-center gap-3 border p-2 px-3 cursor-pointer'>
            <p className={`min-w-3.5 h-3.5 border rounded-full ${payment === 'stripe' ? 'bg-green-400' : ''}`}></p>
            <img className='h-5 mx-4' src={assets.stripe_logo} alt='stripe' />
          </div>
          <div onClick={() => setPayment('razorpay')}className='flex items-center gap-3 border p-2 px-3 cursor-pointer'>
            <p className={`min-w-3.5 h-3.5 border rounded-full ${payment === 'razorpay' ? 'bg-green-400' : ''}`}></p>
            <img className='h-5 mx-4' src={assets.razorpay_logo} alt='stripe' />
          </div>
          <div onClick={() => setPayment('cod')}className='flex items-center gap-3 border p-2 px-3 cursor-pointer'>
          <p className={`min-w-3.5 h-3.5 border rounded-full ${payment === 'cod' ? 'bg-green-400' : ''}`}></p>
          <p className='text-gray-500 text-sm font-medium mx-4'>Cash on Delivery</p>
          </div>
        </div>
        
        <div className='w-full text-end mt-8'>
          <button type="submit" className='bg-black text-white px-16 py-3 text-sm'>PLACE ORDER</button>
        </div>
      </div>
    </div>
  </form>
  )
}

export default PlaceOrder
