"use client";

import Image from "next/image";
import React, { useContext } from "react";
import { ModalContext } from "../context/modalContext";

const Modal = () => {
  const { setShowModal } = useContext(ModalContext);
  return (
    <div className="h-screen absolute right-0 top-0 z-10 bg-white min-w-[670px] pt-4 flex flex-col gap-8 px-6">
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
        <div></div>
      </div>

      {/* Seperation */}

      {/* Start writing, or drag your own files here. */}
    </div>
  );
};

export default Modal;
