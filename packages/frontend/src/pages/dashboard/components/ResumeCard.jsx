import React from "react";
import {
  FaEye,
  FaEdit,
  FaTrashAlt,
  FaSpinner,
} from "react-icons/fa";
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

/* Subtle gradient frames for variety */
const gradients = [
  "from-indigo-100 to-purple-100",
  "from-blue-100 to-teal-100",
  "from-pink-100 to-rose-100",
  "from-green-100 to-emerald-100",
  "from-yellow-100 to-orange-100",
];

const getRandomGradient = () =>
  gradients[Math.floor(Math.random() * gradients.length)];

export default function ResumeCard({ resume, refreshData }) {
  const [loading, setLoading] = React.useState(false);
  const [openAlert, setOpenAlert] = React.useState(false);
  const navigate = useNavigate();
  const gradient = React.useMemo(() => getRandomGradient(), []);

  const handleDelete = async () => {
    setLoading(true);
    try {
      await deleteThisResume(resume._id);
      toast.success("Resume deleted successfully!");
      refreshData();
    } catch (error) {
      console.error("Error deleting resume:", error);
      toast.error(error?.message || "Failed to delete resume");
    } finally {
      setLoading(false);
      setOpenAlert(false);
    }
  };

  return (
    <div
      className={`group relative bg-gradient-to-br ${gradient} rounded-2xl p-[1px] shadow-sm hover:shadow-md transition-all`}
    >
      <div className="bg-white rounded-2xl flex flex-col justify-between h-[200px]">
        {/* Title */}
        <div className="p-4 flex-1 flex items-center justify-center text-center">
          <h2 className="font-semibold text-gray-800 text-lg leading-tight line-clamp-2">
            {resume?.title || "Untitled Resume"}
          </h2>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-around py-3 border-t border-gray-100 bg-gray-50 rounded-b-2xl">
          <IconButton
            icon={<FaEye />}
            label="View"
            onClick={() => navigate(`/dashboard/view-resume/${resume._id}`)}
          />
          <IconButton
            icon={<FaEdit />}
            label="Edit"
            onClick={() => navigate(`/dashboard/edit-resume/${resume._id}`)}
          />
          <IconButton
            icon={<FaTrashAlt />}
            label="Delete"
            onClick={() => setOpenAlert(true)}
            color="text-red-600 hover:text-red-700"
          />
        </div>
      </div>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={openAlert} onOpenChange={setOpenAlert}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete this resume?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. It will permanently remove your
              resume from the system.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={loading}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              disabled={loading}
              className="bg-red-600 hover:bg-red-700"
            >
              {loading ? (
                <FaSpinner className="animate-spin w-4 h-4 mx-auto" />
              ) : (
                "Delete"
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

/* ---------- Small Reusable Button ---------- */
function IconButton({ icon, label, onClick, color = "text-gray-600 hover:text-indigo-600" }) {
  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={onClick}
      aria-label={label}
      className="transition-all hover:scale-110"
    >
      <span className={`text-lg ${color}`}>{icon}</span>
    </Button>
  );
}
