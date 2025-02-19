import React from 'react'
import { useAuthStore } from '../../store/authUser.js';
import NavBar from '../../components/NavBar.jsx';

const HomeScreen = () => {
  const { logout } = useAuthStore();
  return (
    <>
      <div className='relative h-screen text-[white] bg-[black]'>
        <button onClick={logout}>Logout</button>
        <NavBar/>
      </div>
    </>
    
  );
};

export default HomeScreen