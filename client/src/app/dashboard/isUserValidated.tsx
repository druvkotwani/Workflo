"use client";

import React, { useEffect, useState } from "react";
import Sidebar from "./sidebar";
import Dashboard from "./dashboard";
import ModalDisplay from "./modalDisplay";
import AOSInit from "./aos";
import { useRouter } from "next/navigation";
import UseToastNotification from "../components/useToastNotfification";
import { ToastContainer } from "react-toastify";

const IsUserValidated = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Check for token in local storage
    const token = localStorage.getItem("token");
    if (token) {
      setIsAuthenticated(true);
    } else {
      // Redirect to login page if no token is found
      router.push("/signin");
    }
  }, [router]);

  if (!isAuthenticated) {
    // Optionally return null or a loading spinner while checking
    return null;
  }
  return (
    <>
      <div className="bg-[#F7F7F7]  flex h-screen">
        <Sidebar />
        <div className=" ml-[301px] mr-4">
          <Dashboard />
        </div>

        <ModalDisplay />
      </div>
      <AOSInit />

      <UseToastNotification />
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </>
  );
};

export default IsUserValidated;
