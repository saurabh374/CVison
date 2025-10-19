import React from "react";
import { useSelector } from "react-redux";
import ProfessionalTemplate from "@/components/templates/ProfessionalTemplate";
import MinimalistTemplate from "@/components/templates/MinimalistTemplate";
import CreativeTemplate from "@/components/templates/CreativeTemplate";

function PreviewPage({ selectedTemplate }) {
  const resumeData = useSelector((state) => state.editResume.resumeData);

  const renderTemplate = () => {
    if (!resumeData) {
      return null;
    }
    switch (selectedTemplate) {
      case "professional":
        return <ProfessionalTemplate resumeData={resumeData} />;
      case "minimalist":
        return <MinimalistTemplate resumeData={resumeData} />;
      case "creative":
        return <CreativeTemplate resumeData={resumeData} />;
      default:
        return <ProfessionalTemplate resumeData={resumeData} />;
    }
  };

  return (
    <div className="shadow-lg h-full p-4 border">
      {renderTemplate()}
    </div>
  );
}

export default PreviewPage;
