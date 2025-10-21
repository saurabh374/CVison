import React, { useEffect, useState, useMemo } from "react";
import { useSelector } from "react-redux";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  HomeIcon,
} from "lucide-react";

import PersonalDetails from "./form-components/PersonalDetails";
import Summary from "./form-components/Summary";
import Experience from "./form-components/Experience";
import Education from "./form-components/Education";
import Skills from "./form-components/Skills";
import Project from "./form-components/Project";
import ThemeColor from "./ThemeColor";

/**
 * Multi-step Resume Form
 * - Simplified navigation logic
 * - Progress header with step indicator
 * - Cleaner and safer state management
 */
export default function ResumeForm() {
  const resumeInfo = useSelector((state) => state.editResume.resumeData);

  // Define step components in order
  const steps = useMemo(
    () => [
      { title: "Personal Details", component: PersonalDetails },
      { title: "Summary", component: Summary },
      { title: "Experience", component: Experience },
      { title: "Projects", component: Project },
      { title: "Education", component: Education },
      { title: "Skills", component: Skills },
    ],
    []
  );

  const [currentIndex, setCurrentIndex] = useState(0);
  const [enabledNext, setEnabledNext] = useState(true);
  const [enabledPrev, setEnabledPrev] = useState(false);

  const CurrentStep = steps[currentIndex].component;
  const isFirst = currentIndex === 0;
  const isLast = currentIndex === steps.length - 1;

  useEffect(() => {
    setEnabledPrev(!isFirst);
    setEnabledNext(!isLast);
  }, [currentIndex, isFirst, isLast]);

  const goNext = () => {
    if (currentIndex < steps.length - 1) setCurrentIndex((i) => i + 1);
  };
  const goPrev = () => {
    if (currentIndex > 0) setCurrentIndex((i) => i - 1);
  };

  return (
    <div className="space-y-6">
      {/* Header & Controls */}
      <div className="flex justify-between items-center">
        <div className="flex gap-2 items-center">
          <Link to="/dashboard" aria-label="Go to dashboard">
            <Button variant="outline" size="icon">
              <HomeIcon className="w-5 h-5" />
            </Button>
          </Link>
          <ThemeColor resumeInfo={resumeInfo} />
        </div>

        <div className="flex items-center gap-2">
          {!isFirst && (
            <Button
              size="sm"
              className="gap-2"
              disabled={!enabledPrev}
              onClick={goPrev}
              aria-label="Previous section"
            >
              <ArrowLeft className="w-4 h-4" /> Prev
            </Button>
          )}
          {!isLast && (
            <Button
              size="sm"
              className="gap-2"
              disabled={!enabledNext}
              onClick={goNext}
              aria-label="Next section"
            >
              Next <ArrowRight className="w-4 h-4" />
            </Button>
          )}
        </div>
      </div>

      {/* Progress Header */}
      <div className="flex items-center justify-between text-sm text-gray-600 font-medium mb-2">
        <span>
          Step {currentIndex + 1} of {steps.length}
        </span>
        <span className="text-indigo-600 font-semibold">
          {steps[currentIndex].title}
        </span>
      </div>

      {/* Divider */}
      <div className="h-1 bg-gray-100 rounded-full overflow-hidden">
        <div
          className="h-1 bg-gradient-to-r from-indigo-500 to-purple-500 transition-all duration-500"
          style={{
            width: `${((currentIndex + 1) / steps.length) * 100}%`,
          }}
        />
      </div>

      {/* Step Content */}
      <div className="bg-white border border-gray-100 rounded-xl shadow-sm p-6 mt-4">
        <CurrentStep
          resumeInfo={resumeInfo}
          setEnabledNext={setEnabledNext}
          setEnabledPrev={setEnabledPrev}
        />
      </div>
    </div>
  );
}
