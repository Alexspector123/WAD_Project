// AuthScreen.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

const AuthScreen = () => {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const handleFormSubmit = (e) => {
    e.preventDefault();
    navigate("/signup?email=" + email);
  };

  return (
    <div className='hero-bg relative text-white'>
      {/* Navbar */}
      <header className='max-w-6xl mx-auto flex items-center justify-between p-4'>
        <Link to='/'>
          <img src='/netflix-logo.png' alt='logo' className='w-[100px]' />
        </Link>
      </header>

      {/* Hero section */}
      <div className='flex flex-col items-center justify-center text-center py-20 max-w-6xl mx-auto px-4'>
        <h1 className='text-4xl md:text-6xl font-semibold mb-4'>
          Unlimited movies, TV shows and more
        </h1>
        <p className='mb-4'>Watch anywhere. Cancel anytime</p>
        <p className='mb-4'>
          Ready to watch? Enter your email to create or restart your membership
        </p>

        <form
          className='flex flex-col md:flex-row gap-4 w-full md:w-1/2'
          onSubmit={handleFormSubmit}
        >
          <input
            type='email'
            placeholder='Email address'
            className='p-2 rounded bg-black/80 border border-gray-600 flex-1'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button
            className='bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded flex items-center justify-center font-semibold'
            type='submit'
          >
            Get Started
            <ChevronRight className='w-6 h-6 ml-1' />
          </button>
        </form>
      </div>

      {/* Separator */}
      <div className='h-2 w-full bg-[#232323]' aria-hidden='true' />

      {/* First section */}
      <div className='py-10 bg-black text-white'>
        <div className='flex flex-col md:flex-row max-w-6xl mx-auto items-center justify-center px-4 gap-8'>
          {/* Text left */}
          <div className='md:flex-1 text-center md:text-left'>
            <h2 className='text-4xl md:text-5xl font-semibold mb-4'>
              Enjoy on your TV
            </h2>
            <p className='text-lg'>
              Watch on Smart TVs, PlayStation, Xbox, Chromecast, Apple TV,
              Blu-ray players and more.
            </p>
          </div>
          {/* Image right */}
          <div className='md:flex-1 relative'>
            <img src='/tv.png' alt='TV' className='z-10 relative' />
            <video
              className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70%] z-0'
              playsInline
              autoPlay
              muted
              loop
            >
              <source src='/hero-vid.m4v' type='video/mp4' />
            </video>
          </div>
        </div>
      </div>

      {/* Separator */}
      <div className='h-2 w-full bg-[#232323]' aria-hidden='true' />

      {/* Second section */}
      <div className='py-10 bg-black text-white'>
        <div className='flex flex-col md:flex-row max-w-6xl mx-auto items-center justify-center px-4 gap-8'>
          {/* Image left */}
          <div className='md:flex-1 relative'>
            <img src='/stranger-things-lg.png' alt='Stranger Things' />
            <div className='flex items-center gap-2 absolute bottom-5 left-1/2 -translate-x-1/2 bg-black w-[80%] md:w-1/2 p-2 border border-gray-700 rounded'>
              <img src='/stranger-things-sm.png' alt='Stranger' className='h-14' />
              <div className='flex flex-col flex-1'>
                <span className='text-base font-bold'>Stranger Things</span>
                <span className='text-sm text-blue-500'>Downloading...</span>
              </div>
              <img src='/download-icon.gif' alt='Loading' className='h-14' />
            </div>
          </div>
          {/* Text right */}
          <div className='md:flex-1 text-center md:text-left'>
            <h2 className='text-4xl md:text-5xl font-semibold mb-4'>
              Download your shows to watch offline
            </h2>
            <p className='text-lg'>
              Save your favourites easily and always have something to watch.
            </p>
          </div>
        </div>
      </div>

      {/* Separator */}
      <div className='h-2 w-full bg-[#232323]' aria-hidden='true' />

      {/* Third section */}
      <div className='py-10 bg-black text-white'>
        <div className='flex flex-col md:flex-row max-w-6xl mx-auto items-center justify-center px-4 gap-8'>
          {/* Text left */}
          <div className='md:flex-1 text-center md:text-left'>
            <h2 className='text-4xl md:text-5xl font-semibold mb-4'>
              Watch everywhere
            </h2>
            <p className='text-lg'>
              Stream unlimited movies and TV shows on your phone, tablet, laptop and TV.
            </p>
          </div>
          {/* Image right */}
          <div className='md:flex-1 relative'>
            <img src='/device-pile.png' alt='Devices' className='z-10 relative' />
            <video
              className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60%] z-0'
              playsInline
              autoPlay
              muted
              loop
            >
              <source src='/video-devices.m4v' type='video/mp4' />
            </video>
          </div>
        </div>
      </div>

      {/* Separator */}
      <div className='h-2 w-full bg-[#232323]' aria-hidden='true' />

      {/* Fourth section */}
      <div className='py-10 bg-black text-white'>
        <div className='flex flex-col md:flex-row max-w-6xl mx-auto items-center justify-center px-4 gap-8'>
          {/* Image left */}
          <div className='md:flex-1'>
            <img src='/kids.png' alt='Kids profile' />
          </div>
          {/* Text right */}
          <div className='md:flex-1 text-center md:text-left'>
            <h2 className='text-4xl md:text-5xl font-semibold mb-4'>
              Create profiles for kids
            </h2>
            <p className='text-lg'>
              Send kids on adventures with their favourite characters in a space made just for them—free with your membership.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthScreen;
