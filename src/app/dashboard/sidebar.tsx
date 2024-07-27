"use client";

import Image from "next/image";
import React, { useState } from "react";

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
  return (
    <div className="w-fit min-h-screen py-6 px-4 bg-white lg:min-w-[285px] flex flex-col gap-4">
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
          <button className="bg-[#F4F4F4] text-[#797979] text-base font-inter rounded flex items-center justify-start p-2">
            Logout
          </button>
        </div>
      </div>

      {/* Boards */}
      <div className="w-full h-full">
        <div className="flex flex-col gap-2 justify-center items-start w-full">
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
        <div className="mt-4  rounded-lg p-[1.5px] bg-gradient-to-t from-[#4B36CC] to-[#9C93D4]">
          <button className="text-[20px] bg-gradient-to-b from-[#4C38C2] to-[#2F2188] rounded-lg shadow-md font-medium font-inter text-white p-2 flex items-center justify-center gap-2 w-full   ">
            Create new task
            <Image
              src="/assets/sidebar/plus.svg"
              alt="Plus"
              width={24}
              height={24}
            />
          </button>
        </div>
      </div>

      {/* Download the app */}
      <div className="flex gap-2 p-2 mt-auto bg-[#F3F3F3] rounded-lg">
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
