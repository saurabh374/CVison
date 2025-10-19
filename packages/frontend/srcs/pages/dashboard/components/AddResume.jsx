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
import { motion } from "framer-motion";

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
        themeColor: "#007BFF",
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
      <motion.div
        className="p-14 py-24 flex items-center justify-center glass rounded-lg h-[380px] hover:scale-105 transition-all duration-400 cursor-pointer"
        onClick={() => setOpenDialog(true)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <CopyPlus className="text-foreground" />
      </motion.div>
      <Dialog open={isDialogOpen}>
        <DialogContent setOpenDialog={setOpenDialog} className="glass">
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
