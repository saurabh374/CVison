import React, { useState } from 'react';
import Modal from './Modal';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

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
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        whileHover={{ y: -5 }}
        className="bg-midnight/50 p-6 rounded-lg shadow-lg cursor-pointer"
      >
        <h3 className="text-xl font-bold text-white">{resume.title}</h3>
        <p className="mt-2 text-slate">
          Last updated: {new Date(resume.updatedAt).toLocaleDateString()}
        </p>
        <div className="mt-6 flex justify-end space-x-4">
          <Link
            to={`/resume/${resume._id}/edit`}
            className="text-emerald hover:text-emerald/90 transition-colors"
          >
            Edit
          </Link>
          <button
            onClick={() => setIsModalOpen(true)}
            className="text-red-500 hover:text-red-400 transition-colors"
          >
            Delete
          </button>
        </div>
      </motion.div>
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
