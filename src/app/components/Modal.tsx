"use client";

import Image from "next/image";
import React, { useContext } from "react";
import { ModalContext } from "../context/modalContext";
import styles from "./Modal.module.css";

const data = [
  {
    name: "Status",
    icon: "status.svg",
  },
  {
    name: "Priority",
    icon: "priority.svg",
  },
  {
    name: "Deadline",
    icon: "date.svg",
  },
  {
    name: "Description",
    icon: "edit.svg",
  },
];

const Modal = () => {
  const { setShowModal, status, setStatus } = useContext(ModalContext);
  return (
    <div
      data-aos="fade-left"
      data-aos-offset="200"
      data-aos-easing="ease-in-out"
      data-aos-duration="400"
      className="h-screen absolute right-0 top-0 z-10 bg-white min-w-[670px] pt-4 flex flex-col gap-8 px-6"
    >
      {/* Div */}
      <div className="flex flex-col gap-[27px]">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-4">
            <Image
              src="/assets/dashboard/modal/close.svg"
              alt="Close"
              width={24}
              height={24}
              onClick={() => setShowModal(false)}
              className="cursor-pointer"
            />
            <Image
              src="/assets/dashboard/modal/zoom.svg"
              alt="Big"
              width={24}
              height={24}
              className="cursor-pointer"
            />
          </div>
          <div className="flex items-center gap-4">
            <div className="cursor-pointer p-2 flex gap-[14px] bg-[#F4F4F4] rounded font-inter text-base text-[#797979]">
              Share
              <Image
                src="/assets/dashboard/modal/share.svg"
                alt="Share"
                width={24}
                height={24}
              />
            </div>
            <div className="p-2 cursor-pointer flex gap-[14px] bg-[#F4F4F4] rounded font-inter text-base text-[#797979]">
              Favourite
              <Image
                src="/assets/dashboard/modal/favourite.svg"
                alt="Favourite"
                width={24}
                height={24}
              />
            </div>
          </div>
        </div>

        {/* Data */}
        <div className="flex flex-col gap-[38px]">
          <div className="flex flex-col gap-8 items-start justify-center">
            <input
              type="text"
              placeholder="Title"
              className={`text-5xl font-barlow font-semibold focus:outline-none ${styles["input-placeholder"]} ${styles["input-text"]}`}
            />

            <div className="flex gap-[60px] w-full">
              <div className="flex flex-col gap-8">
                {data.map((item: any, index: number) => (
                  <div key={index} className="flex gap-6">
                    <Image
                      src={`/assets/dashboard/modal/${item.icon}`}
                      alt={item.name}
                      width={24}
                      height={24}
                    />
                    <span className="font-inter text-base text-[#666666]">
                      {item.name}
                    </span>
                  </div>
                ))}
              </div>
              <div className="flex flex-col gap-8 w-full ">
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className={`max-w-[150px] text-base font-inter rounded focus:outline-none ${styles.customSelect}`}
                >
                  <option
                    className="text-[#C1BDBD] font-inter text-base"
                    value="Not Selected"
                    disabled
                    selected
                    hidden
                  >
                    Not Selected
                  </option>
                  {["To do", "In progress", "Under review", "Finished"].map(
                    (item, index) => (
                      <option key={index} value={item}>
                        {item}
                      </option>
                    )
                  )}
                </select>

                <select
                  className={`max-w-[150px] text-base font-inter rounded focus:outline-none ${styles.customSelect}`}
                >
                  <option
                    className="text-[#C1BDBD] font-inter text-base"
                    value=""
                    disabled
                    selected
                    hidden
                  >
                    Not Selected
                  </option>
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>

                <input
                  type="date"
                  className={`w-full max-w-[150px] text-base font-inter rounded focus:outline-none  ${styles.customSelect}`}
                />

                <input
                  placeholder="Description"
                  className={`text-base  font-inter  rounded focus:outline-none ${styles["input-placeholder"]}  ${styles["input-text-2"]}`}
                />
              </div>
            </div>
          </div>
          <div className="flex gap-[23px] cursor-pointer">
            <Image
              src="/assets/dashboard/modal/add.svg"
              alt="add"
              width={24}
              height={24}
            />
            <span className="font-inter text-base text-[#000000]">
              Add custom property
            </span>
          </div>
        </div>
      </div>

      {/* Seperation */}
      <div className="border-t w-full h-[1.5px] border-[#DEDEDE]"></div>

      {/* Start writing, or drag your own files here. */}

      <input
        type="text"
        placeholder="Start writing, or drag your own files here."
        className={`text-base font-inter  focus:outline-none ${styles["input-placeholder"]} ${styles["input-text-2"]}`}
      />
    </div>
  );
};

export default Modal;
