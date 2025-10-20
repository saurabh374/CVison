import React, { useState } from 'react';
import Modal from './Modal';
import toast from 'react-hot-toast';

const ResumeCard = ({ resume }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDelete = () => {
    // API call to delete the resume will go here
    console.log(`Deleting resume ${resume._id}`);
    toast.success('Resume deleted successfully!');
    setIsModalOpen(false);
  };

  return (
    <>
      <div className="bg-white shadow rounded p-4">
        <h3 className="text-xl font-bold">{resume.title}</h3>
        <p className="mt-2 text-gray-600">Last updated: {resume.updatedAt}</p>
        <div className="mt-4 flex justify-end">
          <button className="text-blue-500 hover:underline">Edit</button>
          <button
            onClick={() => setIsModalOpen(true)}
            className="ml-4 text-red-500 hover:underline"
          >
            Delete
          </button>
        </div>
      </div>
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleDelete}
        title="Confirm Deletion"
      >
        <p>Are you sure you want to delete this resume? This action cannot be undone.</p>
      </Modal>
    </>
  );
};

export default ResumeCard;
