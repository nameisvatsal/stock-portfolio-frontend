import React from 'react';
import { motion } from 'framer-motion';
import { UserIcon, CalendarIcon, StarIcon, ClockIcon } from 'lucide-react';

const Profile: React.FC = () => {
  const userInfo = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    memberSince: 'January 1, 2023',
    accountType: 'Premium',
    lastLogin: 'Today at 10:30 AM',
    profilePicture: 'https://via.placeholder.com/150',
  };

  const stats = [
    { label: 'Total Trades', value: 150 },
    { label: 'Successful Trades', value: 120 },
    { label: 'Win Rate', value: '80%' },
    { label: 'Average Return', value: '12.5%' },
  ];

  return (
    <div className="bg-gray-900/40 backdrop-blur-md shadow-lg rounded-lg p-6">
      <h2 className="text-2xl font-semibold mb-6 text-white">User Profile</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1">
          <motion.div
            className="flex flex-col items-center p-4 bg-gray-800/60 backdrop-blur-sm rounded-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <img
              src={userInfo.profilePicture}
              alt="Profile"
              className="rounded-full w-32 h-32 mb-4"
            />
            <h3 className="text-xl font-semibold text-white">{userInfo.name}</h3>
            <p className="text-gray-300">{userInfo.email}</p>
          </motion.div>
        </div>
        <div className="md:col-span-2">
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            <div className="flex items-center p-4 bg-gray-800 rounded-lg">
              <CalendarIcon className="w-6 h-6 mr-2 text-green-500" />
              <div>
                <h4 className="text-sm font-semibold text-white">Member Since</h4>
                <p className="text-gray-300">{userInfo.memberSince}</p>
              </div>
            </div>
            <div className="flex items-center p-4 bg-gray-800 rounded-lg">
              <StarIcon className="w-6 h-6 mr-2 text-green-500" />
              <div>
                <h4 className="text-sm font-semibold text-white">Account Type</h4>
                <p className="text-gray-300">{userInfo.accountType}</p>
              </div>
            </div>
            <div className="flex items-center p-4 bg-gray-800 rounded-lg">
              <ClockIcon className="w-6 h-6 mr-2 text-green-500" />
              <div>
                <h4 className="text-sm font-semibold text-white">Last Login</h4>
                <p className="text-gray-300">{userInfo.lastLogin}</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
      <motion.div
        className="mt-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.2 }}
      >
        <h3 className="text-xl font-semibold mb-4 text-white">Trading Statistics</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((stat, index) => (
            <div key={index} className="p-4 bg-gray-800 rounded-lg text-center">
              <h4 className="text-sm font-semibold mb-2 text-white">{stat.label}</h4>
              <p className="text-2xl font-bold text-green-500">{stat.value}</p>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default Profile;

