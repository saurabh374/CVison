import React from "react";
import { useState } from "react";
import { CopyPlus, Loader } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { createNewResume } from "@/Services/resumeAPI";
import { useNavigate } from "react-router-dom";

function AddResume() {
  const [isDialogOpen, setOpenDialog] = useState(false);
  const [resumetitle, setResumetitle] = useState("");
  const [loading, setLoading] = useState(false);
  const Navigate = useNavigate();

  const createResume = async () => {
    setLoading(true);
    if (resumetitle === "")
      return console.log("Please add a title to your resume");
    const data = {
      data: {
        title: resumetitle,
        themeColor: "#007BFF", // Updated primary color
      },
    };
    createNewResume(data)
      .then((res) => {
        Navigate(`/dashboard/edit-resume/${res.data.resume._id}`);
      })
      .finally(() => {
        setLoading(false);
        setResumetitle("");
      });
  };
  return (
    <>
      <div
        className="p-14 py-24 flex items-center justify-center border-2 bg-secondary rounded-lg h-[380px] hover:scale-105 transition-all duration-400 cursor-pointer hover:shadow-md"
        onClick={() => setOpenDialog(true)}
      >
        <CopyPlus />
      </div>
      <Dialog open={isDialogOpen}>
        <DialogContent setOpenDialog={setOpenDialog}>
          <DialogHeader>
            <DialogTitle>Create a New Resume</DialogTitle>
            <DialogDescription>
              Add a title for your new resume.
              <Input
                className="my-3"
                type="text"
                placeholder="Ex: Backend Developer Resume"
                value={resumetitle}
                onChange={(e) => setResumetitle(e.target.value)}
              />
            </DialogDescription>
            <div className="gap-2 flex justify-end">
              <Button variant="ghost" onClick={() => setOpenDialog(false)}>
                Cancel
              </Button>
              <Button onClick={createResume} disabled={!resumetitle || loading}>
                {loading ? (
                  <Loader className=" animate-spin" />
                ) : (
                  "Create"
                )}
              </Button>
            </div>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default AddResume;
