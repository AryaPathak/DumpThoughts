"use client"; // Add this line at the top

import React, { useState } from 'react';
import axios from 'axios';
import AddPost from './inputBox';

export default function LoginPage() {
  const [contactInfo, setContactInfo] = useState('');
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (event: { preventDefault: () => void; }) => {
    event.preventDefault();

    try {
      const response = await axios.post('http://localhost:3000/api/v1/auth/login', {
        contact_info: contactInfo,
        password: password
      });

      if (response.status === 200) {
        setIsAuthenticated(true);
        setMessage('Login successful!');
      }
    } catch (error) {
      setMessage('Login failed: Invalid credentials');
      setIsAuthenticated(false);
    }
  };

  if (isAuthenticated) {
    return <AddPost />;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Login</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="contact_info" className="block text-sm font-medium text-gray-700">Contact Info</label>
          <input
            type="text"
            id="contact_info"
            value={contactInfo}
            onChange={(e) => setContactInfo(e.target.value)}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm text-black"
            required
          />
        </div>
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm text-black"
            required
          />
        </div>
        <button
          type="submit"
          className="inline-flex items-center px-4 py-2 bg-blue-600 border border-transparent rounded-md shadow-sm text-white font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Login
        </button>
      </form>
      {message && <p className={`mt-4 ${message.includes('successful') ? 'text-green-600' : 'text-red-600'}`}>{message}</p>}
    </div>
  );
}
