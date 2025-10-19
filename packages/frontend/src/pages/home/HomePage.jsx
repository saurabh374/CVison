import Header from "@/components/custom/Header.jsx";
import React, { useEffect } from "react";
import heroSnapshot from "@/assets/heroSnapshot.png";
import { useNavigate } from "react-router-dom";
import { FaGithub } from "react-icons/fa";
import { Button } from "@/components/ui/button.jsx";
import { startUser } from "../../Services/login.js";
import { useDispatch, useSelector } from "react-redux";
import { addUserData } from "@/features/user/userFeatures.js";
import { motion } from "framer-motion";

function HomePage() {
  const user = useSelector((state) => state.editUser.userData);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleClick = () => {
    window.open(
      "https://github.com/sahidrajaansari/Ai-Resume-Builder",
      "_blank"
    );
  };

  useEffect(() => {
    const fetchResponse = async () => {
      try {
        const response = await startUser();
        if (response.statusCode == 200) {
          dispatch(addUserData(response.data));
        } else {
          dispatch(addUserData(""));
        }
      } catch (error) {
        dispatch(addUserData(""));
      }
    };
    fetchResponse();
  }, []);

  const hadnleGetStartedClick = () => {
    if (user) {
      navigate("/dashboard");
    } else {
      navigate("/auth/sign-in");
    }
  };
  return (
    <div className="bg-gradient-to-r from-primary to-secondary min-h-screen">
      <Header user={user} />
      <section className="pt-24 pb-20">
        <div className="px-12 mx-auto max-w-7xl">
          <motion.div
            className="w-full mx-auto text-left md:w-11/12 xl:w-9/12 md:text-center glass p-8 rounded-lg"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="mb-8 text-4xl font-extrabold leading-none tracking-normal text-foreground md:text-6xl md:tracking-tight">
              <motion.span
                className="block w-full py-2 text-transparent bg-clip-text leading-12 bg-gradient-to-r from-blue-400 to-pink-500 lg:inline"
                animate={{
                  backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  repeatType: "reverse",
                }}
              >
                Build a Stunning Resume
              </motion.span>{" "}
              <span>for Your Next Job</span>
            </h1>
            <p className="px-0 mb-8 text-lg text-muted-foreground md:text-xl lg:px-24">
              Create a professional, AI-powered resume in minutes.
            </p>
            <div className="mb-4 space-x-0 md:space-x-2 md:mb-8">
              <Button onClick={hadnleGetStartedClick} size="lg">
                Get Started for Free
              </Button>
            </div>
          </motion.div>
          <motion.div
            className="w-full mx-auto mt-20 text-center md:w-10/12"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <img
              className="object-cover w-full rounded-lg shadow-2xl"
              src={heroSnapshot}
              alt="Dashboard"
            />
          </motion.div>
        </div>
      </section>
      <footer className="p-5 flex justify-center">
        <p className="text-xs leading-5 text-muted-foreground">
          &copy; 2024 Ai-Resume-Builder. All rights reserved.
        </p>
      </footer>
    </div>
  );
}

export default HomePage;
