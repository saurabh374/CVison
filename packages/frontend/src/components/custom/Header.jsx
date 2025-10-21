import React, { useEffect, useState, useRef, useCallback } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import PropTypes from "prop-types";
import logo from "/logo.svg";
import { logoutUser } from "@/Services/login";
import { addUserData } from "@/features/user/userFeatures";
import { Button } from "../ui/button";
import { persistor } from "@/store/store";


export default function Header({ user }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const menuRef = useRef(null);
  const firstMenuItemRef = useRef(null);

  // Close menu when route changes (keeps mobile + desktop in sync)
  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  // Click outside + Escape key handling (robust)
  useEffect(() => {
    function onPointerDown(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false);
      }
    }

    function onKeyDown(e) {
      if (e.key === "Escape") setOpen(false);
      if ((e.key === "ArrowDown" || e.key === "Enter") && open) {
        // focus first interactive item in the menu
        requestAnimationFrame(() => firstMenuItemRef.current?.focus());
      }
    }

    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  const handleLogout = useCallback(async () => {
    setLoading(true);
    try {
      const response = await logoutUser();
      // Accept status or statusCode — defensive
      const ok = response && (response.status === 200 || response.statusCode === 200);
      // Always clear local user state regardless of remote response
      dispatch(addUserData(null));
      await persistor.flush();
      await persistor.purge();
      navigate("/");
      if (!ok) {
        // in a real app: notify user that logout might have failed server-side
        console.warn("Logout request finished but server returned non-200 status", response);
      }
    } catch (err) {
      // surface to logging system in real app
      console.error("Logout failed:", err);
      dispatch(addUserData(null));
      navigate("/");
    } finally {
      setLoading(false);
    }
  }, [dispatch, navigate]);

  const initials = useCallback((name = "") => {
    return name
      .trim()
      .split(/\s+/)
      .map((n) => n[0] || "")
      .filter(Boolean)
      .slice(0, 2)
      .join("")
      .toUpperCase();
  }, []);

  const menuItems = [
    { to: "/dashboard", label: "Dashboard" },
    { to: "/dashboard/settings", label: "Settings" },
  ];

  return (
    <header className="bg-white/70 backdrop-blur-sm border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-3 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-indigo-300 rounded-md">
            <img src={logo} alt="Brand logo" className="w-10 h-10" />
            <span className="font-semibold text-lg tracking-tight text-gray-900">CVison</span>
          </Link>

          {/* Optional center nav for larger screens */}
          <nav className="hidden md:flex items-center gap-6" aria-label="Primary">
            <Link to="/#features" className="text-sm font-medium text-gray-600 hover:text-gray-900 transition">Features</Link>
            <Link to="/pricing" className="text-sm font-medium text-gray-600 hover:text-gray-900 transition">Pricing</Link>
            <Link to="/docs" className="text-sm font-medium text-gray-600 hover:text-gray-900 transition">Docs</Link>
          </nav>

          <div className="flex items-center gap-3">
            {user ? (
              <div className="relative" ref={menuRef}>
                <button
                  aria-haspopup="true"
                  aria-controls="profile-menu"
                  aria-expanded={open}
                  onClick={() => setOpen((s) => !s)}
                  className="flex items-center gap-3 rounded-full px-2 py-1 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-300 transition"
                >
                  <Avatar name={user.name} photo={user.photo} />

                  <div className="hidden md:flex flex-col items-start leading-tight">
                    <span className="text-sm font-medium text-gray-800">{user.name}</span>
                    <span className="text-xs text-gray-500">{user.email}</span>
                  </div>
                </button>

                {/* Animated dropdown */}
                <div
                  id="profile-menu"
                  role="menu"
                  aria-labelledby="profile-button"
                  className={`absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 z-50 overflow-hidden transform transition-all origin-top-right ${open ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"
                    }`}
                >
                  <div className="py-2">
                    {menuItems.map((it, idx) => (
                      <Link
                        key={it.to}
                        to={it.to}
                        role="menuitem"
                        ref={idx === 0 ? firstMenuItemRef : undefined}
                        onClick={() => setOpen(false)}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 focus:bg-gray-50 focus:outline-none"
                      >
                        {it.label}
                      </Link>
                    ))}

                    <button
                      onClick={handleLogout}
                      disabled={loading}
                      className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-50 disabled:opacity-60"
                      role="menuitem"
                    >
                      {loading ? "Signing out..." : "Sign out"}
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Link to="/auth/sign-in">
                  <Button variant="ghost" className="hidden md:inline-flex">Sign in</Button>
                </Link>
                <Link to="/auth/sign-in">
                  <Button>Get started</Button>
                </Link>
              </div>
            )}

            <div className="md:hidden">
              <MobileMenu user={user} onLogout={handleLogout} />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

function Avatar({ name = "", photo, size = 36 }) {
  const initialsText = name ? name.split(" ").map(n => n[0]).slice(0, 2).join("").toUpperCase() : "";
  const alt = name ? `${name}'s avatar` : "User avatar";
  return photo ? (
    <img src={photo} alt={alt} className="w-9 h-9 rounded-full object-cover" />
  ) : (
    <div
      className="w-9 h-9 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 text-white flex items-center justify-center font-semibold"
      aria-hidden
    >
      {initialsText || initialsText}
    </div>
  );
}

Avatar.propTypes = {
  name: PropTypes.string,
  photo: PropTypes.string,
  size: PropTypes.number,
};

function MobileMenu({ user, onLogout }) {
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);

  // close on navigation shortcut (optional)
  useEffect(() => {
    if (!open) return;
    function onPointerDown(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) setOpen(false);
    }
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [open]);

  return (
    <div className="md:hidden" ref={menuRef}>
      <button
        onClick={() => setOpen((s) => !s)}
        aria-expanded={open}
        aria-controls="mobile-menu"
        className="p-2 rounded-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-300 transition"
      >
        <span className="sr-only">Open menu</span>
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden>
          {open ? (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          ) : (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          )}
        </svg>
      </button>

      <div
        id="mobile-menu"
        className={`absolute right-4 top-16 w-52 bg-white rounded-xl shadow-lg py-2 z-40 transition transform origin-top-right ${open ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"}`}
      >
        <nav className="flex flex-col">
          {user ? (
            <>
              <Link to="/dashboard" className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">Dashboard</Link>
              <Link to="/dashboard/settings" className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">Settings</Link>
              <button onClick={onLogout} className="text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-50">Sign out</button>
            </>
          ) : (
            <Link to="/auth/sign-in" className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">Get started</Link>
          )}
        </nav>
      </div>
    </div>
  );
}
