import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';

const EditResume = () => {
  const [content, setContent] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (!content) return;

    setIsSaving(true);
    const debounce = setTimeout(() => {
      // API call to save the resume content will go here
      console.log('Saving content:', content);
      toast.success('Resume saved!');
      setIsSaving(false);
    }, 1500); // Auto-save after 1.5 seconds of inactivity

    return () => clearTimeout(debounce);
  }, [content]);

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Edit Resume</h1>
        {isSaving && <p className="text-gray-500">Saving...</p>}
      </div>
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="w-full h-96 p-4 border rounded"
        placeholder="Start writing your resume..."
      ></textarea>
    </div>
  );
};

export default EditResume;
