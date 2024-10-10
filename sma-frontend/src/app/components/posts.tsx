import React, { useEffect, useState } from 'react';
import axios from 'axios';

// Utility function to format time ago
const timeAgo = (date: Date) => {
  const now = new Date();
  const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);
  const interval = Math.floor(seconds / 31536000);

  if (interval > 1) return `${interval} years ago`;
  if (interval === 1) return `1 year ago`;

  const monthInterval = Math.floor(seconds / 2592000);
  if (monthInterval > 1) return `${monthInterval} months ago`;
  if (monthInterval === 1) return `1 month ago`;

  const dayInterval = Math.floor(seconds / 86400);
  if (dayInterval > 1) return `${dayInterval} days ago`;
  if (dayInterval === 1) return `1 day ago`;

  const hourInterval = Math.floor(seconds / 3600);
  if (hourInterval > 1) return `${hourInterval} hours ago`;
  if (hourInterval === 1) return `1 hour ago`;

  const minuteInterval = Math.floor(seconds / 60);
  if (minuteInterval > 1) return `${minuteInterval} minutes ago`;
  if (minuteInterval === 1) return `1 minute ago`;

  return `Just now`;
};

interface Post {
  post_id: number;
  user_id: number; // Added user_id field
  username: string;
  post: string;
  created_at: string;
}

interface PostsListProps {
  userId: number; // Add userId prop
  refreshPosts: boolean; // Add refreshPosts prop
}

const PostsList: React.FC<PostsListProps> = ({ userId, refreshPosts }) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<Post[]>([]);

  const fetchPosts = async () => {
    try {
      console.log('Fetching posts for userId:', userId); // Log userId
      const response = await axios.get('http://localhost:3000/api/v1/posts/allposts');
      const allPosts = response.data;
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

  useEffect(() => {
    fetchPosts();
  }, [userId, refreshPosts]); // Refetch posts when userId or refreshPosts changes

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold text-center mb-6">All Posts</h2>
      <div className="space-y-4">
        {filteredPosts.map((post) => (
          <div key={post.post_id} className="bg-gray-800 p-4 rounded-lg shadow-md">
            <div className="flex items-center space-x-4 mb-2">
              <span className="font-semibold text-lg">{post.username}</span>
              <span className="text-gray-400 text-sm">{timeAgo(new Date(post.created_at))}</span>
            </div>
            <p className="text-gray-200">{post.post}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PostsList;
