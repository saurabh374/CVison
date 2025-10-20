import React from 'react';

const MinimalistTemplate = ({ resumeData }) => {
  const { personalDetails, summary, experience, education, skills } = resumeData;

  return (
    <div className="p-8 font-serif text-gray-800">
      <header className="text-left mb-12">
        <h1 className="text-5xl font-light tracking-widest uppercase">{personalDetails.fullName}</h1>
        <p className="text-md mt-2">
          {personalDetails.email} | {personalDetails.phoneNumber} | {personalDetails.website}
        </p>
      </header>

      <section className="mb-10">
        <p className="text-lg">{summary}</p>
      </section>

      <div className="grid grid-cols-3 gap-12">
        <div className="col-span-2">
          <section className="mb-10">
            <h2 className="text-2xl font-light uppercase tracking-widest mb-6">Experience</h2>
            {experience.map((exp, index) => (
              <div key={index} className="mb-6">
                <h3 className="text-xl font-semibold">{exp.role}</h3>
                <p className="text-md text-gray-600">{exp.company} | {exp.startDate} - {exp.endDate}</p>
                <p className="mt-2">{exp.description}</p>
              </div>
            ))}
          </section>

          <section>
            <h2 className="text-2xl font-light uppercase tracking-widest mb-6">Education</h2>
            {education.map((edu, index) => (
              <div key={index} className="mb-6">
                <h3 className="text-xl font-semibold">{edu.degree}</h3>
                <p className="text-md text-gray-600">{edu.institution} | {edu.startDate} - {edu.endDate}</p>
              </div>
            ))}
          </section>
        </div>
        <div>
          <section>
            <h2 className="text-2xl font-light uppercase tracking-widest mb-6">Skills</h2>
            <ul className="space-y-2">
              {skills.map((skill, index) => (
                <li key={index}>{skill}</li>
              ))}
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
};

export default MinimalistTemplate;
