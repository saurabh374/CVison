import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getAllResumeData } from "@/Services/resumeAPI";
import AddResume from "./components/AddResume";
import ResumeCard from "./components/ResumeCard";
import { Loader } from "lucide-react";

function Dashboard() {
  const user = useSelector((state) => state.editUser.userData);
  const [resumeList, setResumeList] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchAllResumeData = async () => {
    setLoading(true);
    try {
      const resumes = await getAllResumeData();
      setResumeList(resumes.data);
    } catch (error) {
      console.log("Error from dashboard", error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllResumeData();
  }, [user]);

  return (
    <div className="p-10 md:px-20 lg:px-32">
      <h2 className="font-bold text-3xl">My Resumes</h2>
      <p className="py-3 text-muted-foreground">
        Start creating your AI-powered resume for your next job role.
      </p>
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <Loader className="animate-spin" size={48} />
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 grid-cols-1 mt-5 gap-4">
          <AddResume />
          {resumeList.length > 0 ? (
            resumeList.map((resume) => (
              <ResumeCard
                key={resume._id}
                resume={resume}
                refreshData={fetchAllResumeData}
              />
            ))
          ) : (
            <div className="col-span-full text-center text-muted-foreground">
              <p>You haven't created any resumes yet.</p>
              <p>Click the "+" to get started.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Dashboard;
