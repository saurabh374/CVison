import React from "react";

function ProfessionalTemplate({ resumeData }) {
  return (
    <div className="p-8 bg-white">
      <h1 className="text-3xl font-bold">{`${resumeData.firstName} ${resumeData.lastName}`}</h1>
      <p className="text-lg">{resumeData.jobTitle}</p>
      <div className="flex justify-between mt-4">
        <p>{resumeData.email}</p>
        <p>{resumeData.phone}</p>
        <p>{resumeData.address}</p>
      </div>
      <div className="mt-8">
        <h2 className="text-xl font-bold border-b-2 border-primary pb-2">
          Summary
        </h2>
        <p className="mt-4">{resumeData.summary}</p>
      </div>
      <div className="mt-8">
        <h2 className="text-xl font-bold border-b-2 border-primary pb-2">
          Experience
        </h2>
        {resumeData.experience.map((exp, index) => (
          <div key={index} className="mt-4">
            <h3 className="font-bold">{exp.title}</h3>
            <p className="italic">{exp.companyName}</p>
            <p>{`${exp.startDate} - ${exp.endDate}`}</p>
            <p>{exp.workSummary}</p>
          </div>
        ))}
      </div>
      <div className="mt-8">
        <h2 className="text-xl font-bold border-b-2 border-primary pb-2">
          Education
        </h2>
        {resumeData.education.map((edu, index) => (
          <div key={index} className="mt-4">
            <h3 className="font-bold">{edu.universityName}</h3>
            <p>{`Degree in ${edu.degree}`}</p>
            <p>{`${edu.startDate} - ${edu.endDate}`}</p>
          </div>
        ))}
      </div>
      <div className="mt-8">
        <h2 className="text-xl font-bold border-b-2 border-primary pb-2">
          Skills
        </h2>
        <ul className="list-disc list-inside mt-4">
          {resumeData.skills.map((skill, index) => (
            <li key={index}>{skill.name}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default ProfessionalTemplate;
