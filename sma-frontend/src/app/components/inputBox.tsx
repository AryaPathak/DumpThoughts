"use client"; // Add this line at the top

import React, { useState } from 'react';
import axios from 'axios';
import PostsList from './posts';

export default function Home() {
  const [userId, setUserId] = useState('');
  const [postContent, setPostContent] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (event: { preventDefault: () => void; }) => {
    event.preventDefault();

    try {
      const response = await axios.post('http://localhost:3000/api/v1/posts/addposts', {
        user_id: userId,
        post: postContent
      });

      setMessage(`Post created successfully: ${response.data.post.post}`);
      setUserId('');
      setPostContent('');
    } catch (error) {
      setMessage('Error creating post');
      console.error("There was an error creating the post!", error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Create a New Post</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="user_id" className="block text-sm font-medium text-gray-700">User ID</label>
          <input
            type="text"
            id="user_id"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm text-black"
            required
          />
        </div>
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
        <button
          type="submit"
          className="inline-flex items-center px-4 py-2 bg-blue-600 border border-transparent rounded-md shadow-sm text-white font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Post
        </button>
      </form>
      {message && <p className="mt-4 text-green-600">{message}</p>}

      {/* Displaying all posts */}
      <h2 className="text-2xl font-bold mt-8 mb-4">All Posts</h2>
      <PostsList />
    </div>
  );
}
