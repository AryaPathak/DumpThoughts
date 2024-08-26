// components/PostsList.tsx

"use client"; // Add this line at the top

import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface Post {
  post_id: number;
  username: string;
  post: string;
  created_at: string;
}

export default function PostsList() {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    // Fetch posts from the server
    const fetchPosts = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/v1/posts/allposts');
        setPosts(response.data);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold text-center mb-6">All Posts</h2>
      <div className="space-y-4">
        {posts.map((post) => (
          <div key={post.post_id} className="bg-gray-800 p-4 rounded-lg shadow-md">
            <div className="flex items-center space-x-4 mb-2">
              <span className="font-semibold text-lg">{post.username}</span>
              <span className="text-gray-400 text-sm">{new Date(post.created_at).toLocaleString()}</span>
            </div>
            <p className="text-gray-200">{post.post}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
