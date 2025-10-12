// File: src/components/Signup.tsx

import React, { useState } from 'react';
import axios from 'axios'; // Import axios

// (Your GoogleIcon component can remain here)
const GoogleIcon = () => (
  <svg className="w-5 h-5 mr-3" viewBox="0 0 48 48">
    {/* SVG paths... */}
  </svg>
);

export const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(''); // State to hold error messages

  // --- UPDATED FUNCTION ---
  const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(''); // Clear previous errors

    try {
      // Send a POST request to your backend's register endpoint
      const response = await axios.post('http://localhost:5000/api/auth/register', {
        name,
        email,
        password,
      });

      console.log('Registration successful:', response.data);
      alert('Sign-up successful! Please log in.');
      // Optionally, redirect the user to the login page
      // window.location.href = '/login';

    } catch (err: any) {
      // Handle errors from the backend
      console.error('Registration error:', err.response?.data?.message || err.message);
      setError(err.response?.data?.message || 'An unexpected error occurred.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
      <div className="w-full max-w-md p-8 space-y-6 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg">
        
        <div className="text-center">
          <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-500">
            ✨ Sentilytics
          </h1>
          <p className="mt-2 text-gray-500">Create an account to get started.</p>
        </div>

        {/* --- FORM WITH ERROR DISPLAY --- */}
        <form onSubmit={handleSignup} className="space-y-6">
          {/* Input fields for name, email, password... (no changes here) */}
          
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
              Create Account
            </button>
          </div>
        </form>

        {/* (Rest of the component remains the same) */}
      </div>
    </div>
  );
};