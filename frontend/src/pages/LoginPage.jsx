// LoginPage.jsx
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authUser';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { user, login } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    await login({ email, password });
  };

  return (
    <div className='h-screen w-full hero-bg'>
      <header className='max-w-6xl mx-auto flex items-center justify-between p-4'>
        <Link to='/'>
          <img src='/netflix-logo.png' alt='logo' className='w-[100px]' />
        </Link>
      </header>

      <div className='flex justify-center items-center mt-20 mx-3'>
        <div className='w-full max-w-md p-8 space-y-6 bg-black/60 rounded shadow-current'>
          <h1 className='text-center text-white text-2xl font-semibold mb-4'>
            Log In
          </h1>

          <form className='space-y-6' onSubmit={handleLogin}>
            <div>
              <label htmlFor='email' className='block text-white text-sm mb-1'>
                Email
              </label>
              <input
                type='email'
                id='email'
                className='w-full px-3 py-2 border border-gray-700 rounded
                           bg-transparent text-white placeholder-gray-400
                           focus:outline-none focus:ring-2 focus:ring-red-600 
                           transition duration-200'
                placeholder='Enter email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div>
              <label htmlFor='password' className='block text-white text-sm mb-1'>
                Password
              </label>
              <input
                type='password'
                id='password'
                className='w-full px-3 py-2 border border-gray-700 rounded
                           bg-transparent text-white placeholder-gray-400
                           focus:outline-none focus:ring-2 focus:ring-red-600 
                           transition duration-200'
                placeholder='Enter password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button
              className='w-full py-2 bg-red-600 text-white font-semibold
                         rounded hover:bg-red-700 
                         transition duration-200'
              type='submit'
            >
              Log In
            </button>
          </form>

          <div className='text-center text-white/60'>
            Don't have an account?{' '}
            <Link to='/signup' className='text-red-600 hover:underline'>
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
