import React, { useEffect, useState } from "react";
import ResumeForm from "../components/ResumeForm";
import PreviewPage from "../components/PreviewPage";
import { useParams } from "react-router-dom";
import { getResumeData } from "@/Services/resumeAPI";
import { useDispatch } from "react-redux";
import { addResumeData } from "@/features/resume/resumeFeatures";
import { Button } from "@/components/ui/button";

export function EditResume() {
  const { resume_id } = useParams();
  const dispatch = useDispatch();
  const [selectedTemplate, setSelectedTemplate] = useState("professional");

  useEffect(() => {
    getResumeData(resume_id).then((data) => {
      dispatch(addResumeData(data.data));
    });
  }, [resume_id]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 p-10 gap-10">
      <div>
        <div className="flex justify-around mb-4">
          <Button
            variant={selectedTemplate === "professional" ? "default" : "outline"}
            onClick={() => setSelectedTemplate("professional")}
          >
            Professional
          </Button>
          <Button
            variant={selectedTemplate === "minimalist" ? "default" : "outline"}
            onClick={() => setSelectedTemplate("minimalist")}
          >
            Minimalist
          </Button>
          <Button
            variant={selectedTemplate === "creative" ? "default" : "outline"}
            onClick={() => setSelectedTemplate("creative")}
          >
            Creative
          </Button>
        </div>
        <ResumeForm />
      </div>
      <PreviewPage selectedTemplate={selectedTemplate} />
    </div>
  );
}

export default EditResume;
