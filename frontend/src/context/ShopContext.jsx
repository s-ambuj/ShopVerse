import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const ShopContext = createContext();

const ShopContextProvider = (props) => {
  const currency = '$';
  const deliveryfee = 10;
  const backendURL = import.meta.env.VITE_BACKEND_URL;

  const [search, setSearch] = useState('');
  const [showSearch, setShowSearch] = useState(false);
  const [cartItems, setCartItems] = useState({});
  const [products, setProducts] = useState([]);
  const [token, setToken] = useState(localStorage.getItem('token') || '');

  const navigate = useNavigate();

  const addToCart = async (itemId, size) => {
    if (!size) {
      toast.error('Select Product Size');
      return;
    }

    let cartData = structuredClone(cartItems);
    if (cartData[itemId]) {
      cartData[itemId][size] = (cartData[itemId][size] || 0) + 1;
    } else {
      cartData[itemId] = { [size]: 1 };
    }

    setCartItems(cartData);

    if (token) {
      try {
        await axios.post(backendURL + '/api/cart/add', { itemId, size }, { headers: { token } });
        toast.success('Item added to cart successfully');
      } catch (error) {
        console.log(error);
        toast.error(error.message);
      }
    }
  };

  const updateQuantity = async (itemId, size, quantity) => {
    const cartData = structuredClone(cartItems);
    cartData[itemId][size] = quantity;
    setCartItems(cartData);

    if (token) {
      try {
        await axios.post(backendURL + '/api/cart/update', { itemId, size, quantity }, { headers: { token } });
      } catch (error) {
        console.log(error);
        toast.error(error.message);
      }
    }
  };

  const getCartCount = () => {
    let totalCount = 0;
    for (const itemId in cartItems) {
      for (const size in cartItems[itemId]) {
        totalCount += cartItems[itemId][size];
      }
    }
    return totalCount;
  };

  const getCartAmount = () => {
    let totalAmount = 0;
    for (const itemId in cartItems) {
      const itemInfo = products.find(p => p._id === itemId);
      if (!itemInfo) continue;
      for (const size in cartItems[itemId]) {
        totalAmount += itemInfo.price * cartItems[itemId][size];
      }
    }
    return totalAmount;
  };

  const fetchProducts = async () => {
    try {
      const response = await axios.get(backendURL + '/api/product/list');
      if (response.data.success) {
        setProducts(response.data.products);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  };

  const fetchCartItems = async (activeToken) => {
    try {
      const response = await axios.post(backendURL + '/api/cart/get', {}, { headers: { token: activeToken } });
      if (response.data.success) {
        setCartItems(response.data.cartData);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    const savedToken = localStorage.getItem('token');
    if (savedToken) {
      setToken(savedToken);
      fetchCartItems(savedToken);
    }
  }, []);

  useEffect(() => {
    if (token) {
      localStorage.setItem('token', token);
      fetchCartItems(token);
    }
  }, [token]);

  const value = {
    products,
    currency,
    deliveryfee,
    search,
    setSearch,
    showSearch,
    setShowSearch,
    cartItems,
    setCartItems,
    addToCart,
    getCartCount,
    updateQuantity,
    getCartAmount,
    navigate,
    backendURL,
    token,
    setToken
  };

  return <ShopContext.Provider value={value}>{props.children}</ShopContext.Provider>;
};

export default ShopContextProvider;