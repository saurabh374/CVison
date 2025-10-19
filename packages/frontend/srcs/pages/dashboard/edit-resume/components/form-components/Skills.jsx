import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";
import { LoaderCircle } from "lucide-react";

function Skills({ resumeInfo, handleInputChange, onSave, loading }) {
  const AddNewSkills = () => {
    const newSkills = [...resumeInfo.skills, { name: "", rating: 0 }];
    handleInputChange({ target: { name: 'skills', value: newSkills } });
  };

  const RemoveSkills = (index) => {
    const newSkills = resumeInfo.skills.filter((_, i) => i !== index);
    handleInputChange({ target: { name: 'skills', value: newSkills } });
  };

  const handleChange = (index, key, value) => {
    const newSkills = [...resumeInfo.skills];
    newSkills[index] = { ...newSkills[index], [key]: value };
    handleInputChange({ target: { name: 'skills', value: newSkills } });
  };

  return (
    <div className="p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10 glass">
      <h2 className="font-bold text-lg">Skills</h2>
      <p>Add Your top professional key skills</p>

      <div>
        {resumeInfo.skills.map((item, index) => (
          <div
            key={index}
            className="flex justify-between mb-2 border rounded-lg p-3 "
          >
            <div>
              <label className="text-xs">Name</label>
              <Input
                className="w-full"
                value={item.name}
                onChange={(e) => handleChange(index, "name", e.target.value)}
              />
            </div>
            <Rating
              style={{ maxWidth: 120 }}
              value={item.rating}
              onChange={(v) => handleChange(index, "rating", v)}
            />
          </div>
        ))}
      </div>
      <div className="flex justify-between">
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={AddNewSkills}
            className="text-primary"
          >
            {" "}
            + Add More Skill
          </Button>
          <Button
            variant="outline"
            onClick={() => RemoveSkills(resumeInfo.skills.length - 1)}
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

export default Skills;
