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
  user: User | null; // currently logged-in user
  userId: number | undefined; // profile being viewed
  refreshPosts: boolean;
  onClose: () => void;
}

const ProfilePage: React.FC<ProfilePageProps> = ({ userId, refreshPosts, onClose, user }) => {
  const [userData, setUserData] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isFollowing, setIsFollowing] = useState<boolean>(false);

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

        // Set following state
        if (user && res.data.follower_ids) {
          const followers = res.data.follower_ids.split(',').map((id: string) => parseInt(id));
          setIsFollowing(followers.includes(user.user_id));
        }
      } catch (error) {
        console.error("Error fetching user:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUser();
  }, [userId, user]);

  const handleFollowToggle = async () => {
    try {
      await axios.post(`http://localhost:3000/api/v1/users/${userId}/toggle-follow`, {
        followerId: user?.user_id,
      });
      setIsFollowing((prev) => !prev);
    } catch (error) {
      console.error("Error toggling follow:", error);
    }
  };

  return (
    <div className="relative text-white max-w-xl mx-auto mt-8">
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
              src="https://picsum.photos/id/237/200/300"
              alt="Banner"
              className="object-cover w-full h-full rounded-t-xl"
            />
          </div>

          {/* Avatar - overlaid */}
          <div className="relative pl-2 flex items-center justify-between pr-6">
            <img
              src={userData.profile_pic_url || defaultImage}
              alt="Profile"
              className="w-28 h-28 rounded-full border-4 border-black shadow-lg"
            />
            {/* Follow button (hidden if viewing own profile) */}
            {user?.user_id !== userData.user_id && (
              <button
                onClick={handleFollowToggle}
                className={`px-4 py-2 rounded-full text-sm font-semibold shadow-md ${
                  isFollowing ? 'bg-gray-600 hover:bg-gray-700' : 'bg-blue-600 hover:bg-blue-700'
                }`}
              >
                {isFollowing ? 'Unfollow' : 'Follow'}
              </button>
            )}
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
            <h2 className="text-xl font-semibold border-b border-gray-600 pb-2 mb-4">
              {userData.name.split(' ')[0]}'s Posts
            </h2>
            <PostsList userId={userData.user_id} refreshPosts={refreshPosts} hideAnonymous={true} />
          </div>
        </>
      ) : (
        <p className="text-white text-center">User not found</p>
      )}
    </div>
  );
};

export default ProfilePage;
