"use client";

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PostsList from '../posts/page';
import ProfilePage from '../profile/page';

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

const HomePage: React.FC<HomePageProps> = ({ loggedInUser }) => {
  const [postContent, setPostContent] = useState('');
  const [message, setMessage] = useState('');
  const [user, setUser] = useState<User | null>(null);
  const [showProfile, setShowProfile] = useState(false);
  const [refreshPosts, setRefreshPosts] = useState(false);
  const [isAnonymous, setIsAnonymous] = useState(false); // <-- NEW STATE

  useEffect(() => {
    if (loggedInUser) {
      const fetchUserData = async () => {
        try {
          const response = await axios.get(`http://localhost:3000/api/v1/users`);
          const userData = response.data.find((u: User) => u.user_id === loggedInUser);
          setUser(userData);
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      };

      fetchUserData();
    }
  }, [loggedInUser]);

  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault();

    try {
      const response = await axios.post('http://localhost:3000/api/v1/posts/addposts', {
        user_id: loggedInUser,
        post: postContent,
        is_anonymous: isAnonymous, 
      });

      setMessage(`Post created successfully!`);
      setPostContent('');
      setIsAnonymous(false); // Reset
      setRefreshPosts(!refreshPosts);

      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      setMessage('Error creating post');
      console.error("There was an error creating the post!", error);
      setTimeout(() => setMessage(''), 3000);
    }
  };

  const handleProfileClick = () => {
    setShowProfile(true);
  };

  return (
    <div className="container mx-auto p-4">
      {showProfile ? (
        <ProfilePage user={user} refreshPosts={refreshPosts} onClose={() => setShowProfile(false)} />
      ) : (
        <>
          {user && (
            <button
              onClick={handleProfileClick}
              className="text-white text-lg absolute top-0 left-0 m-4 px-4 py-2 bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Hello, {user.name.split(' ')[0]}!
            </button>
          )}

       
          <form onSubmit={handleSubmit} className="bg-[#16181c] p-4 rounded-xl shadow-md text-white">
            <div className="flex space-x-4">
              <img
                src={user?.profile_pic_url || "https://robohash.org/default-user"}
                alt="Profile"
                className="w-10 h-10 rounded-full object-cover"
              />
             

              <div className="flex-1">
                {/* Post textarea */}
                <textarea
                  placeholder="What's on your mind?"
                  value={postContent}
                  onChange={(e) => setPostContent(e.target.value)}
                  rows={3}
                  maxLength={500}
                  className="w-full bg-transparent text-white placeholder-gray-500 focus:outline-none resize-none"
                />

                {/* Icon row */}
                <div className="flex items-center justify-between mt-3">
                  <div className="flex space-x-4 text-blue-400">
                    {/* Media Upload Button */}
                    <button
                      type="button"
                      title="Add photo or video"
                      onClick={() => document.getElementById('media-upload')?.click()}
                      className="hover:text-blue-300"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7h2l.4 2M7 7h10l1 5H6.4M5 19h14a2 2 0 002-2v-5H3v5a2 2 0 002 2z" />
                      </svg>
                    </button>

                    {/* Add more icons as needed */}
                  </div>

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={!postContent.trim()}
                    className={`px-4 py-1 rounded-full text-sm font-semibold transition ${
                      postContent.trim()
                        ? 'bg-blue-500 text-white hover:bg-blue-600'
                        : 'bg-gray-700 text-gray-400 cursor-not-allowed'
                    }`}
                  >
                    Post
                  </button>
                </div>

                {/* Hidden file input */}
                <input
                  type="file"
                  id="media-upload"
                  accept="image/*,video/*"
                  className="hidden"
                  onChange={(e) => {
                    // Handle media upload here (optional)
                    const file = e.target.files?.[0];
                    if (file) {
                      console.log('Media selected:', file.name);
                    }
                  }}
                />
              </div>
            </div>
          </form>


          {message && (
            <div className="fixed top-5 right-5 z-50 bg-green-600 text-white px-4 py-3 rounded-md shadow-lg transition-all duration-300">
              {message}
            </div>
          )}

          <h2 className="text-2xl font-bold mt-8 mb-4">All Posts</h2>
          <PostsList userId={0} refreshPosts={refreshPosts} />
        </>
      )}
    </div>
  );
};

export default HomePage;
