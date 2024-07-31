"use client";

import Image from "next/image";
import React, { useContext, useState } from "react";
import Button from "../components/Button";
import Workspace from "./workspace";
import { ModalContext } from "../context/modalContext";
const features = [
  {
    heading: "Introducing tags",
    description:
      "Easily categorize and find your notes by adding tags. Keep your workspace clutter-free and efficient.",
  },
  {
    heading: "Share Notes Instantly",
    description:
      "Effortlessly share your notes with others via email or link. Enhance collaboration with quick sharing options.",
  },
  {
    heading: "Access Anywhere",
    description:
      "Sync your notes across all devices. Stay productive whether you're on your phone, tablet, or computer.",
  },
];
const data = [
  {
    icon: "calendar.svg",
    name: "Calendar View",
  },
  {
    icon: "automation.svg",
    name: "Automation",
  },
  {
    icon: "filter.svg",
    name: "Filter",
  },
  {
    icon: "share.svg",
    name: "Share",
  },
];

function goodMorning() {
  const date = new Date();
  const hours = date.getHours();
  if (hours < 12) {
    return "Good morning";
  } else if (hours < 18) {
    return "Good afternoon";
  } else {
    return "Good evening";
  }
}

const Dashboard = () => {
  const { setShowModal, setStatus, username } = useContext(ModalContext);
  const [infoHover, setInfoHover] = useState(false);
  const [headerTab, setHeaderTab] = useState("");
  const [search, setSearch] = useState("");
  return (
    <div className="pt-6  w-full  ">
      {/* Header */}
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between w-full">
          <h2 className="font-barlow font-semibold text-3xl md:text-5xl text-[#080808]">
            {goodMorning()}, {username || localStorage.getItem("username")}!
          </h2>

          <div className="font-inter text-[#080808] flex items-center gap-2 relative">
            Help & feedback
            <Image
              onMouseEnter={() => setInfoHover(true)}
              onMouseLeave={() => setInfoHover(false)}
              src="/assets/dashboard/header/info.svg"
              alt="Info"
              width={24}
              height={24}
              className="cursor-pointer"
            />
            {infoHover && (
              <div className="absolute top-10 right-0 bg-white shadow-lg p-4 md:min-w-[300px] rounded-lg">
                <p className="text-[#080808] font-inter  text-sm">
                  For any queries or feedback, please contact us at{" "}
                  <span className="font-bold">info@crework.in</span>
                </p>
              </div>
            )}
          </div>
        </div>
        <div className="flex gap-2">
          {features.map((feature: any, index: number) => (
            <div
              key={index}
              className="p-4 flex gap-[10px] border-[#F4F4F4] border bg-white rounded-lg"
            >
              <Image
                src={`/assets/dashboard/header/${index + 1}.svg`}
                alt={feature.heading}
                width={77}
                height={61}
              />
              <div className="flex flex-col items-start justify-center">
                <h3 className="font-inter font-semibold text-base text-[#757575]">
                  {feature.heading}
                </h3>
                <p className="font-inter text-sm text-[#868686]">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-between items-center">
          <form className="w-fit">
            <div className="w-full relative">
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search"
                className="text-[#797979] p-2 w-full rounded-lg border-[#E9E9E9] border focus:outline-none"
              />

              <Image
                src="/assets/dashboard/header/search.svg"
                alt="Search"
                width={24}
                height={24}
                className="absolute right-2 top-1/2 transform -translate-y-1/2"
              />
            </div>
          </form>

          <div className="flex items-center">
            <div className="flex gap-4 mr-4">
              {data.map((item: any, index: number) => (
                <div
                  key={index}
                  onClick={() => setHeaderTab(item.name)}
                  className={`  hover:border hover:border-[#DDDDDD] flex rounded cursor-pointer items-center p-2 gap-[14px] ${
                    headerTab === item.name
                      ? " border border-[#DDDDDD] bg-[#efefef]"
                      : "bg-[#F4F4F4]  border border-transparent"
                  }`}
                >
                  <p className="font-inter text-base text-[#797979]">
                    {item.name}
                  </p>
                  <Image
                    src={`/assets/dashboard/header/${item.icon}`}
                    alt={item.name}
                    width={24}
                    height={24}
                  />
                </div>
              ))}
            </div>
            <Button
              onClick={() => (setShowModal(true), setStatus("Not Selected"))}
              text="Create new"
              textClass="font-medium text-base"
            />
          </div>
        </div>
      </div>

      {/* Lists */}
      <Workspace search={search} />
    </div>
  );
};

export default Dashboard;
