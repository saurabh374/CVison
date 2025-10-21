import React, { useEffect, useState, useCallback } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2, Trash2 } from "lucide-react";
import { toast } from "sonner";
import RichTextEditor from "@/components/custom/RichTextEditor";
import { addResumeData } from "@/features/resume/resumeFeatures";
import { updateThisResume } from "@/Services/resumeAPI";

const emptyExperience = {
  title: "",
  companyName: "",
  city: "",
  state: "",
  startDate: "",
  endDate: "",
  workSummary: "",
};

export default function Experience({ resumeInfo, enabledNext, enabledPrev }) {
  const { resume_id } = useParams();
  const dispatch = useDispatch();

  const [experienceList, setExperienceList] = useState(resumeInfo?.experience || []);
  const [loading, setLoading] = useState(false);

  // 🔄 Keep Redux state updated
  useEffect(() => {
    dispatch(addResumeData({ ...resumeInfo, experience: experienceList }));
  }, [experienceList]);

  const handleChange = useCallback((e, index) => {
    enabledNext(false);
    enabledPrev(false);

    const { name, value } = e.target;
    const updatedList = [...experienceList];
    updatedList[index] = { ...updatedList[index], [name]: value };
    setExperienceList(updatedList);
  }, [experienceList]);

  const handleRichChange = useCallback((value, field, index) => {
    const updatedList = [...experienceList];
    updatedList[index] = { ...updatedList[index], [field]: value };
    setExperienceList(updatedList);
  }, [experienceList]);

  const addExperience = () => {
    setExperienceList((prev) => [...prev, { ...emptyExperience }]);
  };

  const removeExperience = (index) => {
    setExperienceList((prev) => prev.filter((_, i) => i !== index));
  };

  const onSave = async () => {
    if (!resume_id) return toast.error("Invalid resume ID");

    try {
      setLoading(true);
      await updateThisResume(resume_id, { data: { experience: experienceList } });
      toast.success("Experience updated successfully!");
      enabledNext(true);
      enabledPrev(true);
    } catch (err) {
      console.error("Error updating experience:", err);
      toast.error(err?.message || "Failed to update experience");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-8 p-6 shadow-sm rounded-xl border border-gray-100 bg-white">
      <h2 className="font-semibold text-lg text-gray-900 mb-1">Experience</h2>
      <p className="text-sm text-gray-500 mb-4">Add your past job experience.</p>

      <div className="space-y-6">
        {experienceList.map((exp, index) => (
          <div
            key={index}
            className="border rounded-lg p-4 relative bg-gray-50 hover:shadow-md transition-all"
          >
            <div className="flex justify-between items-center mb-3">
              <h3 className="font-semibold text-gray-800">
                Experience {index + 1}
              </h3>
              <Button
                variant="outline"
                size="icon"
                onClick={() => removeExperience(index)}
                aria-label="Remove experience"
                className="text-red-500 hover:bg-red-50"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <InputField
                label="Position Title"
                name="title"
                value={exp.title}
                onChange={(e) => handleChange(e, index)}
              />
              <InputField
                label="Company Name"
                name="companyName"
                value={exp.companyName}
                onChange={(e) => handleChange(e, index)}
              />
              <InputField
                label="City"
                name="city"
                value={exp.city}
                onChange={(e) => handleChange(e, index)}
              />
              <InputField
                label="State"
                name="state"
                value={exp.state}
                onChange={(e) => handleChange(e, index)}
              />
              <InputField
                label="Start Date"
                name="startDate"
                type="date"
                value={exp.startDate}
                onChange={(e) => handleChange(e, index)}
              />
              <InputField
                label="End Date"
                name="endDate"
                type="date"
                value={exp.endDate}
                onChange={(e) => handleChange(e, index)}
              />
            </div>

            <div className="mt-4">
              <label className="text-sm font-medium text-gray-700 mb-2 block">
                Work Summary
              </label>
              <RichTextEditor
                index={index}
                defaultValue={exp.workSummary}
                onRichTextEditorChange={(value) =>
                  handleRichChange(value, "workSummary", index)
                }
                resumeInfo={resumeInfo}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Actions */}
      <div className="flex justify-between mt-6">
        <Button variant="outline" onClick={addExperience} className="text-indigo-600">
          + Add {experienceList.length > 0 ? "More" : ""} Experience
        </Button>
        <Button onClick={onSave} disabled={loading} className="gap-2">
          {loading ? <Loader2 className="animate-spin w-4 h-4" /> : "Save"}
        </Button>
      </div>
    </div>
  );
}

/** Small reusable field for cleaner markup */
function InputField({ label, name, value, onChange, type = "text" }) {
  return (
    <div className="flex flex-col space-y-1">
      <label htmlFor={name} className="text-xs font-medium text-gray-600">
        {label}
      </label>
      <Input
        id={name}
        name={name}
        type={type}
        value={value || ""}
        onChange={onChange}
        className="focus:ring-2 focus:ring-indigo-300 text-sm"
      />
    </div>
  );
}
