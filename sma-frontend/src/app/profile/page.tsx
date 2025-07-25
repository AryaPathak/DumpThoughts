"use client";

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PostsList from '../posts/page';
import { UserCircle, Users, UserPlus } from 'lucide-react';

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

interface ProfilePageProps {
  user: User | null;
  userId: number | undefined;
  refreshPosts: boolean;
  onClose: () => void;
}


const ProfilePage: React.FC<ProfilePageProps> = ({ userId, refreshPosts, onClose }) => {
  const [userData, setUserData] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const defaultImage = "https://demo.patternlab.io/images/fpo_avatar.png";

  const countIds = (ids: string | null) => {
    if (!ids) return 0;
    return ids.split(',').filter(Boolean).length;
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setIsLoading(true);
        const res = await axios.get(`http://localhost:3000/api/v1/users/${userId}`);
        setUserData(res.data);
      } catch (error) {
        console.error("Error fetching user:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUser();
  }, [userId]);

  return (
  <div className="relative text-white max-w-4xl mx-auto mt-8">
    <button
      onClick={onClose}
      className="absolute top-4 right-4 w-6 h-6 flex items-center justify-center text-l bg-red-500 text-white rounded-full hover:bg-red-600 shadow-md z-20"
    >
      ✕
    </button>

    {isLoading ? (
      <p className="text-white text-center">Loading user data...</p>
    ) : userData ? (
      <>
        {/* Banner */}
        <div className="relative h-40 bg-gray-700 rounded-t-xl">
          <img
            src="https://fastly.picsum.photos/id/10/2500/1667.jpg?hmac=J04WWC_ebchx3WwzbM-Z4_KC_LeLBWr5LZMaAkWkF68" 
            alt="Banner"
            className="object-cover w-full h-full rounded-t-xl"
          />
        </div>

        {/* Avatar - overlaid */}
        <div className="relative -mt-20 pl-6">
          <img
            src={userData.profile_pic_url || defaultImage}
            alt="Profile"
            className="w-28 h-28 rounded-full border-4 border-black shadow-lg"
          />
        </div>

        {/* Profile Info */}
        <div className="p-6 bg-gray-900 rounded-b-xl">
          <h1 className="text-2xl font-bold">{userData.name}</h1>
          <p className="text-blue-400">@{userData.username}</p>
          <p className="text-gray-300 mt-2 italic">{userData.bio || "No bio yet."}</p>

          <div className="flex flex-wrap gap-4 text-sm text-gray-400 mt-4">
            <div className="flex items-center gap-2">
              <Users size={16} />
              <span>{countIds(userData.follower_ids)} Followers</span>
            </div>
            <div className="flex items-center gap-2">
              <UserPlus size={16} />
              <span>{countIds(userData.following_ids)} Following</span>
            </div>
            <div className="flex items-center gap-2">
              <UserCircle size={16} />
              <span>Joined {new Date(userData.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long' })}</span>
            </div>
          </div>
        </div>

        {/* Posts */}
        <div className="mt-10 px-6">
          <h2 className="text-xl font-semibold border-b border-gray-600 pb-2 mb-4">{userData.name.split(' ')[0]}'s Posts</h2>
          <PostsList userId={userData.user_id} refreshPosts={refreshPosts} hideAnonymous={true} />
        </div>
      </>
    ) : (
      <p className="text-white text-center">User not found</p>
    )}
  </div>
);
}

export default ProfilePage;
