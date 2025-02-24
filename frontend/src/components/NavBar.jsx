// NavBar.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Menu } from 'lucide-react';
import { useAuthStore } from '../store/authUser.js';
import { useContentStore } from '../store/content.js';

const NavBar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, logout } = useAuthStore();
  const { setContentType } = useContentStore();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className='max-w-6xl mx-auto flex items-center justify-between p-4 h-16 bg-black'>
      <div className='flex items-center gap-4'>
        <Link to='/'>
          <img
            src='netflix-logo.png'
            alt='Netflix Logo'
            className='w-[50px] md:w-[70px]'
          />
        </Link>
        {/* Menu items (Desktop) */}
        <div className='hidden md:flex items-center gap-4'>
          <button
            onClick={() => setContentType('movie')}
            className='hover:underline'
          >
            Movies
          </button>
          <button
            onClick={() => setContentType('tv')}
            className='hover:underline'
          >
            TV Shows
          </button>
          <Link to='/history' className='hover:underline'>
            Search History
          </Link>
        </div>
      </div>

      <div className='flex gap-4 items-center'>
        <Link to='/search'>
          <Search className='w-5 h-5 cursor-pointer' />
        </Link>
        {/* Avatar người dùng (nếu có) */}
        {user?.image ? (
          <img
            src={user.image}
            alt='Avatar'
            className='h-8 w-8 rounded-full object-cover'
          />
        ) : (
          <div className='h-8 w-8 rounded-full bg-gray-500' />
        )}

        <button
          onClick={logout}
          className='bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700'
        >
          Logout
        </button>

        {/* Hamburger menu (Mobile) */}
        <div className='md:hidden'>
          <Menu className='w-6 h-6 cursor-pointer' onClick={toggleMobileMenu} />
        </div>
      </div>

      {/* Mobile items */}
      {isMobileMenuOpen && (
        <div className='absolute top-16 left-0 w-full bg-black border-t border-gray-700 z-50 md:hidden'>
          <button
            onClick={() => {
              toggleMobileMenu();
              setContentType('movie');
            }}
            className='block w-full text-left px-4 py-2 hover:underline'
          >
            Movies
          </button>
          <button
            onClick={() => {
              toggleMobileMenu();
              setContentType('tv');
            }}
            className='block w-full text-left px-4 py-2 hover:underline'
          >
            TV Shows
          </button>
          <Link
            to='/history'
            className='block w-full text-left px-4 py-2 hover:underline'
            onClick={toggleMobileMenu}
          >
            Search History
          </Link>
        </div>
      )}
    </header>
  );
};

export default NavBar;
