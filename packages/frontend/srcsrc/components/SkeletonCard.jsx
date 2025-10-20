import React from 'react';

const SkeletonCard = () => {
  return (
    <div className="bg-midnight/50 p-6 rounded-lg shadow-lg animate-pulse">
      <div className="h-6 bg-slate/50 rounded w-3/4"></div>
      <div className="mt-4 h-4 bg-slate/50 rounded w-1/2"></div>
      <div className="mt-6 flex justify-end space-x-4">
        <div className="h-5 bg-slate/50 rounded w-12"></div>
        <div className="h-5 bg-slate/50 rounded w-16"></div>
      </div>
    </div>
  );
};

export default SkeletonCard;
