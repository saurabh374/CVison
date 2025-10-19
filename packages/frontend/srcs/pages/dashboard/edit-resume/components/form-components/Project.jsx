import React from "react";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import SimpeRichTextEditor from "@/components/custom/SimpeRichTextEditor";
import { LoaderCircle } from "lucide-react";

const formFields = {
  projectName: "",
  techStack: "",
  projectSummary: "",
};

function Project({ resumeInfo, handleInputChange, onSave, loading }) {
  const addProject = () => {
    const newProjects = [...resumeInfo.projects, formFields];
    handleInputChange({ target: { name: 'projects', value: newProjects } });
  };

  const removeProject = (index) => {
    const newProjects = resumeInfo.projects.filter((_, i) => i !== index);
    handleInputChange({ target: { name: 'projects', value: newProjects } });
  };

  const handleChange = (e, index) => {
    const { name, value } = e.target;
    const newProjects = [...resumeInfo.projects];
    newProjects[index] = { ...newProjects[index], [name]: value };
    handleInputChange({ target: { name: 'projects', value: newProjects } });
  };

  const handleRichTextEditor = (value, name, index) => {
    const newProjects = [...resumeInfo.projects];
    newProjects[index] = { ...newProjects[index], [name]: value };
    handleInputChange({ target: { name: 'projects', value: newProjects } });
  };

  return (
    <div className="p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10 glass">
      <h2 className="font-bold text-lg">Projects</h2>
      <p>Add your projects</p>
      <div>
        {resumeInfo.projects?.map((project, index) => (
          <div key={index}>
            <div className="flex justify-between my-2">
              <h3 className="font-bold text-lg">Project {index + 1}</h3>
              <Button
                variant="outline"
                className="text-red-500"
                onClick={() => removeProject(index)}
              >
                <Trash2 />
              </Button>
            </div>
            <div className="grid grid-cols-2 gap-3 border p-3 my-5 rounded-lg">
              <div>
                <label className="text-xs">Project Name</label>
                <Input
                  type="text"
                  name="projectName"
                  value={project.projectName}
                  onChange={(e) => handleChange(e, index)}
                />
              </div>
              <div>
                <label className="text-xs">Tech Stack</label>
                <Input
                  type="text"
                  name="techStack"
                  value={project.techStack}
                  placeholder="React, Node.js, Express, MongoDB"
                  onChange={(e) => handleChange(e, index)}
                />
              </div>
              <div className="col-span-2">
                <SimpeRichTextEditor
                  index={index}
                  defaultValue={project.projectSummary}
                  onRichTextEditorChange={(event) =>
                    handleRichTextEditor(event, "projectSummary", index)
                  }
                />
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-between py-2">
        <Button onClick={addProject} variant="outline" className="text-primary">
          + Add {resumeInfo.projects?.length > 0 ? "more" : null} project
        </Button>
        <Button onClick={onSave} disabled={loading}>
          {loading ? <LoaderCircle className="animate-spin" /> : "Save"}
        </Button>
      </div>
    </div>
  );
}

export default Project;
