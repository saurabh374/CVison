import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

const MainLayout = () => {
  return (
    <div className="min-h-screen bg-midnight text-slate font-sans">
      <Toaster position="top-right" />
      <header className="bg-midnight/80 backdrop-blur-sm sticky top-0 z-50">
        <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold text-white">
            CVison
          </Link>
          <div className="flex items-center space-x-6">
            <Link to="/login" className="text-slate hover:text-white transition-colors">
              Login
            </Link>
            <Link
              to="/register"
              className="px-4 py-2 bg-emerald text-midnight font-semibold rounded-lg hover:bg-emerald/90 transition-colors"
            >
              Sign Up
            </Link>
          </div>
        </nav>
      </header>
      <main className="container mx-auto px-6 py-12">
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;
