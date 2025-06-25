import { useState } from 'react';
import { assets } from '../assets/admin_assets/assets';
import axios from 'axios';
import { backendURL } from '../App';
import { toast } from 'react-toastify';

const Add = ({ token }) => {
  const [image1, setImage1] = useState(false);
  const [image2, setImage2] = useState(false);
  const [image3, setImage3] = useState(false);
  const [image4, setImage4] = useState(false);

  const [productName, setProductName] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [productCategory, setProductCategory] = useState('Men');
  const [productSubCategory, setProductSubCategory] = useState('Topwear');
  const [productPrice, setProductPrice] = useState('');
  const [productSizes, setProductSizes] = useState([]);
  const [isBestseller, setIsBestseller] = useState(false);
  const [loading, setLoading] = useState(false);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const formData = new FormData();

      formData.append('name', productName);
      formData.append('description', productDescription);
      formData.append('price', productPrice);
      formData.append('category', productCategory);
      formData.append('subCategory', productSubCategory);
      formData.append('bestSeller', isBestseller);
      formData.append('sizes', JSON.stringify(productSizes));

      image1 && formData.append('image1', image1);
      image2 && formData.append('image2', image2);
      image3 && formData.append('image3', image3);
      image4 && formData.append('image4', image4);

      const response = await axios.post(backendURL + '/api/product/add', formData, {
        headers: { token },
      });

      if (response.data.success) {
        toast.success(response.data.message);
        setImage1(false);
        setImage2(false);
        setImage3(false);
        setImage4(false);
        setProductName('');
        setProductDescription('');
        setProductCategory('Men');
        setProductSubCategory('Topwear');
        setProductPrice('');
        setProductSizes([]);
        setIsBestseller(false);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={onSubmitHandler} className="flex flex-col w-full items-start gap-3">
      {/* Image Upload */}
      <div>
        <p className="mb-2">Upload Image</p>
        <div className="flex gap-2">
          {[image1, image2, image3, image4].map((image, index) => (
            <label htmlFor={`image${index + 1}`} key={index}>
              <img
                className="w-20 cursor-pointer"
                src={!image ? assets.upload_area : URL.createObjectURL(image)}
                alt="Upload Area"
              />
              <input
                onChange={(e) => {
                  const file = e.target.files[0];
                  if (index === 0) setImage1(file);
                  if (index === 1) setImage2(file);
                  if (index === 2) setImage3(file);
                  if (index === 3) setImage4(file);
                }}
                type="file"
                id={`image${index + 1}`}
                hidden
              />
            </label>
          ))}
        </div>
      </div>

      {/* Product Name */}
      <div className="w-full">
        <p className="mb-2">Product Name</p>
        <input
          onChange={(e) => setProductName(e.target.value)}
          value={productName}
          className="w-full max-w-[500px] px-3 py-2"
          type="text"
          placeholder="Type here"
          required
        />
      </div>

      {/* Description */}
      <div className="w-full">
        <p className="mb-2">Product Description</p>
        <textarea
          onChange={(e) => setProductDescription(e.target.value)}
          value={productDescription}
          className="w-full max-w-[500px] px-3 py-2"
          placeholder="Provide product info"
          required
        />
      </div>

      {/* Category, Subcategory, Price */}
      <div className="flex flex-col sm:flex-row gap-2 w-full sm:gap-8">
        <div>
          <p className="mb-2">Product Category</p>
          <select
            onChange={(e) => setProductCategory(e.target.value)}
            value={productCategory}
            className="w-full px-3 py-2"
            required
          >
            <option value="Men">Men</option>
            <option value="Women">Women</option>
            <option value="Kids">Kids</option>
          </select>
        </div>

        <div>
          <p className="mb-2">Product Sub Category</p>
          <select
            onChange={(e) => setProductSubCategory(e.target.value)}
            value={productSubCategory}
            className="w-full px-3 py-2"
            required
          >
            <option value="Topwear">Topwear</option>
            <option value="Bottomwear">Bottomwear</option>
            <option value="Winterwear">Winterwear</option>
          </select>
        </div>

        <div>
          <p>Product Price</p>
          <input
            onChange={(e) => setProductPrice(e.target.value)}
            value={productPrice}
            className="w-full px-3 py-2 sm:w-[120px]"
            type="number"
            placeholder="Enter Price"
          />
        </div>
      </div>

      {/* Sizes */}
      <div>
        <p>Product Sizes</p>
        <div className="flex gap-3">
          {['S', 'M', 'L', 'XL', 'XXL'].map((size) => (
            <div
              key={size}
              onClick={() =>
                setProductSizes((prev) =>
                  prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]
                )
              }
            >
              <p
                className={`${
                  productSizes.includes(size) ? 'bg-pink-100' : 'bg-slate-200'
                } px-3 py-1 cursor-pointer`}
              >
                {size}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Bestseller */}
      <div className="flex gap-2 mt-2">
        <input
          onChange={() => setIsBestseller((prev) => !prev)}
          checked={isBestseller}
          className="cursor-pointer"
          type="checkbox"
          id="bestseller"
        />
        <label htmlFor="bestseller" className="cursor-pointer">
          Add to Bestseller
        </label>
      </div>

      {/* Submit */}
      <button
        disabled={loading}
        type="submit"
        className={`w-28 bg-black text-white px-4 py-2 rounded-md mt-4 ${
          loading ? 'opacity-60 cursor-not-allowed' : ''
        }`}
      >
        {loading ? 'Adding...' : 'Add Product'}
      </button>
    </form>
  );
};

export default Add;