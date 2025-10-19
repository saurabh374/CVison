import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@/components/ui/button";
import PersonalDetails from "./form-components/PersonalDetails";
import Summary from "./form-components/Summary";
import Experience from "./form-components/Experience";
import Education from "./form-components/Education";
import Skills from "./form-components/Skills";
import Project from "./form-components/Project";
import { ArrowLeft, ArrowRight, HomeIcon } from "lucide-react";
import { Link } from "react-router-dom";
import ThemeColor from "./ThemeColor";

function ResumeForm({ resumeInfo, handleInputChange, onSave, loading }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [enanbledNext, setEnabledNext] = useState(true);
  const [enanbledPrev, setEnabledPrev] = useState(true);

  useEffect(() => {
    if (currentIndex === 0) {
      setEnabledPrev(false);
    } else if (currentIndex == 1) {
      setEnabledPrev(true);
    } else if (currentIndex === 4) {
      setEnabledNext(true);
    } else if (currentIndex === 5) {
      setEnabledNext(false);
    }
  }, [currentIndex]);

  return (
    <div>
      <div className="flex justify-between">
        <div className="flex gap-2 items-center">
          <Link to="/dashboard">
            <Button>
              <HomeIcon />
            </Button>
          </Link>
          <ThemeColor resumeInfo={resumeInfo} />
        </div>
        <div className="flex items-center gap-3">
          {currentIndex > 0 && (
            <Button
              size="sm"
              className="text-sm gap-2"
              disabled={!enanbledPrev}
              onClick={() => {
                if (currentIndex === 0) return;
                setCurrentIndex(currentIndex - 1);
              }}
            >
              <ArrowLeft /> Prev
            </Button>
          )}
          {currentIndex < 5 && (
            <Button
              size="sm"
              className="gap-2"
              disabled={!enanbledNext}
              onClick={() => {
                if (currentIndex >= 5) return;
                setCurrentIndex(currentIndex + 1);
              }}
            >
              Next <ArrowRight className="text-sm" />
            </Button>
          )}
        </div>
      </div>
      {currentIndex === 0 && (
        <PersonalDetails
          resumeInfo={resumeInfo}
          handleInputChange={handleInputChange}
          onSave={onSave}
          loading={loading}
        />
      )}
      {currentIndex === 1 && (
        <Summary
          resumeInfo={resumeInfo}
          handleInputChange={handleInputChange}
          onSave={onSave}
          loading={loading}
        />
      )}
      {currentIndex === 2 && (
        <Experience
          resumeInfo={resumeInfo}
          handleInputChange={handleInputChange}
          onSave={onSave}
          loading={loading}
        />
      )}
      {currentIndex === 3 && (
        <Project
          resumeInfo={resumeInfo}
          handleInputChange={handleInputChange}
          onSave={onSave}
          loading={loading}
        />
      )}
      {currentIndex === 4 && (
        <Education
          resumeInfo={resumeInfo}
          handleInputChange={handleInputChange}
          onSave={onSave}
          loading={loading}
        />
      )}
      {currentIndex === 5 && (
        <Skills
          resumeInfo={resumeInfo}
          handleInputChange={handleInputChange}
          onSave={onSave}
          loading={loading}
        />
      )}
    </div>
  );
}

export default ResumeForm;
