import React, { useState, useRef } from "react";
import PropTypes from "prop-types";
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";

/**
 * Polished, accessible footer for CVison
 * - Responsive grid layout
 * - Accessible newsletter form with client-side validation + success / error states
 * - Social links rendered from array (easy to extend)
 * - Graceful handling of "coming soon" links
 */
export default function Footer({ onSubscribe }) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle"); // idle | loading | success | error
  const [message, setMessage] = useState("");
  const statusRef = useRef(null);

  const social = [
    {
      href: "https://github.com/saurabh374/CVison",
      label: "GitHub",
      icon: FaGithub,
    },
    {
      href: "https://www.linkedin.com/in/iamsaurabhp",
      label: "LinkedIn",
      icon: FaLinkedin,
    },
    {
      href: "mailto:patilsaurabh1902@gmail.com",
      label: "Email",
      icon: FaEnvelope,
    },
  ];

  // simple RFC-5322-lite email-ish check; good enough for client-side
  const isValidEmail = (value) => /\S+@\S+\.\S+/.test(value);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    if (!email || !isValidEmail(email)) {
      setStatus("error");
      setMessage("Please enter a valid email address.");
      statusRef.current?.focus();
      return;
    }

    setStatus("loading");
    try {
      // If parent passed an onSubscribe handler, use it (keeps component testable)
      if (typeof onSubscribe === "function") {
        await onSubscribe(email);
      } else {
        // fallback mock: simulate network delay
        await new Promise((r) => setTimeout(r, 700));
      }

      setStatus("success");
      setMessage("Thanks — you’re subscribed!");
      setEmail("");
      statusRef.current?.focus();
    } catch (err) {
      console.error("Subscribe failed:", err);
      setStatus("error");
      setMessage("Subscription failed. Please try again later.");
      statusRef.current?.focus();
    }
  };

  return (
    <footer className="bg-white border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
          {/* Brand */}
          <div>
            <a href="/" aria-label="CVison home" className="flex items-center gap-3 mb-4 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-indigo-300 rounded">
              <img src="/logo.svg" alt="CVison logo" loading="lazy" className="w-9 h-9" />
              <span className="font-semibold text-gray-900 text-lg">CVison</span>
            </a>

            <p className="text-sm text-gray-600 leading-relaxed max-w-sm">
              AI-assisted resume builder — ATS-friendly templates, one-click exports, and smart suggestions to help you land interviews faster.
            </p>

            <div className="mt-4 flex items-center gap-3">
              <a
                href="mailto:patilsaurabh1902@gmail.com"
                aria-label="Email CVison"
                className="inline-flex items-center gap-2 text-sm text-gray-700 hover:text-gray-900 transition focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-200 rounded"
              >
                <FaEnvelope className="w-4 h-4" aria-hidden />
                <span>Contact</span>
              </a>
            </div>
          </div>

          {/* Quick links */}
          <div className="flex flex-col md:items-center">
            <h4 className="text-gray-800 font-semibold mb-3 text-sm uppercase tracking-wide">Quick Links</h4>

            <ul className="space-y-2 text-gray-600 text-sm">
              <li>
                <a href="/#features" className="hover:text-gray-900 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-200 rounded">Features</a>
              </li>
              <li>
                <a href="/auth/sign-in" className="hover:text-gray-900 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-200 rounded">Get Started</a>
              </li>
              <li>
                <button
                  type="button"
                  className="text-gray-400 cursor-not-allowed text-sm"
                  aria-disabled="true"
                  title="Docs coming soon"
                >
                  Docs (coming soon)
                </button>
              </li>
            </ul>

            {/* Newsletter */}
            <form onSubmit={handleSubmit} className="mt-4 flex w-full max-w-sm rounded-md overflow-hidden ring-1 ring-gray-100" aria-labelledby="newsletter-label">
              <label id="newsletter-label" htmlFor="footer-news" className="sr-only">Email address</label>

              <input
                id="footer-news"
                type="email"
                inputMode="email"
                placeholder="Your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 px-3 py-2 text-sm placeholder-gray-400 bg-white outline-none"
                aria-label="Subscribe to newsletter"
              />

              <button
                type="submit"
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 text-sm font-medium disabled:opacity-60"
                aria-label="Subscribe"
                disabled={status === "loading"}
              >
                {status === "loading" ? "Joining..." : "Join"}
              </button>
            </form>

            {/* Status message — screen reader friendly */}
            <div className="mt-2" aria-live="polite" aria-atomic="true">
              {message && (
                <p ref={statusRef} tabIndex={-1} className={`text-sm ${status === "error" ? "text-red-600" : "text-green-600"}`}>
                  {message}
                </p>
              )}
            </div>
          </div>

          {/* Connect */}
          <div className="flex md:justify-end flex-col gap-4">
            <h4 className="text-gray-800 font-semibold mb-3 text-sm uppercase tracking-wide">Connect</h4>

            <div className="flex items-center gap-3">
              {social.map((s) => {
                const Icon = s.icon;
                return (
                  <a
                    key={s.href}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    className="inline-flex items-center gap-2 px-3 py-2 rounded-md text-sm text-gray-700 hover:bg-gray-50 hover:text-gray-900 transition focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-200"
                  >
                    <Icon className="w-4 h-4" aria-hidden />
                    <span>{s.label}</span>
                  </a>
                );
              })}
            </div>

            <div className="mt-2 text-sm text-gray-500">
              <div>© {new Date().getFullYear()} <strong>CVison</strong></div>
              <div className="mt-2 text-gray-400">Privacy (coming soon) · Terms (coming soon)</div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

Footer.propTypes = {
  // optional callback for subscribe behaviour. Should return a Promise if provided.
  onSubscribe: PropTypes.func,
};

Footer.defaultProps = {
  onSubscribe: undefined,
};
