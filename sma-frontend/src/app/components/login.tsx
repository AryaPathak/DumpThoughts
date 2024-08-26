"use client"; // Add this line at the top

import React, { useState } from 'react';
import axios from 'axios';
import AddPost from './inputBox';

export default function LoginPage() {
  const [contactInfo, setContactInfo] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [bio, setBio] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [message, setMessage] = useState('');
  const [isLoginMode, setIsLoginMode] = useState(true);

  const handleSubmit = async (event: { preventDefault: () => void; }) => {
    event.preventDefault();

    try {
      if (isLoginMode) {
        // Login functionality
        const response = await axios.post('http://localhost:3000/api/v1/auth/login', {
          contact_info: contactInfo,
          password: password
        });

        if (response.status === 200) {
          setIsAuthenticated(true);
          setMessage('Login successful!');
        }
      } else {
        // Signup functionality
        const response = await axios.post('http://localhost:3000/api/v1/auth/create-account', {
          contact_info: contactInfo,
          password: password,
          name: name,
          username: username,
          bio: bio
        });

        if (response.status === 201) {
          setMessage('Signup successful! Please log in.');
          setIsLoginMode(true); // Switch to login mode after successful signup
        }
      }
    } catch (error) {
      setMessage(isLoginMode ? 'Login failed: Invalid credentials' : 'Signup failed: Please try again');
      setIsAuthenticated(false);
    }
  };

  if (isAuthenticated) {
    return <AddPost />;
  }

  return (
    <div className="container mx-auto p-4 bg-gray-900 text-white min-h-screen flex justify-center items-center">
      <div className="w-full max-w-md bg-gray-800 p-8 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold mb-8 text-center">{isLoginMode ? 'Login' : 'Signup'}</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          {!isLoginMode && (
            <>
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-300">Name</label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="mt-2 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm text-white p-3"
                  required
                />
              </div>
              <div>
                <label htmlFor="username" className="block text-sm font-medium text-gray-300">Username</label>
                <input
                  type="text"
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="mt-2 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm text-white p-3"
                  required
                />
              </div>
              <div>
                <label htmlFor="bio" className="block text-sm font-medium text-gray-300">Bio</label>
                <textarea
                  id="bio"
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  className="mt-2 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm text-white p-3"
                  rows={3}
                />
              </div>
            </>
          )}
          <div>
            <label htmlFor="contact_info" className="block text-sm font-medium text-gray-300">Contact Info</label>
            <input
              type="text"
              id="contact_info"
              value={contactInfo}
              onChange={(e) => setContactInfo(e.target.value)}
              className="mt-2 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm text-white p-3"
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-300">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-2 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm text-white p-3"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full inline-flex justify-center px-4 py-2 bg-blue-600 border border-transparent rounded-md shadow-sm text-white font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            {isLoginMode ? 'Login' : 'Signup'}
          </button>
        </form>
        {message && (
          <p className={`mt-4 text-center ${message.includes('successful') ? 'text-green-500' : 'text-red-500'}`}>
            {message}
          </p>
        )}
        <p className="mt-6 text-center text-gray-400">
          {isLoginMode ? "Don't have an account?" : "Already have an account?"}{' '}
          <button
            type="button"
            onClick={() => setIsLoginMode(!isLoginMode)}
            className="text-blue-500 hover:underline"
          >
            {isLoginMode ? 'Sign up here' : 'Log in here'}
          </button>
        </p>
      </div>
    </div>
  );
}
