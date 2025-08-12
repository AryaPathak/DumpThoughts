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

const ProfilePage: React.FC<ProfilePageProps> = ({ userId, refreshPosts, onClose, user }) => {
  const [userData, setUserData] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isFollowing, setIsFollowing] = useState<boolean>(false);
  const [copied, setCopied] = useState(false);

  const handleCopyLink = () => {
    if (userData?.username) {
      const profileUrl = `${window.location.origin}/${userData.username}`;
      navigator.clipboard.writeText(profileUrl)
        .then(() => {
          setCopied(true);
          setTimeout(() => setCopied(false), 2000); // hide after 2s
        })
        .catch((err) => {
          console.error("Failed to copy: ", err);
        });
    }
  };


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
      const fetchedUser = res.data;
      setUserData(fetchedUser);
console.log("Fetched follower_ids:", fetchedUser.follower_ids);
console.log("Fetched following_ids:", fetchedUser.following_ids);

      // Check following status immediately
      if (user && fetchedUser.follower_ids) {
        const followers = fetchedUser.follower_ids.split(',').map((id: string) => parseInt(id));
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
    <div className="relative text-white max-w-2xl mx-auto bg-black border-x border-gray-700 rounded-none overflow-hidden">
     
     

      {isLoading ? (
        <p className="text-white text-center py-10">Loading user data...</p>
      ) : userData ? (
        <>
          {/* Banner */}
          <div className="relative w-full h-48">
            <img
              src="https://picsum.photos/id/237/1200/400"
              alt="Banner"
              className="object-cover w-full h-full"
            />

            {/* Avatar */}
            <div className="absolute -bottom-12 left-6">
              <img
                src={userData.profile_pic_url || defaultImage}
                alt="Profile"
                className="w-32 h-32 rounded-full border-4 border-black"
              />
            </div>
          </div>
          

          {/* Profile Info */}
          <div className="pt-12 px-6 pb-6">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-2xl font-bold">{userData.name}</h1>
                <p className="text-gray-400">@{userData.username}</p>
              </div>

              {/* Follow button and actions */}
              <div className="flex justify-end items-center gap-2 pr-6 mt-16">
                {user?.user_id !== userData.user_id && (
                  <>
                    <button
                      onClick={() => alert("Message feature coming soon!")}
                      className="p-2 rounded-full bg-gray-800 hover:bg-gray-700 shadow-md"
                      title="Message"
                    >
                      💬
                    </button>
                    <button
                      onClick={handleCopyLink}
                      className="p-2 rounded-full bg-gray-800 hover:bg-gray-700 shadow-md relative"
                      title="Share"
                    >
                      🔗
                      {copied && (
                        <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded-md shadow-lg">
                          Link copied!
                        </span>
                      )}
                    </button>

                    <button
                      onClick={() => alert("More options coming soon!")}
                      className="p-2 rounded-full bg-gray-800 hover:bg-gray-700 shadow-md"
                      title="More"
                    >
                      ⋯
                    </button>
                    <button
                      onClick={handleFollowToggle}
                      className={`px-4 py-2 rounded-full text-sm font-semibold shadow-md ${
                        isFollowing ? 'bg-gray-600 hover:bg-gray-700' : 'bg-blue-600 hover:bg-blue-700'
                      }`}
                    >
                      {isFollowing ? 'Unfollow' : 'Follow'}
                    </button>
                  </>
                )}
              </div>

            </div>

            <p className="mt-3 text-gray-300">{userData.bio || "No bio yet."}</p>

            {/* Stats */}
            <div className="flex gap-6 text-sm text-gray-400 mt-4">
              <div className="flex items-center gap-1">
                <Users size={16} />
                <span>{countIds(userData.follower_ids)} Followers</span>
              </div>
              <div className="flex items-center gap-1">
                <UserPlus size={16} />
                <span>{countIds(userData.following_ids)} Following</span>
              </div>
              <div className="flex items-center gap-1">
                <UserCircle size={16} />
                <span>
                  Joined {new Date(userData.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long' })}
                </span>
              </div>
            </div>
          </div>

          {/* Posts */}
          <div className="px-6">
            <h2 className="text-xl font-semibold border-b border-gray-700 pb-2 mb-4">
              {userData.name.split(' ')[0]}'s Posts
            </h2>
            <PostsList userId={userData.user_id} refreshPosts={refreshPosts} hideAnonymous={true} />
          </div>
        </>
      ) : (
        <p className="text-white text-center py-10">User not found</p>
      )}
    </div>
  );
};

export default ProfilePage;
