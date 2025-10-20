import React from 'react';

const ProfessionalTemplate = ({ resumeData }) => {
  const { personalDetails, summary, experience, education, skills } = resumeData;

  return (
    <div className="p-8 text-black">
      <header className="text-center mb-8">
        <h1 className="text-4xl font-bold">{personalDetails.fullName}</h1>
        <p className="text-lg">
          {personalDetails.email} | {personalDetails.phoneNumber} | {personalDetails.website}
        </p>
      </header>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold border-b-2 border-black pb-2 mb-4">Summary</h2>
        <p>{summary}</p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold border-b-2 border-black pb-2 mb-4">Experience</h2>
        {experience.map((exp, index) => (
          <div key={index} className="mb-4">
            <h3 className="text-xl font-bold">{exp.role}</h3>
            <p className="text-lg">{exp.company} | {exp.startDate} - {exp.endDate}</p>
            <p>{exp.description}</p>
          </div>
        ))}
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold border-b-2 border-black pb-2 mb-4">Education</h2>
        {education.map((edu, index) => (
          <div key={index} className="mb-4">
            <h3 className="text-xl font-bold">{edu.degree}</h3>
            <p className="text-lg">{edu.institution} | {edu.startDate} - {edu.endDate}</p>
          </div>
        ))}
      </section>

      <section>
        <h2 className="text-2xl font-semibold border-b-2 border-black pb-2 mb-4">Skills</h2>
        <ul className="list-disc list-inside">
          {skills.map((skill, index) => (
            <li key={index}>{skill}</li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default ProfessionalTemplate;
