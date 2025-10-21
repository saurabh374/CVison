import React, { useState } from "react";
import {
  FaUser,
  FaLock,
  FaSignInAlt,
  FaUserPlus,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";
import { motion } from "framer-motion";
import { loginUser, registerUser } from "@/Services/login";
import { Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addUserData } from "@/features/user/userFeatures";

function AuthPage() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [signUpError, setSignUpError] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [signInError, setSignInError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSignInSubmit = async (event) => {
    setSignInError("");
    event.preventDefault();
    const { email, password } = event.target.elements;

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email.value)) {
      setSignInError("Please enter a valid email address.");
      return;
    }

    setLoading(true);
    const data = {
      email: email.value,
      password: password.value,
    };

    try {
      const user = await loginUser(data);

      if (user?.statusCode === 200) {
        dispatch(addUserData(user.data.user ?? user.data ?? user));
        navigate("/");
      }
      // keep logging for debug like you had
      console.log("login response:", user);
    } catch (error) {
      setSignInError(error.message || "Login failed");
      console.log("Login Failed", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSignUpSubmit = async (event) => {
    setSignUpError("");
    event.preventDefault();
    const { fullname, email, password } = event.target.elements;

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email.value)) {
      setSignUpError("Please enter a valid email address.");
      return;
    }

    setLoading(true);
    const data = {
      fullName: fullname.value,
      email: email.value,
      password: password.value,
    };
    try {
      const response = await registerUser(data);

      // preserve your original behavior: if created, call sign-in flow
      if (response?.statusCode === 201) {
        await handleSignInSubmit(event);
      } else {
        setSignUpError(response?.message || "Registration failed");
      }
    } catch (error) {
      setSignUpError(error.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 relative flex items-start justify-center">
      {/* Optional subtle top bar — keeps visual parity with the rest of your app */}
      <div className="w-full h-14 bg-gradient-to-r from-indigo-50 to-violet-50 border-b border-gray-100 flex items-center px-6 z-10 fixed top-0 left-0">
        <div className="max-w-7xl w-full mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src="/logo.svg" alt="logo" className="w-7 h-7" />
            <span className="text-sm font-medium text-gray-700">CVison</span>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsSignUp(false)}
              className="rounded-md px-3 py-1 text-sm border border-gray-200 bg-white text-gray-700 hover:bg-gray-50"
            >
              Sign in
            </button>
            <button
              onClick={() => setIsSignUp(true)}
              className="rounded-md px-3 py-1 text-sm bg-emerald-400 text-white hover:bg-emerald-500"
            >
              Get started
            </button>
          </div>
        </div>
      </div>

      {/* card container (push down a bit to account for fixed top bar) */}
      <div className="flex items-start justify-center pt-36 px-6 w-full">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="relative w-full max-w-md rounded-xl bg-white border border-gray-100 shadow-sm p-8"
          style={{ boxShadow: "0 10px 30px rgba(16,24,40,0.06)" }}
        >
          {/* Tabs */}
          <div className="flex items-center mb-6 gap-2 text-sm">
            <button
              onClick={() => setIsSignUp(false)}
              className={`flex-1 py-2 text-center rounded-md ${!isSignUp ? "text-indigo-700 border-b-2 border-indigo-200" : "text-gray-500"
                }`}
            >
              <FaSignInAlt className="inline mr-2" /> Sign In
            </button>
            <button
              onClick={() => setIsSignUp(true)}
              className={`flex-1 py-2 text-center rounded-md ${isSignUp ? "text-indigo-700 border-b-2 border-indigo-200" : "text-gray-500"
                }`}
            >
              <FaUserPlus className="inline mr-2" /> Sign Up
            </button>
          </div>

          {/* title */}
          <h2 className="text-center text-gray-800 text-2xl font-semibold mb-4">
            {isSignUp ? "Create an account" : "Welcome back"}
          </h2>

          {/* show errors */}
          {(signInError || signUpError) && (
            <div className="mb-4 text-sm text-red-600 bg-red-50 px-3 py-2 rounded">
              {signInError || signUpError}
            </div>
          )}

          {/* forms: NOTE names must match what your handlers expect (fullname, email, password) */}
          {isSignUp ? (
            <form onSubmit={handleSignUpSubmit} className="space-y-4" aria-label="Sign up form">
              <div className="flex items-center gap-3 bg-white border border-gray-200 rounded px-3 py-2">
                <FaUser className="text-gray-400" />
                <input
                  name="fullname"
                  defaultValue=""
                  className="w-full text-sm outline-none placeholder-gray-400"
                  placeholder="Full name"
                  aria-label="Full name"
                  required
                />
              </div>

              <div className="flex items-center gap-3 bg-white border border-gray-200 rounded px-3 py-2">
                <FaUser className="text-gray-400" />
                <input
                  name="email"
                  type="email"
                  defaultValue={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full text-sm outline-none placeholder-gray-400"
                  placeholder="Email address"
                  aria-label="Email"
                  required
                />
              </div>

              <div className="flex items-center gap-3 bg-white border border-gray-200 rounded px-3 py-2">
                <FaLock className="text-gray-400" />
                <input
                  name="password"
                  type={showPassword ? "text" : "password"}
                  defaultValue={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full text-sm outline-none placeholder-gray-400"
                  placeholder="Password"
                  aria-label="Password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((s) => !s)}
                  className="text-gray-400 p-1"
                  aria-pressed={showPassword}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full inline-flex items-center justify-center gap-2 rounded-md bg-indigo-600 hover:bg-indigo-700 text-white py-2 text-sm font-medium disabled:opacity-60"
              >
                {loading ? <Loader2 className="animate-spin w-4 h-4" /> : "Create account"}
              </button>
            </form>
          ) : (
            <form onSubmit={handleSignInSubmit} className="space-y-4" aria-label="Sign in form">
              <div className="flex items-center gap-3 bg-white border border-gray-200 rounded px-3 py-2">
                <FaUser className="text-gray-400" />
                <input
                  name="email"
                  type="email"
                  defaultValue={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full text-sm outline-none placeholder-gray-400"
                  placeholder="Email address"
                  aria-label="Email"
                  required
                />
              </div>

              <div className="flex items-center gap-3 bg-white border border-gray-200 rounded px-3 py-2">
                <FaLock className="text-gray-400" />
                <input
                  name="password"
                  type={showPassword ? "text" : "password"}
                  defaultValue={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full text-sm outline-none placeholder-gray-400"
                  placeholder="Password"
                  aria-label="Password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((s) => !s)}
                  className="text-gray-400 p-1"
                  aria-pressed={showPassword}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>

              {/* <div className="flex justify-between items-center text-sm">
                <button type="button" className="text-sm text-indigo-600 hover:underline">
                  Forgot password?
                </button>
              </div> */}

              <button
                type="submit"
                disabled={loading}
                className="w-full inline-flex items-center justify-center gap-2 rounded-md bg-indigo-600 hover:bg-indigo-700 text-white py-2 text-sm font-medium disabled:opacity-60"
              >
                {loading ? <Loader2 className="animate-spin w-4 h-4" /> : "Sign in"}
              </button>
            </form>
          )}

          <p className="mt-4 text-center text-sm text-gray-500">
            {isSignUp ? (
              <>
                Already have an account?{" "}
                <button onClick={() => setIsSignUp(false)} className="text-indigo-600 hover:underline">
                  Sign in
                </button>
              </>
            ) : (
              <>
                Don’t have an account?{" "}
                <button onClick={() => setIsSignUp(true)} className="text-indigo-600 hover:underline">
                  Create one
                </button>
              </>
            )}
          </p>
        </motion.div>
      </div>
    </div>
  );
}

export default AuthPage;
