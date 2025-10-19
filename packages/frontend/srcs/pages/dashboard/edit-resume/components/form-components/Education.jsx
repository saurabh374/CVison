import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { LoaderCircle } from "lucide-react";

const formFields = {
  universityName: "",
  degree: "",
  major: "",
  grade: "",
  gradeType: "CGPA",
  startDate: "",
  endDate: "",
  description: "",
};

function Education({ resumeInfo, handleInputChange, onSave, loading }) {
  const AddNewEducation = () => {
    const newEducation = [...resumeInfo.education, { ...formFields }];
    handleInputChange({ target: { name: 'education', value: newEducation } });
  };

  const RemoveEducation = (index) => {
    const newEducation = resumeInfo.education.filter((_, i) => i !== index);
    handleInputChange({ target: { name: 'education', value: newEducation } });
  };

  const handleChange = (e, index) => {
    const { name, value } = e.target;
    const newEducation = [...resumeInfo.education];
    newEducation[index] = { ...newEducation[index], [name]: value };
    handleInputChange({ target: { name: 'education', value: newEducation } });
  };

  return (
    <div className="p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10 glass">
      <h2 className="font-bold text-lg">Education</h2>
      <p>Add Your educational details</p>

      <div>
        {resumeInfo.education.map((item, index) => (
          <div key={index}>
            <div className="grid grid-cols-2 gap-3 border p-3 my-5 rounded-lg">
              <div className="col-span-2">
                <label>University Name</label>
                <Input
                  name="universityName"
                  onChange={(e) => handleChange(e, index)}
                  value={item.universityName}
                />
              </div>
              <div>
                <label>Degree</label>
                <Input
                  name="degree"
                  onChange={(e) => handleChange(e, index)}
                  value={item.degree}
                />
              </div>
              <div>
                <label>Major</label>
                <Input
                  name="major"
                  onChange={(e) => handleChange(e, index)}
                  value={item.major}
                />
              </div>
              <div>
                <label>Start Date</label>
                <Input
                  type="date"
                  name="startDate"
                  onChange={(e) => handleChange(e, index)}
                  value={item.startDate}
                />
              </div>
              <div>
                <label>End Date</label>
                <Input
                  type="date"
                  name="endDate"
                  onChange={(e) => handleChange(e, index)}
                  value={item.endDate}
                />
              </div>
              <div className="col-span-2">
                <label>Grade</label>
                <div className="flex justify-center items-center gap-4">
                  <select
                    name="gradeType"
                    className="py-2 px-4 rounded-md"
                    onChange={(e) => handleChange(e, index)}
                    value={item.gradeType}
                  >
                    <option value="CGPA">CGPA</option>
                    <option value="GPA">GPA</option>
                    <option value="Percentage">Percentage</option>
                  </select>
                  <Input
                    type="text"
                    name="grade"
                    onChange={(e) => handleChange(e, index)}
                    value={item.grade}
                  />
                </div>
              </div>
              <div className="col-span-2">
                <label>Description</label>
                <Textarea
                  name="description"
                  onChange={(e) => handleChange(e, index)}
                  value={item.description}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-between">
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={AddNewEducation}
            className="text-primary"
          >
            {" "}
            + Add More Education
          </Button>
          <Button
            variant="outline"
            onClick={() => RemoveEducation(resumeInfo.education.length - 1)}
            className="text-primary"
          >
            {" "}
            - Remove
          </Button>
        </div>
        <Button disabled={loading} onClick={onSave}>
          {loading ? <LoaderCircle className="animate-spin" /> : "Save"}
        </Button>
      </div>
    </div>
  );
}

export default Education;
