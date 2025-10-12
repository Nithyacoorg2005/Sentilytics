import React, { useState } from 'react';
import axios from 'axios'; // Import axios

// (Your GoogleIcon component can remain here)
const GoogleIcon = () => (
  <svg className="w-5 h-5 mr-3" viewBox="0 0 48 48">
    {/* SVG paths... */}
  </svg>
);

export const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(''); // State to hold error messages

  const handleSignin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(''); // Clear previous errors

    try {
      // Send a POST request to your backend's login endpoint
      const response = await axios.post('http://localhost:5000/api/auth/login', {
        email,
        password,
      });

      console.log('Login successful:', response.data);

      // --- HANDLE SUCCESSFUL LOGIN ---
      // 1. Store the token to keep the user logged in
      localStorage.setItem('token', response.data.token);
      
      alert('Sign-in successful!');

      // 2. Redirect the user to the main application page/dashboard
      window.location.href = '/'; // Or '/dashboard'

    } catch (err: any) {
      // Handle errors from the backend
      console.error('Login error:', err.response?.data?.message || err.message);
      setError(err.response?.data?.message || 'Invalid credentials. Please try again.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
      <div className="w-full max-w-md p-8 space-y-6 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg">
        
        <div className="text-center">
          <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-500">
            ✨ Welcome Back!
          </h1>
          <p className="mt-2 text-gray-500">Sign in to continue to Sentilytics.</p>
        </div>

        <form onSubmit={handleSignin} className="space-y-6">
          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 mt-1 text-gray-800 bg-gray-100 border border-gray-200 rounded-lg focus:ring-purple-500 focus:border-purple-500"
                placeholder="you@example.com"
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 mt-1 text-gray-800 bg-gray-100 border border-gray-200 rounded-lg focus:ring-purple-500 focus:border-purple-500"
                placeholder="••••••••"
              />
            </div>
          </div>
          
          {error && (
            <div className="p-3 text-sm text-red-700 bg-red-100 border border-red-400 rounded-lg">
              {error}
            </div>
          )}

          <div>
            <button
              type="submit"
              className="w-full py-3 font-bold text-white transition-transform duration-200 ease-in-out transform bg-gradient-to-r from-purple-600 to-pink-500 rounded-lg hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
            >
              Sign In
            </button>
          </div>
        </form>

        <div className="flex items-center justify-center">
          <div className="flex-grow border-t border-gray-300"></div>
          <span className="px-4 text-sm font-semibold text-gray-400">OR</span>
          <div className="flex-grow border-t border-gray-300"></div>
        </div>

        <div>
          <a
            href="http://localhost:5000/api/auth/google"
            className="flex items-center justify-center w-full py-3 font-semibold text-gray-700 transition-colors duration-300 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            <GoogleIcon />
            Sign In with Google
          </a>
        </div>

        <div className="text-sm text-center text-gray-500">
          Don't have an account yet?{' '}
          <a href="/signup" className="font-medium text-purple-600 hover:underline">
            Sign Up
          </a>
        </div>
      </div>
    </div>
  );
};