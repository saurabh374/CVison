import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getAllResumeData } from "@/Services/resumeAPI";
import AddResume from "./components/AddResume";
import ResumeCard from "./components/ResumeCard";
import { Loader } from "lucide-react";
import { motion } from "framer-motion";

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
    <div className="p-10 md:px-20 lg:px-32 bg-gradient-to-br from-primary to-secondary min-h-screen">
      <h2 className="font-bold text-3xl text-foreground">
        Welcome back, {user?.fullName}!
      </h2>
      <p className="py-3 text-muted-foreground">
        Let's create a stunning resume for your next job role.
      </p>
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <Loader className="animate-spin text-foreground" size={48} />
        </div>
      ) : (
        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-3 grid-cols-1 mt-5 gap-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
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
            <div className="col-span-full text-center text-muted-foreground glass p-8 rounded-lg">
              <p>You haven't created any resumes yet.</p>
              <p>Click the "+" to get started.</p>
            </div>
          )}
        </motion.div>
      )}
    </div>
  );
}

export default Dashboard;
