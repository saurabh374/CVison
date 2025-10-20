import React from 'react';

const SkeletonCard = () => {
  return (
    <div className="bg-white shadow rounded p-4 animate-pulse">
      <div className="h-6 bg-gray-200 rounded w-3/4"></div>
      <div className="mt-4 h-4 bg-gray-200 rounded w-1/2"></div>
      <div className="mt-6 flex justify-end">
        <div className="h-5 bg-gray-200 rounded w-12"></div>
        <div className="ml-4 h-5 bg-gray-200 rounded w-16"></div>
      </div>
    </div>
  );
};

export default SkeletonCard;
