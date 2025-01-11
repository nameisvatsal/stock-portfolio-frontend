import React from 'react';
import { motion } from 'framer-motion';
import { LineChartIcon as ChartLine, Shield, Zap, ArrowRight } from 'lucide-react';
import StarBorder from './ui/StarBorder';
import BlurText from './ui/BlurText';

const Landing: React.FC<{ onLogin: () => void; onSignup: () => void }> = ({ onLogin, onSignup }) => {
  const features = [
    {
      icon: <ChartLine className="w-8 h-8 text-primary" />,
      title: 'Portfolio Tracking',
      description: 'Monitor your investments in real-time with advanced portfolio tracking tools'
    },
    {
      icon: <Shield className="w-8 h-8 text-primary" />,
      title: 'Secure Platform',
      description: 'Your investment data is protected with enterprise-grade security'
    },
    {
      icon: <Zap className="w-8 h-8 text-primary" />,
      title: 'Real-time Updates',
      description: 'Get instant updates on your watchlist stocks and portfolio performance'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-gray-900">
      <div className="container mx-auto px-6 py-16">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <BlurText
            text="Smart Stock Portfolio Management"
            delay={100}
            animateBy="words"
            direction="top"
            className="text-5xl font-extrabold mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent"
          />
          <BlurText
            text="Track, analyze, and optimize your investments in one powerful platform"
            delay={50}
            animateBy="words"
            direction="bottom"
            className="text-xl text-gray-200 mb-8"
          />
          <div className="flex justify-center space-x-4">
            <StarBorder
              as="button"
              onClick={onLogin}
              color="rgba(34, 197, 94, 0.5)"
              speed="5s"
            >
              <div className="flex items-center">
                Login
                <ArrowRight className="ml-2 w-5 h-5" />
              </div>
            </StarBorder>
            <StarBorder
              as="button"
              onClick={onSignup}
              color="rgba(34, 197, 94, 0.5)"
              speed="5s"
            >
              <div className="flex items-center">
                Sign Up
                <ArrowRight className="ml-2 w-5 h-5" />
              </div>
            </StarBorder>
          </div>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="bg-gray-900 p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
            >
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2 text-white">{feature.title}</h3>
              <p className="text-gray-200">{feature.description}</p>
            </motion.div>
          ))}
        </div>

        <motion.div 
          className="text-center bg-gray-900 p-8 rounded-2xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <h2 className="text-3xl font-extrabold mb-4 text-white">Ready to Start Investing Smarter?</h2>
          <p className="text-gray-200 mb-6">
            Join thousands of investors who are already using our platform to manage their portfolios
          </p>
          <StarBorder
            as="button"
            onClick={onSignup}
            color="rgba(34, 197, 94, 0.5)"
            speed="5s"
          >
            Create Free Account
          </StarBorder>
        </motion.div>
      </div>
    </div>
  );
};

export default Landing;

