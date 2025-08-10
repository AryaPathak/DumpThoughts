"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import ProfilePage from "../profile/page";
import axios from "axios";

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

export default function UserProfileRoute() {
  const { username } = useParams();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        // Fetch all users and find one by username
        const res = await axios.get(`http://localhost:3000/api/v1/users`);
        const foundUser = res.data.find(
          (u: User) => u.username.toLowerCase() === username.toString().toLowerCase()
        );
        setUser(foundUser || null);
      } catch (err) {
        console.error("Failed to fetch user by username:", err);
      } finally {
        setLoading(false);
      }
    };

    if (username) {
      fetchUser();
    }
  }, [username]);

  if (loading) {
    return <p className="text-white text-center py-10">Loading...</p>;
  }

  if (!user) {
    return <p className="text-white text-center py-10">User not found</p>;
  }

  return (
    <ProfilePage
      userId={user.user_id}
      refreshPosts={true}
      onClose={() => {}}
      user={null}
    />
  );
}
