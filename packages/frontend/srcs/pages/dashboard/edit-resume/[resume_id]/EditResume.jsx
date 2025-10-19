import React, { useEffect, useState } from "react";
import ResumeForm from "../components/ResumeForm";
import PreviewPage from "../components/PreviewPage";
import { useParams } from "react-router-dom";
import { getResumeData, updateThisResume } from "@/Services/resumeAPI";
import { useDispatch, useSelector } from "react-redux";
import { addResumeData } from "@/features/resume/resumeFeatures";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export function EditResume() {
  const { resume_id } = useParams();
  const dispatch = useDispatch();
  const resumeData = useSelector((state) => state.editResume.resumeData);
  const [selectedTemplate, setSelectedTemplate] = useState("professional");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getResumeData(resume_id).then((data) => {
      dispatch(addResumeData(data.data));
    });
  }, [resume_id]);

  const handleInputChange = (e) => {
    dispatch(
      addResumeData({
        ...resumeData,
        [e.target.name]: e.target.value,
      })
    );
  };

  const onSave = async (e) => {
    e.preventDefault();
    setLoading(true);
    const data = {
      data: resumeData,
    };
    try {
      await updateThisResume(resume_id, data);
      toast("Resume Updated", "success");
    } catch (error) {
      toast(error.message, `failed`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 p-10 gap-10 bg-gradient-to-br from-primary to-secondary min-h-screen">
      <div className="glass p-8 rounded-lg">
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
        <ResumeForm
          resumeInfo={resumeData}
          handleInputChange={handleInputChange}
          onSave={onSave}
          loading={loading}
        />
      </div>
      <div className="glass p-8 rounded-lg">
        <PreviewPage selectedTemplate={selectedTemplate} />
      </div>
    </div>
  );
}

export default EditResume;
