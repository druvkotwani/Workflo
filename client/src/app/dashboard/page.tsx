import React from "react";
import Sidebar from "./sidebar";
import Dashboard from "./dashboard";
import Modal from "../components/Modal";
import ModalDisplay from "./modalDisplay";
import { ModalProvider } from "../context/modalContext";
import AOSInit from "./aos";

const Page = () => {
  return (
    <ModalProvider>
      <div className="bg-[#F7F7F7]  flex h-screen">
        <Sidebar />
        <div className=" ml-[301px] mr-4">
          <Dashboard />
        </div>

        <ModalDisplay />
      </div>
      <AOSInit />
    </ModalProvider>
  );
};

export default Page;
