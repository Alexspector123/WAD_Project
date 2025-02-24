// App.jsx
import React, { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './pages/home/HomePage';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import WatchPage from './WatchPage.jsx';
import Footer from './components/Footer';
import { useAuthStore } from './store/authUser.js';
import { Toaster } from 'react-hot-toast';
import { Loader } from 'lucide-react';

function App() {
  const { user, isCheckingAuth, authCheck } = useAuthStore();

  useEffect(() => {
    authCheck();
  }, [authCheck]);

  if (isCheckingAuth) {
    return (
      <div className='h-screen flex items-center justify-center bg-black text-white'>
        <Loader className='animate-spin text-red-500 w-10 h-10' />
      </div>
    );
  }

  return (
    <>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route
          path='/login'
          element={!user ? <LoginPage /> : <Navigate to='/' />}
        />
        <Route
          path='/signup'
          element={!user ? <SignUpPage /> : <Navigate to='/' />}
        />
        <Route
          path='/watch/:id'
          element={user ? <WatchPage /> : <Navigate to='/login' />}
        />
      </Routes>
      <Footer />
      <Toaster />
    </>
  );
}

export default App;
