import React from 'react';
import { Link } from 'react-router-dom';
import { useAuthStore } from '../store/authUser';

const SignUpPage = () => {
  const { searchParams } = new URL(document.location);
  const emailValue = searchParams.get("email");

  const [email, setEmail] = React.useState(emailValue || "");
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');

  const { signup } = useAuthStore();

  const handleSignUp = (e) => {
    e.preventDefault();
    signup({ email, username, password});
  };

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

          <form className="space-y-[6px]" onSubmit={handleSignUp}>
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
              <label htmlFor="username" className="text-start font-stretch-normal text-[white] block">
                User Name
              </label>
              <input
                type="text"
                id="username"
                className="w-full px-[3px] py-[2px] mt-[1px] border border-[gray]/700 rounded-full
                           bg-transparent text-[white] placeholder-[gray]/400
                           focus:outline-none focus:ring-2 focus:ring-[red]/600 
                           transition duration-200"
                placeholder="Enter user name"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
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
            >
              Sign Up
            </button>
          </form>

          <div className="text-center text-[white]/60">
            Already have an account?{' '}
            <Link to="/login" className="text-[red]/60 hover:underline">
              Log In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
