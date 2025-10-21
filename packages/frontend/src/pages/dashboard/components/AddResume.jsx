import React, { useState } from "react";
import { CopyPlus, Loader2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { createNewResume } from "@/Services/resumeAPI";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner"; // ✅ using your existing Toaster setup

export default function AddResume() {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleCreateResume = async () => {
    if (!title.trim()) {
      toast.error("Please enter a title for your resume");
      return;
    }

    try {
      setLoading(true);
      const payload = {
        data: {
          title: title.trim(),
          themeColor: "#000000",
        },
      };

      const res = await createNewResume(payload);
      console.log("Resume created:", res);

      const newId = res?.data?.resume?._id;
      if (newId) {
        toast.success("Resume created successfully!");
        setOpen(false);
        setTitle("");
        navigate(`/dashboard/edit-resume/${newId}`);
      } else {
        throw new Error("Invalid response: missing resume ID");
      }
    } catch (error) {
      console.error("Error creating resume:", error);
      toast.error("Failed to create resume. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <div
          className="p-6 flex flex-col items-center justify-center bg-gradient-to-br from-indigo-50 to-purple-50 border border-indigo-100 rounded-2xl shadow-sm hover:shadow-md hover:scale-105 transition-all cursor-pointer min-h-[180px]"
        >
          <CopyPlus className="w-8 h-8 text-indigo-600 mb-2" />
          <p className="text-sm font-semibold text-indigo-700">Add New Resume</p>
        </div>
      </DialogTrigger>

      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Create a New Resume</DialogTitle>
          <DialogDescription className="text-sm text-gray-500">
            Enter a title for your new resume. You can edit all details later.
          </DialogDescription>
        </DialogHeader>

        <div className="mt-4 space-y-3">
          <Input
            placeholder="e.g., Backend Engineer Resume"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            disabled={loading}
          />

          <div className="flex justify-end gap-2 pt-2">
            <Button variant="ghost" onClick={() => setOpen(false)} disabled={loading}>
              Cancel
            </Button>
            <Button onClick={handleCreateResume} disabled={!title.trim() || loading}>
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Create"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
