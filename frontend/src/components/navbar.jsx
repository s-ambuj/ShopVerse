import React, {useContext, useState} from 'react'
import {assets} from '../assets/frontend_assets/assets'
import { Link, NavLink } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext'

const Navbar = () => {

    const [visible, setVisible] = useState(false);

    const { setShowSearch, getCartCount, navigate, token, setToken, setCartItems } = useContext(ShopContext);

    const handleLogout = () => {
        navigate('/login');
        setToken('');
        localStorage.removeItem('token');
        setCartItems({});
    }

  return (
    <div className='flex items-center justify-between py-5 font-medium'>
      <Link to='/'><img src={assets.logo} alt="logo" className='w-36' /></Link>
      <ul className='pt-4 gap-5 text-sm text-gray-700 hidden sm:flex'>
        <NavLink onClick={() => setVisible(false)} to='/' className='flex flex-col items-center gap-1'>
            <p>HOME</p>
            <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
        </NavLink>
        <NavLink onClick={() => setVisible(false)} to='/collection' className='flex flex-col items-center gap-1'>
            <p>COLLECTION</p>
            <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
        </NavLink>
        <NavLink onClick={() => setVisible(false)} to='/about' className='flex flex-col items-center gap-1'>
            <p>ABOUT</p>
            <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
        </NavLink>
        <NavLink onClick={() => setVisible(false)} to='/contact' className='flex flex-col items-center gap-1'>
            <p>CONTACT</p>
            <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
        </NavLink> 
     </ul>

    <div className='flex items-center gap-6'>
        <img onClick={() => setShowSearch(true)} src={assets.search_icon} alt="search" className='w-5 cursor-pointer' />

        <div className='group relative'>
            <img onClick={() => token ? null : navigate('/login')} src={assets.profile_icon} alt="user" className='w-5 cursor-pointer' />
            {token && <div className='group-hover:block hidden absolute drop-down-menu right-0 pt-4'>
                <div className='flex flex-col gap-2 w-36 py-3 px-5 bg-slate-100 text-gray-500 rounded'>
                    <p className='cursor-pointer hover:text-black'>Profile</p>
                    <p onClick={() => navigate('/orders')}  className='cursor-pointer hover:text-black'>Orders</p>
                    <p onClick={handleLogout} className='cursor-pointer hover:text-black'>Logout</p>
                    </div>
                </div> }
            </div>
            <Link onClick={() => setVisible(false)} to='/cart' className='relative'>
            <img src={assets.cart_icon} alt="cart" className='w-5 min-w-5 cursor-pointer' />
            <p className='absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-black text-white aspect-square rounded-full text-[8px]'>{getCartCount()}</p>
            </Link>
            <img onClick = {() => setVisible(true)} src={assets.menu_icon} alt="menu" className='w-5 cursor-pointer sm:hidden' />      
        </div>
        
        {/* Mobile Menu */}

        <div className={`mobile-menu absolute top-0 right-0 bottom-0 overflow-hidden bg-white transition-all ${visible ? 'w-full' : 'w-0'}`}>
            <div className=' flex flex-col text-gray-600'>
                <div onClick={() => setVisible(false)} className='flex items-center gap-4 p-3 cursor-pointer'>
                    <img className='h-4 rotate 180' src={assets.dropdown_icon} alt='dropdown' />
                    <p>Back</p>
                </div>
                <NavLink onClick={() => setVisible(false)} to='/' className='py-2 pl-6 border'>HOME</NavLink>
                <NavLink onClick={() => setVisible(false)} to='/collection' className='py-2 pl-6 border'>COLLECTION</NavLink>
                <NavLink onClick={() => setVisible(false)} to='/about' className='py-2 pl-6 border'>ABOUT</NavLink>
                <NavLink onClick={() => setVisible(false)} to='/contact' className='py-2 pl-6 border'>CONTACT</NavLink>
            </div>
        </div>
    </div>
  )
}

export default Navbar
