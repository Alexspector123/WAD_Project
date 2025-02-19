import React from 'react';
import { Link } from 'react-router-dom';

const SignUpPage = () => {
  const [email, setEmail] = React.useState('');
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');

  const handleSignUp = (e) => {
    e.preventDefault();
    console.log(email, username, password);
    setEmail('');
    setUsername('');
    setPassword('');
  };

  return (
    <div className="h-screen w-full hero-bg">
      <header className="max-w-6xl mx-auto flex items-center justify-between p-4">
        <Link to="/">
          <img src="/netflix-logo.png" alt="logo" className="w-28" />
        </Link>
      </header>

      <div className="flex justify-center items-center mt-20 mx-3">
        {/* Changed bg-black-60 -> bg-black/60 */}
        <div className="w-full max-w-md p-8 space-y-6 bg-black/60 rounded-lg shadow-md">
          <h1 className="text-center text-white text-2xl font-bold mb-4">Sign Up</h1>

          <form className="space-y-6" onSubmit={handleSignUp}>
            <div>
              <label htmlFor="email" className="text-sm font-medium text-gray-300 block">
                Email
              </label>
              <input
                type="email"
                id="email"
                className="w-full px-3 py-2 mt-1 border border-gray-700 rounded-md 
                           bg-transparent text-white placeholder-gray-400
                           focus:outline-none focus:ring-2 focus:ring-red-600 
                           transition duration-200"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div>
              <label htmlFor="username" className="text-sm font-medium text-gray-300 block">
                User Name
              </label>
              <input
                type="text"
                id="username"
                className="w-full px-3 py-2 mt-1 border border-gray-700 rounded-md 
                           bg-transparent text-white placeholder-gray-400
                           focus:outline-none focus:ring-2 focus:ring-red-600 
                           transition duration-200"
                placeholder="Enter user name"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>

            <div>
              <label htmlFor="password" className="text-sm font-medium text-gray-300 block">
                Password
              </label>
              <input
                type="password"
                id="password"
                className="w-full px-3 py-2 mt-1 border border-gray-700 rounded-md 
                           bg-transparent text-white placeholder-gray-400
                           focus:outline-none focus:ring-2 focus:ring-red-600 
                           transition duration-200"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button
              className="w-full py-2 bg-red-600 text-white font-semibold 
                         rounded-md hover:bg-red-700 
                         transition duration-200"
            >
              Sign Up
            </button>
          </form>

          <div className="text-center text-gray-400">
            Already have an account?{' '}
            <Link to="/login" className="text-red-600 hover:underline">
              Log In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
