import React, { useEffect, useState, useCallback } from "react";
import { useSelector } from "react-redux";
import { getAllResumeData } from "@/Services/resumeAPI";
import AddResume from "./components/AddResume";
import ResumeCard from "./components/ResumeCard";

/**
 * Modern Dashboard
 * - Lists all resumes
 * - Integrates AddResume modal for creation
 * - Shows empty, loading, and error states gracefully
 */
export default function Dashboard() {
  const user = useSelector((state) => state.editUser.userData);

  const [resumeList, setResumeList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  /** ✅ Fetch all resumes */
  const fetchAllResumeData = useCallback(async () => {
    if (!user) return;
    setLoading(true);
    setError(null);
    try {
      const response = await getAllResumeData();
      const data = response?.data || [];
      setResumeList(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Error fetching resumes:", err);
      setError("Failed to load resumes");
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    fetchAllResumeData();
  }, [user, fetchAllResumeData]);

  return (
    <div className="p-8 md:px-20 lg:px-32">
      {/* Header */}
      <header className="mb-8 text-center md:text-left">
        <h2 className="font-extrabold text-3xl bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-500">
          My Resumes
        </h2>
        <p className="py-2 text-gray-600">
          Build, edit, and manage your AI-powered resumes — quickly and beautifully.
        </p>
      </header>

      {/* States */}
      {loading ? (
        <LoadingSkeleton />
      ) : error ? (
        <ErrorBlock message={error} onRetry={fetchAllResumeData} />
      ) : resumeList.length === 0 ? (
        // 🟦 Centered Add Card when empty
        <div className="flex justify-center items-center mt-16">
          <AddResume />
        </div>
      ) : (
        // 🟨 Grid layout with Add card and resume cards
        <div className="grid md:grid-cols-2 lg:grid-cols-3 grid-cols-1 gap-5 mt-5">
          <AddResume />
          {resumeList.map((resume) => (
            <ResumeCard
              key={resume._id}
              resume={resume}
              refreshData={fetchAllResumeData}
            />
          ))}
        </div>
      )}
    </div>
  );
}

/* ---------- Helper Components ---------- */

function LoadingSkeleton() {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 grid-cols-1 gap-5 mt-5">
      {Array.from({ length: 6 }).map((_, i) => (
        <div
          key={i}
          className="animate-pulse h-44 rounded-2xl bg-gradient-to-br from-gray-100 to-gray-200"
        />
      ))}
    </div>
  );
}

function ErrorBlock({ message, onRetry }) {
  return (
    <div className="text-center bg-red-50 border border-red-200 rounded-xl p-6 shadow-sm">
      <p className="text-red-700 mb-4 font-medium">{message}</p>
      <button
        onClick={onRetry}
        className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md text-sm font-medium"
      >
        Try Again
      </button>
    </div>
  );
}
