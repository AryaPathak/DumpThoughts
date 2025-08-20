"use client";

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Heart, MessageCircle } from 'lucide-react';


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
  user_id: number;
  username: string;
  post: string;
  created_at: string;
  media_url?: string;
  is_anonymous?: boolean;
  profile_pic_url?: string;
}

interface PostsListProps {
  userId: number;
  refreshPosts: boolean;
  onUserClick?: (username: string) => void; 
  hideAnonymous?: boolean;
}




const PostsList: React.FC<PostsListProps> = ({ userId, refreshPosts, onUserClick, hideAnonymous }) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [visiblePosts, setVisiblePosts] = useState<Post[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10);
  const [isLoading, setIsLoading] = useState(false);
  

  

  const fetchPosts = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get('http://localhost:3000/api/v1/posts/allposts');
      const allPosts = response.data;

      let filtered = userId === 0
        ? allPosts
        : allPosts.filter((post: Post) => post.user_id === userId);

      if (hideAnonymous) {
        filtered = filtered.filter((post: Post) => !post.is_anonymous);
      }


      setPosts(filtered);
      setVisiblePosts(filtered.slice(0, currentPage * postsPerPage));
    } catch (error) {
      console.error('Error fetching posts:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [userId]);

  useEffect(() => {
    fetchPosts();
  }, [userId, refreshPosts, currentPage]);

  const handleLoadMore = () => {
    const nextPage = currentPage + 1;
    const nextPosts = posts.slice(0, nextPage * postsPerPage);
    setVisiblePosts(nextPosts);
    setCurrentPage(nextPage);
  };
  
  return (
    <div className="container mx-auto p-4">
    
      {isLoading && (
        <div className="flex justify-center my-6">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      )}

      <div className="space-y-4">
        {visiblePosts.map((post) => (
          <div key={post.post_id} className="bg-gray-800 p-4 rounded-lg shadow-md">
            <div
              onClick={() => post.is_anonymous ? null : onUserClick?.(post.username)}
              className={`flex items-center space-x-4 mb-2 cursor-pointer ${
                post.is_anonymous ? 'cursor-default' : 'hover:opacity-80'
              }`}
            >
              <img
                src={
                  post.is_anonymous
                    ? "https://cdn0.iconfinder.com/data/icons/unigrid-flat-human-vol-2/90/011_111_mask_anonymous_anonym_hacker_vendetta_face_mimicry-512.png"
                    : post.profile_pic_url || "https://demo.patternlab.io/images/fpo_avatar.png"
                }
                alt="Profile"
                className="w-10 h-10 rounded-full object-cover border border-white"
              />
              <div>
                <span className="font-semibold text-lg">
                  {post.is_anonymous ? 'Anonymous' : post.username}
                </span>
                <div className="text-gray-400 text-sm">
                  {timeAgo(new Date(post.created_at))}
                </div>
              </div>
            </div>


            <p className="text-gray-200 mb-2">{post.post}</p>

            {post.media_url && (
              post.media_url.match(/\.(mp4|webm|ogg)$/i) ? (
                <video
                  controls
                  className="border border-white max-w-full h-auto rounded-md mx-auto mt-2"
                >
                  <source src={post.media_url} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              ) : (
                <img
                  src={post.media_url}
                  alt="Post media"
                  className="border border-white max-w-full h-auto rounded-md mx-auto mt-2"
                />
              )
            )}

            <div className="flex items-center gap-6 mt-3 text-gray-400 text-sm">
              <button className="flex items-center gap-1 hover:text-red-400 transition">
                <Heart size={18} />
                <span className="text-gray-400 text-sm ml-0">12</span>
              </button>

              {/* Comment Button */}
              <button className="flex items-center gap-1 hover:text-blue-400 transition">
                <MessageCircle size={18} />
                <span className="text-gray-400 text-sm ml-0">3</span>
              </button>
            </div>

          </div>
        ))}
      </div>

      {!isLoading && visiblePosts.length < posts.length && (
        <div className="text-center mt-6">
          <button
            onClick={handleLoadMore}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Load More
          </button>
          

        </div>

      )}

      {!isLoading && visiblePosts.length === 0 && (
            <div className="text-center text-gray-400 my-6">
              No posts to display.
            </div>
          )}
    </div>
  );
};

export default PostsList;
