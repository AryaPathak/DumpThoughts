// components/posts.tsx

import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface Post {
  post_id: number;
  user_id: number; // Added user_id field
  username: string;
  post: string;
  created_at: string;
}

interface PostsListProps {
  userId: number; // Add userId prop
}

const PostsList: React.FC<PostsListProps> = ({ userId }) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<Post[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        console.log('Fetching posts for userId:', userId); // Log userId
        const response = await axios.get('http://localhost:3000/api/v1/posts/allposts');
        const allPosts = response.data;
        console.log(allPosts)
        setPosts(allPosts);

        // Apply filter based on userId
        if (userId === 0) {
          setFilteredPosts(allPosts); // Show all posts if userId is 0
        } else {
          setFilteredPosts(allPosts.filter((post: Post) => post.user_id === userId));
        }
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };
    

    fetchPosts();
  }, [userId]);

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold text-center mb-6">All Posts</h2>
      <div className="space-y-4">
        {filteredPosts.map((post) => (
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
};

export default PostsList;
