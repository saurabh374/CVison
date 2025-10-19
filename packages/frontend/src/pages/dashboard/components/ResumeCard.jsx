import { FaEye, FaEdit, FaTrashAlt, FaSpinner } from "react-icons/fa";
import React from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { deleteThisResume } from "@/Services/resumeAPI";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

function ResumeCard({ resume, refreshData }) {
  const [loading, setLoading] = React.useState(false);
  const [openAlert, setOpenAlert] = React.useState(false);
  const navigate = useNavigate();

  const handleDelete = async () => {
    setLoading(true);
    try {
      await deleteThisResume(resume._id);
      toast("Resume deleted successfully.");
    } catch (error) {
      toast(error.message);
    } finally {
      setLoading(false);
      setOpenAlert(false);
      refreshData();
    }
  };
  return (
    <div className="p-5 bg-card rounded-lg flex flex-col justify-between shadow-md transition-all duration-300 ease-in-out cursor-pointer hover:shadow-xl hover:scale-105">
      <div className="flex-grow">
        <h2 className="text-center font-bold text-lg text-foreground">
          {resume.title}
        </h2>
      </div>
      <div className="flex items-center justify-around p-4 border-t border-border">
        <Button
          variant="ghost"
          onClick={() => navigate(`/dashboard/view-resume/${resume._id}`)}
        >
          <FaEye className="text-muted-foreground" />
        </Button>
        <Button
          variant="ghost"
          onClick={() => navigate(`/dashboard/edit-resume/${resume._id}`)}
        >
          <FaEdit className="text-muted-foreground" />
        </Button>
        <Button variant="ghost" onClick={() => setOpenAlert(true)}>
          <FaTrashAlt className="text-destructive" />
        </Button>
        <AlertDialog open={openAlert} onOpenChange={setOpenAlert}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete your
                resume and remove your data from our servers.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handleDelete} disabled={loading}>
                {loading ? <FaSpinner className="animate-spin" /> : "Delete"}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
}

export default ResumeCard;
