import React, { useState } from 'react';
import { motion } from 'framer-motion';
import 'chart.js/auto';
import Navbar from './components/Navbar';
import Profile from './components/Profile';
import Dashboard from './components/Dashboard';
import Watchlist from './components/Watchlist';
import Landing from './components/home';
import Signup from './components/Signup';
import Login from './components/Login';
import BlobCursor from './components/ui/BlobCursor';
import Stocks from './components/Stocks'; // Import the Stocks component
import './styles/BlobCursor.css';

export default function App() {
  const [currentPage, setCurrentPage] = useState('landing');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
    setCurrentPage('dashboard');
  };

  const handleSignup = () => {
    setIsLoggedIn(true);
    setCurrentPage('dashboard');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentPage('landing');
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'landing':
        return <Landing onLogin={() => setCurrentPage('login')} onSignup={() => setCurrentPage('signup')} />;
      case 'login':
        return <Login onLogin={handleLogin} />;
      case 'signup':
        return <Signup onSignup={handleSignup} />;
      case 'dashboard':
        return <Dashboard isLoggedIn={isLoggedIn} />;
      case 'profile':
        return <Profile />;
      case 'watchlist':
        return <Watchlist />;
      case 'stocks': // Add case for stock portfolio
        return <Stocks />; // Render Stocks component
      default:
        return <Landing onLogin={() => setCurrentPage('login')} onSignup={() => setCurrentPage('signup')} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-gray-900 font-sans text-white">
      <BlobCursor blobType="circle" fillColor="rgba(34, 197, 94, 0.5)" />
      {isLoggedIn && <Navbar currentPage={currentPage} setCurrentPage={setCurrentPage} onLogout={handleLogout} />}
      <main className="container mx-auto mt-8 px-4">
        <motion.div
          key={currentPage}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          {renderPage()}
        </motion.div>
      </main>
    </div>
  );
}
