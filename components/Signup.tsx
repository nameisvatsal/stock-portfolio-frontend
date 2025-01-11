import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, User, Mail, Lock } from 'lucide-react';
import BlurText from './ui/BlurText';
import StarBorder from './ui/StarBorder';
import SpotlightCard from './ui/SpotlightCard';

const Signup: React.FC<{ onSignup: (formData: any) => void }> = ({ onSignup }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Signup data:', formData);
    onSignup(formData);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-gray-900 flex items-center justify-center">
      <motion.div 
        className="bg-gray-900 p-8 rounded-xl shadow-2xl w-full max-w-md"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <BlurText
          text="Create Your Account"
          delay={100}
          animateBy="words"
          direction="top"
          className="text-3xl font-extrabold mb-6 text-center text-primary"
        />
        <form onSubmit={handleSubmit} className="space-y-4">
          <SpotlightCard className="relative" spotlightColor="rgba(34, 197, 94, 0.2)">
            <User className="absolute top-3 left-3 text-gray-400" />
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Full Name"
              className="w-full pl-10 pr-3 py-2 rounded-md border border-gray-600 bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-primary"
              required
            />
          </SpotlightCard>
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
          <SpotlightCard className="relative" spotlightColor="rgba(34, 197, 94, 0.2)">
            <Lock className="absolute top-3 left-3 text-gray-400" />
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              placeholder="Confirm Password"
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
            <div className="flex items-center justify-center">
              Sign Up
              <ArrowRight className="ml-2 w-5 h-5" />
            </div>
          </StarBorder>
        </form>
      </motion.div>
    </div>
  );
};

export default Signup;

