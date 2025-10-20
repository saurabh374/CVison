import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import ProfessionalTemplate from '../templates/ProfessionalTemplate';
import MinimalistTemplate from '../templates/MinimalistTemplate';
import CreativeTemplate from '../templates/CreativeTemplate';

const templates = {
  professional: ProfessionalTemplate,
  minimalist: MinimalistTemplate,
  creative: CreativeTemplate,
};

const EditResume = () => {
  const [resumeData, setResumeData] = useState({
    title: 'Untitled Resume',
    template: 'professional',
    personalDetails: {
      fullName: 'John Doe',
      email: 'john.doe@example.com',
      phoneNumber: '123-456-7890',
      website: 'johndoe.com',
    },
    summary: 'A highly motivated and experienced software engineer with a passion for creating innovative solutions.',
    experience: [],
    education: [],
    skills: [],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    const [section, field] = name.split('.');

    if (field) {
      setResumeData((prev) => ({
        ...prev,
        [section]: {
          ...prev[section],
          [field]: value,
        },
      }));
    } else {
      setResumeData((prev) => ({ ...prev, [name]: value }));
    }
  };

  useEffect(() => {
    const debounce = setTimeout(() => {
      console.log('Saving content:', resumeData);
      toast.success('Resume saved!');
    }, 1500);

    return () => clearTimeout(debounce);
  }, [resumeData]);

  const SelectedTemplate = templates[resumeData.template];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
      {/* Editor */}
      <div className="bg-midnight/50 p-8 rounded-lg">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-white">Edit Your Resume</h2>
          <select
            name="template"
            value={resumeData.template}
            onChange={handleChange}
            className="px-4 py-2 bg-midnight border border-slate/50 rounded-lg text-white focus:ring-emerald focus:border-emerald"
          >
            <option value="professional">Professional</option>
            <option value="minimalist">Minimalist</option>
            <option value="creative">Creative</option>
          </select>
        </div>
        <form className="space-y-8">
          {/* Personal Details */}
          <section>
            <h3 className="text-2xl font-semibold text-white mb-4">Personal Details</h3>
            <div className="space-y-4">
              <input type="text" name="personalDetails.fullName" value={resumeData.personalDetails.fullName} onChange={handleChange} placeholder="Full Name" className="w-full px-4 py-3 bg-midnight border border-slate/50 rounded-lg text-white focus:ring-emerald focus:border-emerald" />
              <input type="email" name="personalDetails.email" value={resumeData.personalDetails.email} onChange={handleChange} placeholder="Email" className="w-full px-4 py-3 bg-midnight border border-slate/50 rounded-lg text-white focus:ring-emerald focus:border-emerald" />
              <input type="tel" name="personalDetails.phoneNumber" value={resumeData.personalDetails.phoneNumber} onChange={handleChange} placeholder="Phone Number" className="w-full px-4 py-3 bg-midnight border border-slate/50 rounded-lg text-white focus:ring-emerald focus:border-emerald" />
              <input type="url" name="personalDetails.website" value={resumeData.personalDetails.website} onChange={handleChange} placeholder="Website/Portfolio" className="w-full px-4 py-3 bg-midnight border border-slate/50 rounded-lg text-white focus:ring-emerald focus:border-emerald" />
            </div>
          </section>

          {/* Summary */}
          <section>
            <h3 className="text-2xl font-semibold text-white mb-4">Summary</h3>
            <textarea name="summary" value={resumeData.summary} onChange={handleChange} placeholder="A brief summary of your career" className="w-full px-4 py-3 bg-midnight border border-slate/50 rounded-lg text-white focus:ring-emerald focus:border-emerald h-32" />
          </section>
        </form>
      </div>

      {/* Preview */}
      <div className="bg-white rounded-lg overflow-auto">
        <SelectedTemplate resumeData={resumeData} />
      </div>
    </div>
  );
};

export default EditResume;
