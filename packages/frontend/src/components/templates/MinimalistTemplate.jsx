import React from "react";

function MinimalistTemplate({ resumeData }) {
  return (
    <div className="p-12 bg-white font-sans">
      <div className="text-center">
        <h1 className="text-4xl font-light tracking-widest">{`${resumeData.firstName} ${resumeData.lastName}`}</h1>
        <p className="mt-2 text-lg text-muted-foreground">{resumeData.jobTitle}</p>
        <div className="flex justify-center mt-4 space-x-8 text-sm text-muted-foreground">
          <p>{resumeData.email}</p>
          <p>{resumeData.phone}</p>
          <p>{resumeData.address}</p>
        </div>
      </div>
      <div className="mt-12">
        <h2 className="text-sm font-semibold tracking-widest uppercase text-primary">
          Summary
        </h2>
        <p className="mt-4 text-md">{resumeData.summary}</p>
      </div>
      <div className="mt-12">
        <h2 className="text-sm font-semibold tracking-widest uppercase text-primary">
          Experience
        </h2>
        {resumeData.experience.map((exp, index) => (
          <div key={index} className="mt-6">
            <h3 className="text-lg font-medium">{exp.title}</h3>
            <p className="mt-1 text-md text-muted-foreground">{exp.companyName}</p>
            <p className="mt-1 text-sm text-muted-foreground">{`${exp.startDate} - ${exp.endDate}`}</p>
            <p className="mt-2 text-md">{exp.workSummary}</p>
          </div>
        ))}
      </div>
      <div className="mt-12">
        <h2 className="text-sm font-semibold tracking-widest uppercase text-primary">
          Education
        </h2>
        {resumeData.education.map((edu, index) => (
          <div key={index} className="mt-6">
            <h3 className="text-lg font-medium">{edu.universityName}</h3>
            <p className="mt-1 text-md text-muted-foreground">{`Degree in ${edu.degree}`}</p>
            <p className="mt-1 text-sm text-muted-foreground">{`${edu.startDate} - ${edu.endDate}`}</p>
          </div>
        ))}
      </div>
      <div className="mt-12">
        <h2 className="text-sm font-semibold tracking-widest uppercase text-primary">
          Skills
        </h2>
        <div className="flex flex-wrap mt-4">
          {resumeData.skills.map((skill, index) => (
            <span key={index} className="px-3 py-1 mr-2 mb-2 text-sm bg-muted text-muted-foreground rounded-full">
              {skill.name}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default MinimalistTemplate;
