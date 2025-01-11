import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Mail, Lock } from 'lucide-react';
import BlurText from './ui/BlurText';
import StarBorder from './ui/StarBorder';
import SpotlightCard from './ui/SpotlightCard';

const Login: React.FC<{ onLogin: () => void }> = ({ onLogin }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [isTyping, setIsTyping] = useState(false);
  const [lastTyped, setLastTyped] = useState<number>(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (Date.now() - lastTyped > 800) {
        setIsTyping(false);
      }
    }, 800);

    return () => clearTimeout(timer);
  }, [lastTyped]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setIsTyping(true);
    setLastTyped(Date.now());
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Login data:', formData);
    onLogin();
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-gray-900 flex items-center justify-center">
      <motion.div 
        className="bg-gray-900 p-8 rounded-xl shadow-2xl w-full max-w-md"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <motion.div
          animate={{
            filter: isTyping ? 'blur(4px)' : 'blur(0px)',
            transition: { duration: 0.3 }
          }}
        >
          <BlurText
            text="Welcome Back"
            delay={100}
            animateBy="words"
            direction="top"
            className="text-3xl font-extrabold mb-6 text-center text-primary"
          />
        </motion.div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <SpotlightCard className="relative" spotlightColor="rgba(34, 197, 94, 0.2)">
            <Mail className="absolute top-3 left-3 text-gray-400" />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Email Address"
              className="w-full pl-10 pr-3 py-2 rounded-md border border-gray-600 bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-primary"
              required
            />
          </SpotlightCard>
          <SpotlightCard className="relative" spotlightColor="rgba(34, 197, 94, 0.2)">
            <Lock className="absolute top-3 left-3 text-gray-400" />
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              placeholder="Password"
              className="w-full pl-10 pr-3 py-2 rounded-md border border-gray-600 bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-primary"
              required
            />
          </SpotlightCard>
          <StarBorder
            as="button"
            type="submit"
            color="rgba(34, 197, 94, 0.5)"
            speed="5s"
            className="w-full"
          >
            <motion.div 
              className="flex items-center justify-center"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Log In
              <ArrowRight className="ml-2 w-5 h-5" />
            </motion.div>
          </StarBorder>
        </form>
      </motion.div>
    </div>
  );
};

export default Login;

