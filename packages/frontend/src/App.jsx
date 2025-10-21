import React, { useEffect, useState, useCallback } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Header from "./components/custom/Header";
import { Toaster } from "./components/ui/sonner";
import { useDispatch, useSelector } from "react-redux";
import { addUserData } from "./features/user/userFeatures";
import { startUser } from "./Services/login";
import Footer from "./components/custom/Footer";
import Background from "./components/ui/Background";

export default function App() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = useSelector((state) => state.editUser.userData);

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <Background />
      <Header user={user && user !== "" ? user : null} />
      <main className="relative z-10">
        <Outlet />
      </main>
      <Toaster />
      <Footer />
    </div>
  );
}
