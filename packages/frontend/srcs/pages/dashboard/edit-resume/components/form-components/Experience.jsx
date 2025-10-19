import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { LoaderCircle, Trash2 } from "lucide-react";
import RichTextEditor from "@/components/custom/RichTextEditor";
import React from "react";

const formFields = {
  title: "",
  companyName: "",
  city: "",
  state: "",
  startDate: "",
  endDate: "",
  currentlyWorking: "",
  workSummary: "",
};

function Experience({ resumeInfo, handleInputChange, onSave, loading }) {
  const addExperience = () => {
    const newExperience = [...resumeInfo.experience, formFields];
    handleInputChange({ target: { name: 'experience', value: newExperience } });
  };

  const removeExperience = (index) => {
    const newExperience = resumeInfo.experience.filter((_, i) => i !== index);
    handleInputChange({ target: { name: 'experience', value: newExperience } });
  };

  const handleChange = (e, index) => {
    const { name, value } = e.target;
    const newExperience = [...resumeInfo.experience];
    newExperience[index] = { ...newExperience[index], [name]: value };
    handleInputChange({ target: { name: 'experience', value: newExperience } });
  };

  const handleRichTextEditor = (value, name, index) => {
    const newExperience = [...resumeInfo.experience];
    newExperience[index] = { ...newExperience[index], [name]: value };
    handleInputChange({ target: { name: 'experience', value: newExperience } });
  };

  return (
    <div>
      <div className="p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10 glass">
        <h2 className="font-bold text-lg">Experience</h2>
        <p>Add Your Previous Job Experience</p>
        <div>
          {resumeInfo.experience?.map((experience, index) => (
            <div key={index}>
              <div className="flex justify-between my-2">
                <h3 className="font-bold text-lg">Experience {index + 1}</h3>
                <Button
                  variant="outline"
                  className="text-red-500"
                  onClick={() => removeExperience(index)}
                >
                  <Trash2 />
                </Button>
              </div>
              <div className="grid grid-cols-2 gap-3 border p-3 my-5 rounded-lg">
                <div>
                  <label className="text-xs">Position Title</label>
                  <Input
                    type="text"
                    name="title"
                    value={experience.title}
                    onChange={(e) => handleChange(e, index)}
                  />
                </div>
                <div>
                  <label className="text-xs">Company Name</label>
                  <Input
                    type="text"
                    name="companyName"
                    value={experience.companyName}
                    onChange={(e) => handleChange(e, index)}
                  />
                </div>
                <div>
                  <label className="text-xs">City</label>
                  <Input
                    type="text"
                    name="city"
                    value={experience.city}
                    onChange={(e) => handleChange(e, index)}
                  />
                </div>
                <div>
                  <label className="text-xs">State</label>
                  <Input
                    type="text"
                    name="state"
                    value={experience.state}
                    onChange={(e) => handleChange(e, index)}
                  />
                </div>
                <div>
                  <label className="text-xs">Start Date</label>
                  <Input
                    type="date"
                    name="startDate"
                    value={experience.startDate}
                    onChange={(e) => handleChange(e, index)}
                  />
                </div>
                <div>
                  <label className="text-xs">End Date</label>
                  <Input
                    type="date"
                    name="endDate"
                    value={experience.endDate}
                    onChange={(e) => handleChange(e, index)}
                  />
                </div>
                <div className="col-span-2">
                  <RichTextEditor
                    index={index}
                    defaultValue={experience.workSummary}
                    onRichTextEditorChange={(event) =>
                      handleRichTextEditor(event, "workSummary", index)
                    }
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-between py-2">
          <Button
            onClick={addExperience}
            variant="outline"
            className="text-primary"
          >
            + Add {resumeInfo.experience?.length > 0 ? "more" : null} Experience
          </Button>
          <Button onClick={onSave} disabled={loading}>
            {loading ? <LoaderCircle className="animate-spin" /> : "Save"}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Experience;
