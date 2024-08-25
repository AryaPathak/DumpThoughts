"use client"; // Add this line at the top

import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface User {
  user_id: number;
  name: string;
  username: string;
  email: string;
  bio: string;
  created_at: string;
  updated_at: string;
}

export default function Home() {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    // Fetch data from the API
    axios.get('http://localhost:3000/api/v1/users')
      .then(response => {
        setUsers(response.data);
      })
      .catch(error => {
        console.error("There was an error fetching the users!", error);
      });
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">Users List</h1>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded-lg shadow-md overflow-hidden">
            <thead className="bg-gray-200 text-gray-600">
              <tr>
                <th className="py-3 px-4 text-left text-sm font-semibold">User ID</th>
                <th className="py-3 px-4 text-left text-sm font-semibold">Name</th>
                <th className="py-3 px-4 text-left text-sm font-semibold">Username</th>
                <th className="py-3 px-4 text-left text-sm font-semibold">Email</th>
                <th className="py-3 px-4 text-left text-sm font-semibold">Bio</th>
                <th className="py-3 px-4 text-left text-sm font-semibold">Created At</th>
              </tr>
            </thead>
            <tbody className="text-gray-700">
              {users.map(user => (
                <tr key={user.user_id} className="border-b border-gray-200">
                  <td className="py-3 px-4">{user.user_id}</td>
                  <td className="py-3 px-4">{user.name}</td>
                  <td className="py-3 px-4">{user.username}</td>
                  <td className="py-3 px-4">{user.email}</td>
                  <td className="py-3 px-4">{user.bio}</td>
                  <td className="py-3 px-4">{new Date(user.created_at).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
