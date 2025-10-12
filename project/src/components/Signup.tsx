import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom'; // Import Link

const GoogleIcon = () => (
  <svg className="w-5 h-5 mr-3" viewBox="0 0 48 48">
    <path fill="#FFC107" d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8c-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039L38.802 6.84C34.553 2.951 29.563 0 24 0C10.745 0 0 10.745 0 24s10.745 24 24 24s24-10.745 24-24c0-1.724-.175-3.411-.5-5.042z"></path><path fill="#FF3D00" d="M6.306 14.691c-1.645 3.284-2.606 7.027-2.606 11.029s.961 7.745 2.606 11.029l-5.321 4.14C1.085 35.845 0 30.155 0 24c0-6.155 1.085-11.845 3.006-16.839l5.3 4.53z"></path><path fill="#4CAF50" d="M24 48c5.166 0 9.86-1.977 13.409-5.192l-6.19-4.848C29.211 41.658 26.714 44 24 44c-5.166 0-9.6-3.317-11.284-7.946l-6.522 5.025C9.506 43.477 16.225 48 24 48z"></path><path fill="#1976D2" d="M43.611 20.083H24v8h11.303c-.792 2.237-2.231 4.166-4.087 5.571l6.19 4.848C42.018 35.438 44 30.066 44 24c0-1.724-.175-3.411-.5-5.042z"></path>
  </svg>
);

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');

    try {
      await axios.post('http://localhost:5000/api/auth/register', {
        name,
        email,
        password,
      });
      alert('Sign-up successful! Please log in.');
      navigate('/login');
    } catch (err: any) {
      setError(err.response?.data?.message || 'An unexpected error occurred.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
      <div className="w-full max-w-md p-8 space-y-6 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-500">
            ✨ Create Account
          </h1>
          <p className="mt-2 text-gray-500">Join Sentilytics today.</p>
        </div>

        <form onSubmit={handleSignup} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
            <input
              id="name"
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3 mt-1 text-gray-800 bg-gray-100 border border-gray-200 rounded-lg focus:ring-purple-500 focus:border-purple-500"
              placeholder="Your Name"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email address</label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 mt-1 text-gray-800 bg-gray-100 border border-gray-200 rounded-lg focus:ring-purple-500 focus:border-purple-500"
              placeholder="you@example.com"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <input
              id="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 mt-1 text-gray-800 bg-gray-100 border border-gray-200 rounded-lg focus:ring-purple-500 focus:border-purple-500"
              placeholder="••••••••"
            />
          </div>

          {error && (
            <div className="p-3 text-sm text-red-700 bg-red-100 border border-red-400 rounded-lg">
              {error}
            </div>
          )}

          <button
            type="submit"
            className="w-full py-3 font-bold text-white transition-transform duration-200 ease-in-out transform bg-gradient-to-r from-purple-600 to-pink-500 rounded-lg hover:scale-105"
          >
            Create Account
          </button>
        </form>

        <div className="flex items-center justify-center">
          <div className="flex-grow border-t border-gray-300"></div>
          <span className="px-4 text-sm font-semibold text-gray-400">OR</span>
          <div className="flex-grow border-t border-gray-300"></div>
        </div>

        <a
          href="http://localhost:5000/api/auth/google"
          className="flex items-center justify-center w-full py-3 font-semibold text-gray-700 transition-colors duration-300 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
        >
          <GoogleIcon />
          Sign Up with Google
        </a>

        <div className="text-sm text-center text-gray-500">
          Already have an account?{' '}
          <Link to="/login" className="font-medium text-purple-600 hover:underline">
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;