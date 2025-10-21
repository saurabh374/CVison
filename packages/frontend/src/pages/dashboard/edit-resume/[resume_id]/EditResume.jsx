import React, { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getResumeData } from "@/Services/resumeAPI";
import { addResumeData } from "@/features/resume/resumeFeatures";
import ResumeForm from "../components/ResumeForm";
import PreviewPage from "../components/PreviewPage";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

/**
 * EditResume Page
 * - Fetches resume by ID
 * - Loads data into Redux
 * - Handles loading & error gracefully
 * - Responsive split layout: form + preview
 */
export default function EditResume() {
  const { resume_id } = useParams();
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchResume = useCallback(async (id) => {
    if (!id) return;
    setLoading(true);
    setError(null);

    const controller = new AbortController();
    try {
      const res = await getResumeData(id, { signal: controller.signal });
      const data = res?.data || null;

      if (!data) throw new Error("No resume data found");

      dispatch(addResumeData(data));
      toast.success("Resume loaded successfully");
    } catch (err) {
      if (err?.name !== "AbortError") {
        console.error("Error fetching resume:", err);
        setError(err?.message || "Failed to load resume");
        toast.error("Failed to load resume");
      }
    } finally {
      setLoading(false);
    }

    return () => controller.abort();
  }, [dispatch]);

  useEffect(() => {
    fetchResume(resume_id);
  }, [resume_id, fetchResume]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[80vh]">
        <div className="flex flex-col items-center gap-3 text-gray-700">
          <Loader2 className="w-8 h-8 animate-spin text-indigo-500" />
          <p className="text-sm font-medium">Loading resume...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-[80vh] text-center text-gray-600">
        <p className="text-red-600 font-medium mb-2">Error: {error}</p>
        <button
          onClick={() => fetchResume(resume_id)}
          className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 text-sm"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6 md:p-10 lg:px-20">
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">
          Resume Details
        </h2>
        <ResumeForm />
      </div>

      <div className="bg-gray-50 rounded-xl shadow-inner border border-gray-100 p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">
          Live Preview
        </h2>
        <PreviewPage />
      </div>
    </div>
  );
}
