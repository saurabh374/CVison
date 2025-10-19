import Header from "@/components/custom/Header.jsx";
import React, { useEffect } from "react";
import heroSnapshot from "@/assets/heroSnapshot.png";
import { useNavigate } from "react-router-dom";
import { FaGithub } from "react-icons/fa";
import { Button } from "@/components/ui/button.jsx";
import { startUser } from "../../Services/login.js";
import { useDispatch, useSelector } from "react-redux";
import { addUserData } from "@/features/user/userFeatures.js";

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
        console.log(
          "Printing from Home Page there was a error ->",
          error.message
        );
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
    <>
      <Header user={user} />
      <section className="pt-24 pb-20 bg-background">
        <div className="px-12 mx-auto max-w-7xl">
          <div className="w-full mx-auto text-left md:w-11/12 xl:w-9/12 md:text-center">
            <h1 className="mb-8 text-4xl font-extrabold leading-none tracking-normal text-foreground md:text-6xl md:tracking-tight">
              <span>Start</span>{" "}
              <span className="block w-full py-2 text-transparent bg-clip-text leading-12 bg-gradient-to-r from-primary to-secondary lg:inline">
                building a Resume
              </span>{" "}
              <span>for your next Job</span>
            </h1>
            <p className="px-0 mb-8 text-lg text-muted-foreground md:text-xl lg:px-24">
              Build. Refine. Shine. With AI-Driven Resumes
            </p>
            <div className="mb-4 space-x-0 md:space-x-2 md:mb-8">
              <Button onClick={hadnleGetStartedClick}>
                Get Started
                <svg
                  className="w-4 h-4 ml-1"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </Button>
            </div>
          </div>
          <div className="w-full mx-auto mt-20 text-center md:w-10/12">
            <img
              className="object-cover w-full rounded-lg"
              src={heroSnapshot}
              alt="Dashboard"
            />
          </div>
        </div>
      </section>
      <footer className="bg-background" aria-labelledby="footer-heading">
        <div className="mt-16 border-t border-border pt-8 sm:mt-20 lg:mt-24 p-5 flex justify-between">
          <p className="text-xs leading-5 text-muted-foreground">
            &copy; 2024 Ai-Resume-Builder. All rights reserved.
          </p>
          <div>
            <Button variant="ghost" onClick={handleClick}>
              <FaGithub className="w-4 h-4 mr-1" />
              GitHub
            </Button>
          </div>
        </div>
      </footer>
    </>
  );
}

export default HomePage;
