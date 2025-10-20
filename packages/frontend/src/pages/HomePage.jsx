import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div className="text-center py-20">
      <motion.h1
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-5xl md:text-7xl font-bold text-white leading-tight"
      >
        Craft a resume that gets you hired.
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="mt-6 text-lg md:text-xl text-slate max-w-2xl mx-auto"
      >
        CVison helps you create a professional, modern resume in minutes. Stand out from the crowd and land your dream job.
      </motion.p>
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="mt-10"
      >
        <Link
          to="/register"
          className="px-8 py-4 bg-emerald text-midnight font-semibold rounded-lg hover:bg-emerald/90 transition-colors text-lg"
        >
          Create Your Resume Now
        </Link>
      </motion.div>
    </div>
  );
};

export default HomePage;
