"use client"

import React, { useState } from 'react';
import Background from '@/components/Background';
import Landing from '@/components/home';
import Login from '@/components/Login';
import Signup from '@/components/Signup';
import Dashboard from '@/components/Dashboard';
import Navbar from '@/components/Navbar';
import Profile from '@/components/Profile';
import Watchlist from '@/components/Watchlist';
import BlobCursor from '@/components/ui/BlobCursor';
import '@/styles/BlobCursor.css';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentPage, setCurrentPage] = useState('landing');

  const handleLogin = () => {
    setIsLoggedIn(true);
    setCurrentPage('dashboard');
  };

  const handleSignup = (formData: any) => {
    console.log('Signup data:', formData);
    setIsLoggedIn(true);
    setCurrentPage('dashboard');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentPage('landing');
  };

  // Render content based on current page and login state
  const renderContent = () => {
    if (!isLoggedIn) {
      switch (currentPage) {
        case 'login':
          return <Login onLogin={handleLogin} />;
        case 'signup':
          return <Signup onSignup={handleSignup} />;
        default:
          return (
            <Landing
              onLogin={() => setCurrentPage('login')}
              onSignup={() => setCurrentPage('signup')}
            />
          );
      }
    }

    // Render authenticated pages
    return (
      <div className="min-h-screen pb-24">
        <div className="container mx-auto px-4 py-6">
          {currentPage === 'dashboard' && <Dashboard isLoggedIn={isLoggedIn} />}
          {currentPage === 'profile' && <Profile />}
          {currentPage === 'watchlist' && <Watchlist />}
        </div>
        <Navbar
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          onLogout={handleLogout}
        />
      </div>
    );
  };

  return (
    <main className="relative min-h-screen w-full overflow-hidden">
      <Background />
      <div className="relative z-10 min-h-screen">
        {renderContent()}
      </div>
    </main>
  );
}