// components/ProfilePage.tsx

import React from 'react';
import PostsList from './posts';

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

interface ProfilePageProps {
  user: User | null;
  refreshPosts: boolean;
  onClose: () => void;
}

const ProfilePage: React.FC<ProfilePageProps> = ({ user, refreshPosts, onClose }) => {
  const countIds = (ids: string | null) => {
    if (!ids) return 0;
    return ids.split(',').length;
  };

  return (
    <div className="container mx-auto p-4 relative">
      <button
        onClick={onClose}
        className="absolute top-4 right-4 bg-red-600 text-white px-3 py-1 rounded-full hover:bg-red-700"
      >
        ✕
      </button>
      {user ? (
        <div className="bg-gray-800 p-4 rounded-lg shadow-md">
          <h1 className="text-2xl font-bold text-white mb-2">{user.name}</h1>
          <p className="text-gray-400">Username: {user.username}</p>
          <p className="text-gray-400">Bio: {user.bio}</p>
          <p className="text-gray-400">Joined On: {new Date(user.created_at).toLocaleDateString()}</p>
          <p className="text-gray-400">Followers: {countIds(user.follower_ids)}</p>
          <p className="text-gray-400">Following: {countIds(user.following_ids)}</p>
        </div>
      ) : (
        <p className="text-white">Loading user data...</p>
      )}
      {user && <PostsList userId={user.user_id} refreshPosts={refreshPosts} />}
    </div>
  );
};

export default ProfilePage;
