import React, { useState, useEffect } from 'react';
import ResumeCard from '../components/ResumeCard';
import SkeletonCard from '../components/SkeletonCard';

const dummyResumes = [
  {
    _id: '1',
    title: 'Software Engineer Resume',
    updatedAt: '2025-10-19',
  },
  {
    _id: '2',
    title: 'Product Manager Resume',
    updatedAt: '2025-10-18',
  },
];

const Dashboard = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000); // Simulate a 2-second loading time
    return () => clearTimeout(timer);
  }, []);

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Your Dashboard</h1>
        <button className="bg-blue-500 text-white px-4 py-2 rounded">
          Create New Resume
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {loading
          ? Array.from({ length: 3 }).map((_, index) => <SkeletonCard key={index} />)
          : dummyResumes.map((resume) => <ResumeCard key={resume._id} resume={resume} />)}
      </div>
    </div>
  );
};

export default Dashboard;
