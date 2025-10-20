import React from 'react';

const CreativeTemplate = ({ resumeData }) => {
  const { personalDetails, summary, experience, education, skills } = resumeData;

  return (
    <div className="p-8 bg-gray-100 text-gray-800">
      <div className="grid grid-cols-3 gap-8">
        <div className="col-span-1 bg-gray-800 text-white p-6 rounded-lg">
          <div className="text-center">
            {/* Placeholder for profile picture */}
            <div className="w-32 h-32 bg-gray-400 rounded-full mx-auto mb-6"></div>
            <h1 className="text-3xl font-bold">{personalDetails.fullName}</h1>
          </div>
          <div className="mt-8">
            <h2 className="text-xl font-semibold uppercase tracking-widest mb-4">Contact</h2>
            <p>{personalDetails.email}</p>
            <p>{personalDetails.phoneNumber}</p>
            <p>{personalDetails.website}</p>
          </div>
          <div className="mt-8">
            <h2 className="text-xl font-semibold uppercase tracking-widest mb-4">Skills</h2>
            <ul className="space-y-2">
              {skills.map((skill, index) => (
                <li key={index}>{skill}</li>
              ))}
            </ul>
          </div>
        </div>
        <div className="col-span-2">
          <section className="mb-8">
            <h2 className="text-3xl font-bold text-gray-800 border-b-4 border-gray-800 pb-2 mb-4">Summary</h2>
            <p className="text-lg">{summary}</p>
          </section>

          <section className="mb-8">
            <h2 className="text-3xl font-bold text-gray-800 border-b-4 border-gray-800 pb-2 mb-4">Experience</h2>
            {experience.map((exp, index) => (
              <div key={index} className="mb-6">
                <h3 className="text-2xl font-semibold">{exp.role}</h3>
                <p className="text-lg text-gray-600">{exp.company} | {exp.startDate} - {exp.endDate}</p>
                <p className="mt-2">{exp.description}</p>
              </div>
            ))}
          </section>

          <section>
            <h2 className="text-3xl font-bold text-gray-800 border-b-4 border-gray-800 pb-2 mb-4">Education</h2>
            {education.map((edu, index) => (
              <div key={index} className="mb-6">
                <h3 className="text-2xl font-semibold">{edu.degree}</h3>
                <p className="text-lg text-gray-600">{edu.institution} | {edu.startDate} - {edu.endDate}</p>
              </div>
            ))}
          </section>
        </div>
      </div>
    </div>
  );
};

export default CreativeTemplate;
