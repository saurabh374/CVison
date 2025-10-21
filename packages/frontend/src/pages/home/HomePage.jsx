import React, { useEffect, useMemo } from "react";
import Header from "@/components/custom/Header.jsx";
import heroSnapshot from "@/assets/heroSnapshot.png";
import { useLocation, useNavigate } from "react-router-dom";
import { FaGithub, FaCircle, FaInfoCircle } from "react-icons/fa";
import { Button } from "@/components/ui/button.jsx";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";

/**
 * Polished HomePage
 * - Improved accessibility (semantic landmarks, aria labels)
 * - Reduced motion respect
 * - Better hero image handling + low-impact hover transform
 * - Feature list memoized and keyboard-friendly
 * - Clear CTA behaviour and small UX polish
 */
export default function HomePage() {
  const navigate = useNavigate();
  const user = useSelector((state) => state.editUser?.userData ?? null);
  const location = useLocation();

  // Respect prefers-reduced-motion — avoid large transforms if user asks
  const prefersReducedMotion = useMemo(() => {
    try {
      return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    } catch (e) {
      return false;
    }
  }, []);

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace("#", "");
      const el = document.getElementById(id);
      if (el) {
        // small timeout to allow layout to settle
        setTimeout(() => {
          el.scrollIntoView({ behavior: "smooth", block: "start" });
          // focus target for keyboard users
          el.tabIndex = -1;
          el.focus({ preventScroll: true });
        }, 50);
      }
    }
  }, [location]);

  const openGithub = () => {
    window.open("https://github.com/saurabh374/CVison", "_blank", "noopener,noreferrer");
  };

  const handlePrimary = () => {
    if (user && user !== "") navigate("/dashboard");
    else navigate("/auth/sign-in");
  };

  const features = useMemo(
    () => [
      { title: "Save time", desc: "Generate polished resumes in minutes with smart suggestions." },
      { title: "ATS friendly", desc: "Templates optimized for applicant tracking systems." },
      { title: "Export & share", desc: "PDF exports, shareable links, and version history." },
    ],
    []
  );

  return (
    <div className="min-h-screen bg-white text-gray-900">
      <main>
        <section className="pt-24 pb-12">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-12">
              {/* HERO TEXT */}
              <div className="space-y-6">
                <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight leading-tight">
                  Build{' '}
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-500">
                    AI-powered
                  </span>{' '}
                  resumes that get noticed
                </h1>

                <p className="text-lg text-gray-600 max-w-2xl">
                  Turn your experience into an interview-winning resume in minutes. Smart templates,
                  clarity suggestions, and one-click exports — everything a modern job-seeker needs.
                </p>

                <div className="flex flex-col sm:flex-row sm:items-center sm:gap-4 gap-3">
                  <Button
                    onClick={handlePrimary}
                    className="rounded-2xl px-6 py-3"
                    aria-label="Get started — create your resume"
                  >
                    Get started
                  </Button>

                  <Button
                    variant="ghost"
                    onClick={openGithub}
                    className="rounded-2xl px-6 py-3 flex items-center"
                    aria-label="Star CVison on GitHub"
                  >
                    <FaGithub className="w-4 h-4 mr-2" aria-hidden />
                    Star on GitHub
                  </Button>
                </div>

                <div className="mt-2 text-sm text-gray-500 flex items-center gap-4">
                  <div className="inline-flex items-center gap-2">
                    <FaInfoCircle className="w-4 h-4 text-gray-400" aria-hidden />
                    <span>30+ templates · export PDF · ATS friendly</span>
                  </div>
                </div>
              </div>

              {/* HERO VISUAL */}
              <div className="mx-auto w-full max-w-2xl">
                <figure className="rounded-2xl overflow-hidden shadow-xl ring-1 ring-black ring-opacity-5 bg-white">
                  <div className="flex items-center justify-between px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-500">
                    <div className="flex items-center gap-2">
                      <FaCircle className="w-3 h-3 text-white opacity-90" aria-hidden />
                      <FaCircle className="w-3 h-3 text-white opacity-80" aria-hidden />
                      <FaCircle className="w-3 h-3 text-white opacity-70" aria-hidden />
                    </div>
                    <FaInfoCircle className="text-white opacity-90" aria-hidden />
                  </div>

                  {/* Use <picture> to allow future responsive sources; keep a native img fallback */}
                  <picture>
                    {/* example: you can add srcSet/webp variants here later */}
                    <img
                      src={heroSnapshot}
                      alt="Preview of CVison resume builder — dashboard with templates and suggestions"
                      className={`w-full h-64 object-cover sm:h-80 md:h-96 transition-transform duration-300 ${prefersReducedMotion ? '' : 'hover:scale-105'
                        }`}
                      loading="lazy"
                      width="1200"
                      height="700"
                    />
                  </picture>
                </figure>

                {/* small feature chips */}
                <div className="mt-4 flex flex-wrap gap-2" aria-hidden>
                  <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gray-100 text-sm text-gray-700">ATS-ready</span>
                  <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gray-100 text-sm text-gray-700">Custom templates</span>
                  <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gray-100 text-sm text-gray-700">One-click export</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-gray-50 py-12" aria-labelledby="why-choose">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <h2 id="why-choose" className="text-2xl font-bold text-gray-900 mb-6">Why choose AI Resume Builder?</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {features.map((f) => (
                <Feature key={f.title} title={f.title} desc={f.desc} />
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

function Feature({ title, desc }) {
  return (
    <article className="rounded-lg bg-white p-6 shadow-sm" tabIndex={0} aria-labelledby={`feature-${title}`}>
      <h3 id={`feature-${title}`} className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-sm text-gray-600">{desc}</p>
    </article>
  );
}

Feature.propTypes = {
  title: PropTypes.string.isRequired,
  desc: PropTypes.string.isRequired,
};
