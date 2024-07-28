"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useContext, useState } from "react";
import Button from "../components/Button";
import { ModalContext } from "../context/modalContext";

// Data for the sidebar
const data = [
  {
    icon: "home.svg",
    name: "Home",
  },
  {
    icon: "board.svg",
    name: "Boards",
  },
  {
    icon: "settings.svg",
    name: "Settings",
  },
  {
    icon: "team.svg",
    name: "Teams",
  },
  {
    icon: "analytics.svg",
    name: "Analytics",
  },
];

const Sidebar = () => {
  const [selectedTab, setSelectedTab] = useState("Home");
  const { setShowModal, setStatus } = useContext(ModalContext);

  return (
    <div className="fixed top-0 left-0 w-[285px] h-screen  py-6 px-4 bg-white lg:w-[285px] flex flex-col gap-4 border-r border-r-[#DEDEDE]">
      {/* Profile + Additional Settings + Logout */}
      <div className="flex flex-col  gap-2">
        {/* Profile section */}
        <div className="flex items-center justify-start ">
          <Image
            src="/assets/sidebar/profile.svg"
            alt="Profile"
            width={31}
            height={31}
            className="rounded-lg"
          />

          <p className="ml-2 font-inter font-medium text-[20px] text-[#080808]">
            Joe Gardner
          </p>
        </div>

        {/* Additional section */}
        <div className="flex justify-between items-center">
          <div className="flex gap-5">
            {["notification.svg", "status.svg", "right.svg"].map(
              (item: any, index: number) => (
                <Image
                  key={index}
                  src={`/assets/sidebar/${item}`}
                  alt={item}
                  width={24}
                  height={24}
                  className="cursor-pointer"
                />
              )
            )}
          </div>
          <Link
            href={"/signin"}
            className="bg-[#F4F4F4] text-[#797979] text-base font-inter rounded flex items-center justify-start p-2"
          >
            Logout
          </Link>
        </div>
      </div>

      {/* Boards */}
      <div className="w-full h-full">
        <div className="mb-4 flex flex-col gap-2 justify-center items-start w-full">
          {data.map((item: any, index: number) => (
            <div
              onClick={() => setSelectedTab(item.name)}
              key={index}
              className={`flex justify-start rounded w-full items-center gap-[14px] ${
                selectedTab === item.name
                  ? "bg-[#F4F4F4] border border-[#DDDDDD]"
                  : "border border-transparent"
              }  cursor-pointer p-2 `}
            >
              <Image
                src={`/assets/sidebar/${item.icon}`}
                alt={item.name}
                width={24}
                height={24}
              />
              <p className="font-inter text-[20px] text-[#797979]">
                {item.name}
              </p>
            </div>
          ))}
        </div>

        {/* Create new Task Button */}
        <Button
          onClick={() => (setShowModal(true), setStatus("Not Selected"))}
          text="Create new task"
        />
      </div>

      {/* Download the app */}
      <div className="flex gap-2 p-2 mt-auto bg-[#F3F3F3] rounded-lg cursor-pointer">
        <Image
          src="/assets/sidebar/download.svg"
          alt="Download"
          width={40}
          height={40}
        />
        <div className="flex flex-col items-start justify-center gap-1">
          <p className="text-[#666666] font-medium text-[20px]">
            Download the app
          </p>
          <p className="text-[#666666] text-sm">Get the full experience </p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
