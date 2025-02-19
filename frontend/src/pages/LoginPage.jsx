import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authUser';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const { user, login } = useAuthStore();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    await login({ email, password });
  };

  // Redirect user after successful login
  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  return (
    <div className="h-screen w-full hero-bg">
      <header className="max-w-[6xl] mx-auto flex items-center justify-between p-[10px]">
        <Link to="/">
          <img src="/netflix-logo.png" alt="logo" className="w-[100px]" />
        </Link>
      </header>

      <div className="flex justify-center items-center mt-[20px] mx-[3px]">
        {/* Changed bg-black-60 -> bg-black/60 */}
        <div className="w-full max-w-auto p-[8px] space-y-[6px] bg-[#00000094] rounded-bl-full shadow-current">
          <h1 className="text-center text-[white] text-[2x1] font-stretch-50% mb-[4px]">Sign Up</h1>

          <form className="space-y-[6px]" onSubmit={handleLogin}>
            <div>
              <label htmlFor="email" className="text-start font-stretch-normal text-[white] block">
                Email
              </label>
              <input
                type="email"
                id="email"
                className="w-full px-[3px] py-[2px] mt-[1px] border border-[gray]/700 rounded-full
                           bg-transparent text-[white] placeholder-[gray]/400
                           focus:outline-none focus:ring-2 focus:ring-[red]/600 
                           transition duration-200"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div>
              <label htmlFor="password" className="text-start font-stretch-normal text-[white] block">
                Password
              </label>
              <input
                type="password"
                id="password"
                className="w-full px-[3px] py-[2px] mt-[1px] border border-[gray]/700 rounded-full
                          bg-transparent text-[white] placeholder-[gray]/400
                          focus:outline-none focus:ring-2 focus:ring-[red]/600 
                          transition duration-200"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button
              className="w-full py-[2px] bg-[red] text-[white] font-stretch-semi-expanded
                        rounded-full hover:bg-[red]/700 
                        transition duration-200"
              type="submit"
            >
              Log In
            </button>
          </form>

          <div className="text-center text-[white]/60">
            Don't have an account?{' '}
            <Link to="/signup" className="text-[red]/60 hover:underline">
              Sign Up 
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
