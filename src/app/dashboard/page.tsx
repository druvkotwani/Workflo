import React from "react";
import Sidebar from "./sidebar";
import Dashboard from "./dashboard";

const Page = () => {
  return (
    <div className="bg-[#F7F7F7]  flex h-screen">
      <Sidebar />
      <div className=" ml-[301px] mr-4">
        {" "}
        <Dashboard />
      </div>
    </div>
  );
};

export default Page;
