import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ResumeCard from '../components/ResumeCard';
import SkeletonCard from '../components/SkeletonCard';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const [resumes, setResumes] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    const fetchResumes = async () => {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        };
        const { data } = await axios.get('/api/resumes', config);
        setResumes(data);
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch resumes', error);
        setLoading(false);
      }
    };

    if (user) {
      fetchResumes();
    }
  }, [user]);

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold text-white">Your Resumes</h1>
        <Link
          to="/resume/new"
          className="px-6 py-3 bg-emerald text-midnight font-semibold rounded-lg hover:bg-emerald/90 transition-colors"
        >
          Create New Resume
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {loading
          ? Array.from({ length: 3 }).map((_, index) => <SkeletonCard key={index} />)
          : resumes.map((resume) => <ResumeCard key={resume._id} resume={resume} />)}
      </div>
    </div>
  );
};

export default Dashboard;
