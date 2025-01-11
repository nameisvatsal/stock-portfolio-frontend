import React from 'react';
import { motion } from 'framer-motion';
import { LineChartIcon as ChartLine, List, User, LogOut } from 'lucide-react';
import SpotlightCard from './ui/SpotlightCard';

interface NavbarProps {
  currentPage: string;
  setCurrentPage: (page: string) => void;
  onLogout: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ currentPage, setCurrentPage, onLogout }) => {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: <ChartLine className="w-5 h-5" /> },
    { id: 'watchlist', label: 'Watchlist', icon: <List className="w-5 h-5" /> },
    { id: 'profile', label: 'Profile', icon: <User className="w-5 h-5" /> },
  ];

  return (
    <motion.div 
      className="fixed inset-x-0 bottom-6 flex justify-center z-50"
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
    >
      <SpotlightCard
        className="px-2 py-2 rounded-2xl bg-gray-900/40 backdrop-blur-md border border-gray-800/50"
        spotlightColor="rgba(34, 197, 94, 0.2)"
      >
        <div className="flex items-center gap-1">
          {navItems.map((item) => (
            <motion.button
              key={item.id}
              onClick={() => setCurrentPage(item.id)}
              className={`
                relative px-4 py-2 rounded-xl transition-all duration-200
                ${currentPage === item.id 
                  ? 'bg-green-500/20 text-green-400' 
                  : 'hover:bg-gray-800 text-gray-400 hover:text-gray-200'
                }
              `}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="flex items-center gap-2">
                {item.icon}
                <span className="text-sm font-medium">{item.label}</span>
              </span>
              {currentPage === item.id && (
                <motion.div
                  layoutId="navbar-indicator"
                  className="absolute inset-0 rounded-xl border border-green-500/30"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
            </motion.button>
          ))}
          <div className="w-px h-6 bg-gray-800 mx-1" />
          <motion.button
            onClick={onLogout}
            className="px-4 py-2 rounded-xl text-gray-400 hover:text-red-400 hover:bg-red-500/10 transition-all duration-200"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="flex items-center gap-2">
              <LogOut className="w-5 h-5" />
              <span className="text-sm font-medium">Logout</span>
            </span>
          </motion.button>
        </div>
      </SpotlightCard>
    </motion.div>
  );
};

export default Navbar;

