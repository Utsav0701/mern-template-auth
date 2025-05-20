// src/pages/HomePage.jsx
import React, { useEffect, useState } from 'react';
import axios from '../utils/axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function HomePage() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data } = await axios.get('/auth/me'); // Protected route to get user info
        setUser(data.user);
      } catch (err) {
        console.error('Error fetching user:', err); // <-- Use the error
        navigate('/auth'); // Redirect to login if not authenticated
      }
    };

    fetchUser();
  }, [navigate]);

  const handleLogout = async () => {
    try {
      await axios.post('/auth/logout'); // Clear the cookie on server
      toast.success('Logged out successfully');
      navigate('/');
    } catch (err) {
      console.error('Error in Logout:', err); // <-- Use the error
      toast.error('Logout failed');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-md rounded-2xl p-8 w-full max-w-md text-center">
        <h1 className="text-3xl font-bold mb-2">
          Welcome, <span className="text-blue-600">{user?.name || 'User'}</span> 👋
        </h1>
        <p className="text-gray-600 mb-6">You're now logged in to your dashboard.</p>
        <button
          onClick={handleLogout}
          className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-6 rounded transition duration-300"
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default HomePage;
