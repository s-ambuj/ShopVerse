import React, { useState, useContext, useEffect } from 'react';
import { ShopContext } from '../context/ShopContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';

const LoginPage = () => {
  const [currentState, setCurrentState] = useState('Login');
  const { token, setToken, navigate, backendURL } = useContext(ShopContext);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (currentState === 'Sign Up') {
        const response = await axios.post(`${backendURL}/api/user/register`, { name, email, password });
        if (response.data.success) {
          setToken(response.data.token);
          localStorage.setItem('token', response.data.token);
        } else {
          toast.error(response.data.message);
        }
      } else {
        const response = await axios.post(`${backendURL}/api/user/login`, { email, password });
        if (response.data.success) {
          setToken(response.data.token);
          localStorage.setItem('token', response.data.token);
        } else {
          toast.error(response.data.message);
        }
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      navigate('/');
    }
  }, [token]);

  return (
    <motion.form
      onSubmit={onSubmitHandler}
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className='flex flex-col w-[90%] sm:max-w-96 m-auto mt-14 gap-14 text-gray-800'
    >
      <div className='inline-flex items-center gap-2 mb-2 mt-10'>
        <motion.p
          key={currentState}
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
          className='prata-regular text-3xl'
        >
          {currentState}
        </motion.p>
        <hr className='border-none h-[1.5px] w-8 bg-gray-800' />
      </div>

      {currentState === 'Sign Up' && (
        <motion.input
          key="name-input"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          onChange={(e) => setName(e.target.value)}
          value={name}
          type='text'
          className='w-full px-3 py-2 border border-gray-800'
          placeholder='Name'
          required
        />
      )}

      <motion.input
        key="email-input"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
        type='email'
        className='w-full px-3 py-2 border border-gray-800'
        placeholder='Email'
        required
        whileFocus={{ scale: 1.01 }}
      />
      <motion.input
        key="password-input"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
        type='password'
        className='w-full px-3 py-2 border border-gray-800'
        placeholder='Password'
        required
        whileFocus={{ scale: 1.01 }}
      />

      <div className='w-full flex justify-between text-sm mt-[-8px]'>
        <p className='cursor-pointer'>Forgot password?</p>
        <motion.p
          whileTap={{ scale: 0.95 }}
          onClick={() =>
            setCurrentState((prev) => (prev === 'Login' ? 'Sign Up' : 'Login'))
          }
          className='cursor-pointer'
        >
          {currentState === 'Login' ? 'Create an Account' : 'Login Here'}
        </motion.p>
      </div>

      <motion.button
        type='submit'
        disabled={loading}
        whileTap={{ scale: 0.97 }}
        whileHover={{ scale: loading ? 1 : 1.03 }}
        transition={{ duration: 0.2 }}
        className={`bg-black text-white font-light px-8 py-2 mt-4 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
      >
        {loading ? 'Please wait...' : currentState === 'Login' ? 'Sign in' : 'Sign up'}
      </motion.button>
    </motion.form>
  );
};

export default LoginPage;