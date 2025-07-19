import React from 'react';
import PostsList from '../posts/page';
import { UserCircle, Users, UserPlus } from 'lucide-react'; // Optional icons

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
  refreshPosts: boolean;
  onClose: () => void;
}

const ProfilePage: React.FC<ProfilePageProps> = ({ user, refreshPosts, onClose }) => {
  const countIds = (ids: string | null) => {
    if (!ids) return 0;
    return ids.split(',').filter(Boolean).length;
  };

  const defaultImage = "https://demo.patternlab.io/images/fpo_avatar.png";

  return (
    <div className="container mx-auto p+18 relative text-white">
      <button
        onClick={onClose}
        className="absolute top-4 right-4 w-6 h-6 flex items-center justify-center text-l bg-red-600 text-white rounded-full hover:bg-red-700 shadow-md"
      >
        ✕
      </button>


      {user ? (
        <div className="bg-gray-900 p-42 rounded-2xl shadow-2xl flex flex-col md:flex-row items-center md:items-start gap-8">
          <img
            src={user.profile_pic_url || defaultImage}
            alt="Profile"
            className="w-36 h-36 rounded-full object-cover border-4 border-blue-500 shadow-lg"
          />
          <div className="flex-1">
            <h1 className="text-xl font-extrabold text-white mb-1">{user.name}</h1>
            <p className="text-blue-400 text-sm">@{user.username}</p>
            <p className="text-gray-300 italic mt-2 mb-4">{user.bio || "No bio yet."}</p>

            <div className="flex gap-3 text-sm text-gray-400">
              <div className="flex items-center gap-2">
                <Users size={18} />
                <span>{countIds(user.follower_ids)} Followers</span>
              </div>
              <div className="flex items-center gap-2">
                <UserPlus size={18} />
                <span>{countIds(user.following_ids)} Following</span>
              </div>
              <div className="flex items-center gap-2">
                <UserCircle size={28} />
                <span className="text-s text-gray-400">
                  Joined: {new Date(user.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long' })}
                </span>


              </div>
            </div>
          </div>
        </div>
      ) : (
        <p className="text-white">Loading user data...</p>
      )}

      {user && (
        <div className="mt-10">
          <h2 className="text-2xl font-bold text-white mb-4 border-b border-gray-600 pb-2">{user.name.split(' ')[0]}'s Posts</h2>
          <PostsList userId={user.user_id} refreshPosts={refreshPosts} />
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
