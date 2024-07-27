import React from "react";
import Sidebar from "./sidebar";
import Dashboard from "./dashboard";

const Page = () => {
  return (
    <div className="bg-[#F7F7F7] min-h-screen flex">
      <Sidebar />
      <Dashboard />
    </div>
  );
};

export default Page;
