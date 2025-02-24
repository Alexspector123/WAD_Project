import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/home/HomePage';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage'
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
  
  // hiển thị loading khi đang kiểm tra xác thực
  if(isCheckingAuth) {
    return (
    <div className='h-screen'>
      <div>
        <Loader className='animate-spin text-[red] size-[10]'/>
      </div>
    </div>
    );
  }
  
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={!user ? <LoginPage />: <Navigator to={"/"}/>} />
        <Route path="/signup" element={!user ? <SignUpPage />: <Navigator to={"/"}/>} />
        <Route path="/watch/:id" element={user ? <WatchPage />: <Navigator to={"/login"}/>} />
      </Routes>      
      <Footer/>
      <Toaster />
    </>
  );
}

export default App;
