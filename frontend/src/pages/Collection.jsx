import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import { assets } from '../assets/frontend_assets/assets';
import Title from '../components/Title';
import ProductItem from '../components/ProductItem';

const Collection = () => {

  const { products, search, showSearch } = useContext(ShopContext);
  const [showFilter,setShowFilter] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [Category, setCategory] = useState([]);
  const [SubCategory, setSubCategory] = useState([]);
  const[sortOption, setSortOption] = useState('');

  const handleCategoryChange = (e) => {
    const value = e.target.value;
    setCategory(prev => {
      if (prev.includes(value)) {
        return prev.filter(item => item !== value);
      }
      return [...prev, value];
    });
  }

  const handleSubCategoryChange = (e) => {
    const value = e.target.value;
    setSubCategory(prev => {
      if (prev.includes(value)) {
        return prev.filter(item => item !== value);
      }
      return [...prev, value];
    });
  }

  const handleSortChange = (e) => {
    const value = e.target.value;
    setSortOption(value);

    let sortedProducts = [...filteredProducts];
    if (value === 'default') {
      sortedProducts = [...products];
    } else if (value === 'price-asc') {
      sortedProducts.sort((a, b) => a.price - b.price);
    } else if (value === 'price-desc') {
      sortedProducts.sort((a, b) => b.price - a.price);
    } else if (value === 'relevant') {
      sortedProducts.sort((a, b) => a.date > b.date);
    }
    setFilteredProducts(sortedProducts);
  }

  useEffect(() => {
    setFilteredProducts(products);
  }, [])
  
  useEffect(() => {
  let filtered = products;

  if (search && showSearch) {
    filtered = filtered.filter(item =>
      item.name.toLowerCase().includes(search.toLowerCase())
    );
  }

  if (Category.length > 0) {
    filtered = filtered.filter(item => Category.includes(item.category));
  }

  if (SubCategory.length > 0) {
    filtered = filtered.filter(item => SubCategory.includes(item.subCategory));
  }

  setFilteredProducts(filtered);
}, [products, Category, SubCategory, search, showSearch]);

  return (
    <div className='flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t'>
      
      {/* Filter Options */}

      <div className='min-w-60'>
        <p onClick={() => setShowFilter(!showFilter)} className='my-2 text-xl flex items-center gap-2 cursor-pointer'>FILTERS
          <img className={`h-3 sm:hidden ${showFilter ? 'rotate-90' : ''}`} src={assets.dropdown_icon} alt='dropdown'/>
        </p>

        {/* Category Filters*/}

        <div className={`border border-gray-300 pl-5 py-3 mt-6 ${showFilter ? '' : 'hidden'} sm:block`}>
          <p className='mb-3 text-sm font-medium'>CATEGORIES</p>
          <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
            <p className='flex gap-2'>
              <input type="checkbox" className='w-3' value={'Men'} onChange={handleCategoryChange}/>Men
              </p>
            <p className='flex gap-2'>
              <input type="checkbox" className='w-3' value={'Women'} onChange={handleCategoryChange}/>Women</p>
            <p className='flex gap-2'>
              <input type="checkbox" className='w-3' value={'Kids'} onChange={handleCategoryChange}/>Kids</p>
          </div>
        </div>

        {/* SubCategory Filters*/}

        <div className={`border border-gray-300 pl-5 py-3 mt-6 ${showFilter ? '' : 'hidden'} sm:block`}>
          <p className='mb-3 text-sm font-medium'>SUBCATEGORIES</p>
          <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
            <p className='flex gap-2'>
              <input type="checkbox" className='w-3' value={'Topwear'} onChange={handleSubCategoryChange}/>Topwear
              </p>
            <p className='flex gap-2'>
              <input type="checkbox" className='w-3' value={'Bottomwear'} onChange={handleSubCategoryChange}/>Bottomwear</p>
            <p className='flex gap-2'>
              <input type="checkbox" className='w-3' value={'Winterwear'} onChange={handleSubCategoryChange}/>Winterwear</p>
          </div>
        </div>
      </div>

      {/* Products Section */}

      <div className='flex-1'>
        <div className='flex justify-between text-base sm:text-2xl mb-4'>
          <Title text1={'ALL'} text2={'PRODUCTS'} />
          {/* Sort Products */}
          <select onChange={handleSortChange} className='border-2 border-gray-00 text-sm px-2'>
            <option value="default">Sort By: Default</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="relevant">Newest Arrivals</option>
          </select>
        </div>

        {/* Render Products */}

        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 gap-y-6'>
          {
            filteredProducts.map((item, index) => (
              <ProductItem key={index} name={item.name} price={item.price} image={item.image} />
            ))
          }
        </div>
      </div>
    </div>
  )
}

export default Collection
