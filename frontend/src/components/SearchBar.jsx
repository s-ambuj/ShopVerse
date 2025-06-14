import React, { use, useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/frontend_assets/assets';
import { useLocation } from 'react-router-dom';

const SearchBar = () => {
  const { search, setSearch, showSearch, setShowSearch } = useContext(ShopContext);
  const [Visible, setVisible] = useState(false);
  const location = useLocation();

  useEffect(() => {
    if (location.pathname.includes('collection')) {
        setVisible(true);
    }
    else {
        setVisible(false);
    }
}, [location]);

  return showSearch && Visible ? (
    <div className="border-t border-b bg-gray-50 text-center">
        <div className='inline-flex items-center justify-center border border-gray-400 px-5 py-2 my-5 mx-3 rounded-full w-3/4 sm:w-1/2'>
            <input
                type="text"
                placeholder="Search for products..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="flex-1 bg-inherit w-full text-sm outline-none"
            />
            <img
                src={assets.search_icon}
                alt="search icon"
                className="w-4 cursor-pointer"
            />
        </div>
        <img
            src={assets.cross_icon}
            alt="close icon"
            className="inline w-3 cursor-pointer"
            onClick={() => setShowSearch(false)}
        />
    </div>
  ) : null;
}

export default SearchBar
