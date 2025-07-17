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

          <h1 className="text-2xl font-bold mb-4">Create a New Post</h1>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="post" className="block text-sm font-medium text-gray-700">Post Content</label>
              <textarea
                id="post"
                value={postContent}
                onChange={(e) => setPostContent(e.target.value)}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm text-black"
                rows={4}
                maxLength={500}
                required
              />
            </div>

            {/* Toggle switch for anonymous posting */}
            <label className="flex items-center space-x-2 text-sm text-white">
              <input
                type="checkbox"
                checked={isAnonymous}
                onChange={() => setIsAnonymous(!isAnonymous)}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <span>Post Anonymously</span>
            </label>

            <button
              type="submit"
              className="inline-flex items-center px-4 py-2 bg-blue-600 border border-transparent rounded-md shadow-sm text-white font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              disabled={!loggedInUser}
            >
              Post
            </button>
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
