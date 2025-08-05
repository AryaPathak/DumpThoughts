"use client";

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PostsList from '../posts/page';
import ProfilePage from '../profile/page';
import LoginPage from '../login/page';

interface HomePageProps {
  loggedInUser: number | null;
}

interface User {
  user_id: number;
  name: string;
  username: string;
  post_ids: string | null;
  following_ids: string | null;
  follower_ids: string | null;
  bio: string;
  created_at: string;
  updated_at: string;
  profile_pic_url?: string;
}

const HomePage: React.FC<HomePageProps> = ({  }) => {
  const loggedInUser = localStorage.getItem('user_id');
  const [postContent, setPostContent] = useState('');
  const [message, setMessage] = useState('');
  const [user, setUser] = useState<User | null>(null);
  const [showProfile, setShowProfile] = useState(false);
  const [refreshPosts, setRefreshPosts] = useState(false);
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  const [showLogin, setShowLogin] = useState(false);

  useEffect(() => {
    if (loggedInUser) {
      const fetchUserData = async () => {
        try {
          const response = await axios.get(`http://localhost:3000/api/v1/users`);
          const userData = response.data.find((u: User) => u.user_id === Number(loggedInUser));
          console.log("Logged in user ID:", loggedInUser);

          setUser(userData);
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      };
      fetchUserData();
    }
  }, [loggedInUser]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('user_id', String(loggedInUser));
    formData.append('post', postContent);
    
    formData.append('is_anonymous', String(isAnonymous));
    if (selectedFile) formData.append('file', selectedFile);
   


    try {
      const response = await axios.post(
        'http://localhost:3000/api/v1/posts/addposts',
        formData,
        { headers: { 'Content-Type': 'multipart/form-data' } }
      );
      console.log('Post created:', response.data);

      setMessage('Post created successfully!');
      setPostContent('');
      setSelectedFile(null);
      setIsAnonymous(false);
      setRefreshPosts(!refreshPosts);
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      console.error('Error creating post:', error);
      setMessage('Error creating post');
      setTimeout(() => setMessage(''), 3000);
    }
  };

  const handleProfileClick = () => setShowProfile(true);
  const handleUserClick = (id: number) => setSelectedUserId(id);
  const closeProfile = () => setSelectedUserId(null);

  return (
    <div className="container mx-auto max-w-2xl p-4">
      <h1 className="text-4xl font-bold text-center mt-10 mb-6 text-white">DumpThoughts</h1>

      {user && (
        <button
          onClick={() => {
            localStorage.removeItem('user_id');
            window.location.href = '/login'; 
          }}
          className="text-white text-sm absolute top-0 right-0 m-4 px-4 py-2 bg-red-600 rounded-xl hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
        >
          Log out
        </button>
      )}

      {showProfile ? (
        <ProfilePage
          user={user}
          userId={user?.user_id}
          refreshPosts={refreshPosts}
          onClose={() => setShowProfile(false)}
        />
      ) : selectedUserId ? (
        <ProfilePage
          user={null}
          userId={selectedUserId}
          refreshPosts={refreshPosts}
          onClose={closeProfile}
        />
      ) : (
        <>
          {user && (
            <button
              onClick={handleProfileClick}
              className="text-white text-lg absolute top-0 left-0 m-4 px-4 py-2 bg-blue-600 rounded-xl hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Hello, {user.name.split(' ')[0]}!
            </button>
          )}

          <form onSubmit={handleSubmit} className="bg-[#16181c] p-5 rounded-2xl shadow-lg text-white mt-4">
            <div className="flex space-x-4">
              <img
                src={user?.profile_pic_url || "https://demo.patternlab.io/images/fpo_avatar.png"}
                alt="Profile"
                className="w-10 h-10 rounded-full object-cover"
              />

              <div className="flex-1">
                <textarea
                  placeholder="What's on your mind?"
                  value={postContent}
                  onChange={(e) => {
                    setPostContent(e.target.value);
                    e.target.style.height = 'auto';
                    e.target.style.height = `${e.target.scrollHeight}px`;
                  }}
                  rows={1}
                  maxLength={500}
                  className="w-full bg-transparent text-white placeholder-gray-500 focus:outline-none resize-none overflow-hidden text-base"
                />

                {selectedFile && (
                  <div className="mt-3 relative w-full max-w-md rounded-xl overflow-hidden border border-gray-700">
                    {selectedFile.type.startsWith('image') ? (
                      <img
                        src={URL.createObjectURL(selectedFile)}
                        alt="Preview"
                        className="w-full h-auto object-cover"
                      />
                    ) : selectedFile.type.startsWith('video') ? (
                      <video controls className="w-full h-auto object-cover">
                        <source src={URL.createObjectURL(selectedFile)} type={selectedFile.type} />
                        Your browser does not support the video tag.
                      </video>
                    ) : null}

                    <button
                      type="button"
                      onClick={() => setSelectedFile(null)}
                      className="absolute top-1 right-1 bg-black bg-opacity-60 text-white text-xs px-2 py-0.5 rounded-full hover:bg-opacity-80"
                    >
                      ×
                    </button>
                  </div>
                )}

                <div className="flex items-center justify-between mt-3">
                  <div className="flex space-x-4 text-blue-400">
                    <button
                      type="button"
                      title="Add media"
                      onClick={() => document.getElementById('media-upload')?.click()}
                      className="hover:text-blue-300"
                    >
                      📷
                    </button>

                    <label htmlFor="anonymous" className="flex items-center cursor-pointer">
                      <div className="relative">
                        <input
                          id="anonymous"
                          type="checkbox"
                          checked={isAnonymous}
                          onChange={() => setIsAnonymous(!isAnonymous)}
                          className="sr-only"
                        />
                        <div className={`block w-11 h-6 rounded-full ${isAnonymous ? 'bg-blue-600' : 'bg-gray-600'}`} />
                        <div
                          className={`dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition ${isAnonymous ? 'translate-x-5' : ''}`}
                        />
                      </div>
                      <span className="ml-3 select-none text-sm">Anonymous</span>
                    </label>
                  </div>

                  <button
                    type="submit"
                    disabled={!postContent.trim()}
                    className={`px-4 py-2 rounded-full text-sm font-semibold transition ${
                      postContent.trim()
                        ? 'bg-blue-500 text-white hover:bg-blue-600'
                        : 'bg-gray-700 text-gray-400 cursor-not-allowed'
                    }`}
                  >
                    Post
                  </button>
                </div>

                <input
                  type="file"
                  id="media-upload"
                  accept="image/*,video/*"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      setSelectedFile(file);
                    }
                  }}
                />
              </div>
            </div>
          </form>

          {message && (
            <div className="fixed top-5 right-5 z-50 bg-green-600 text-white px-4 py-3 rounded-xl shadow-lg transition-all duration-300">
              {message}
            </div>
          )}

          <h2 className="text-2xl font-bold text-center mb-3 mt-6 text-white">All Posts</h2>
          <PostsList userId={0} refreshPosts={refreshPosts} onUserClick={handleUserClick} />
        </>
      )}
    </div>
  );
};

export default HomePage;
