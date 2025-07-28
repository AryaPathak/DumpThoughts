"use client"; 

import React, { useState } from 'react';
import axios from 'axios';
import AddPost from '../home/page';
import { useRouter } from 'next/navigation';
import { FaEye, FaEyeSlash } from 'react-icons/fa'; 

export default function LoginPage() {
  const [contactInfo, setContactInfo] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [bio, setBio] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [message, setMessage] = useState('');
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [loggedInUser, setLoggedInUser] = useState<number | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [profilePic, setProfilePic] = useState<File | null>(null);
  const [profilePreview, setProfilePreview] = useState<string | null>(null);
  const [bannerPic, setBannerPic] = useState<File | null>(null);
  const [bannerPreview, setBannerPreview] = useState<string | null>(null);
  const router = useRouter();  // initialize the router


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
          setLoggedInUser(response.data.user_id); // Save the user_id
          //console.log("UserId is ",  response);
          router.push('/home');
        }
      } else {
        // Signup functionality
        // Signup functionality
          const formData = new FormData();
          formData.append('contact_info', contactInfo);
          formData.append('password', password);
          formData.append('name', name);
          formData.append('username', username);
          formData.append('bio', bio);
          if (profilePic) formData.append('profile_pic', profilePic);
          if (bannerPic) formData.append('banner_pic', bannerPic);

          const response = await axios.post(
            'http://localhost:3000/api/v1/auth/create-account',
            formData,
            {
              headers: {
                'Content-Type': 'multipart/form-data',
              },
            }
          );


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

  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  if (isAuthenticated) {
    return <AddPost loggedInUser={loggedInUser} />;
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

              <div>
                <label className="block text-sm font-medium text-gray-300">Profile Picture</label>
                <div className="mt-2 flex items-center space-x-3">
                  {profilePreview ? (
                    <img
                      src={profilePreview}
                      alt="Preview"
                      className="w-12 h-12 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-12 h-12 rounded-full bg-gray-600 flex items-center justify-center text-gray-400">
                      ?
                    </div>
                  )}

                  <button
                    type="button"
                    onClick={() => document.getElementById('profile-upload')?.click()}
                    className="text-sm text-blue-500 hover:underline"
                  >
                    Upload Profile Photo
                  </button>
                  <input
                    type="file"
                    id="profile-upload"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        setProfilePic(file);
                        setProfilePreview(URL.createObjectURL(file));
                      }
                    }}
                    className="hidden"
                  />
                </div>
              </div>

              
              <div>
                <label className="block text-sm font-medium text-gray-300">Banner Picture</label>
                <div className="mt-2 flex items-center space-x-3">
                  {bannerPreview ? (
                    <img
                      src={bannerPreview}
                      alt="Preview"
                      className="w-32 h-12 object-cover"
                    />
                  ) : (
                    <div className="w-32 h-12  bg-gray-600 flex items-center justify-center text-gray-400">
                      ?
                    </div>
                  )}

                  <button
                    type="button"
                    onClick={() => document.getElementById('banner-upload')?.click()}
                    className="text-sm text-blue-500 hover:underline"
                  >
                    Add Banner Photo
                  </button>
                  <input
                    type="file"
                    id="banner-upload"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        setBannerPic(file);
                        setBannerPreview(URL.createObjectURL(file));
                      }
                    }}
                    className="hidden"
                  />
                </div>
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
          <div className="relative">
            <label htmlFor="password" className="block text-sm font-medium text-gray-300">Password</label>
            <input
              type={showPassword ? 'text' : 'password'} // Toggle between text and password
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-2 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm text-white p-3"
              required
            />
            <button
              type="button"
              className="absolute inset-y-2
               top-8 right-3 flex items-center text-gray-500"
              onClick={togglePasswordVisibility}
            >
              {showPassword ? <FaEyeSlash size={24} /> : <FaEye size={24} />} {/* Conditionally render the eye icon */}
            </button>
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
