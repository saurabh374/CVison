import React from 'react';
import { Outlet } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

const MainLayout = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <Toaster position="top-right" />
      <header className="bg-white shadow">
        <nav className="container mx-auto px-6 py-3">
          <div className="flex justify-between items-center">
            <a href="/" className="text-xl font-semibold text-gray-800">CVision</a>
            <div>
              <a href="/login" className="px-3 py-2 rounded text-gray-800 hover:bg-gray-200">Login</a>
              <a href="/register" className="ml-4 px-3 py-2 rounded text-white bg-blue-500 hover:bg-blue-600">Register</a>
            </div>
          </div>
        </nav>
      </header>
      <main className="container mx-auto px-6 py-8">
        <Outlet />
      </main>
      <footer className="bg-white">
        <div className="container mx-auto px-6 py-4">
          <p className="text-center text-gray-600">© 2025 CVision. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default MainLayout;
