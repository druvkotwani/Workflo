"use client";

import Image from "next/image";
import React from "react";

export interface ListProps {
  id: string;
  heading?: string;
  description?: string;
  priority?: string;
  date?: string;
  time?: string;
  index?: number;
  draggableProps?: any;
  dragHandleProps?: any;
  onClick?: () => void;
}

function checkPriority(priority: string) {
  if (priority === "Urgent") {
    return "bg-[#FF6B6B]";
  } else if (priority === "Medium") {
    return "bg-[#FFA235]";
  } else if (priority === "Low") {
    return "bg-[#0ECC5A]";
  } else {
    return "bg-[#0b243f]";
  }
}

const List: React.FC<ListProps> = ({
  id,
  heading,
  description,
  priority = "bg-[#0b243f]",
  date,
  time,
  draggableProps,
  dragHandleProps,
  onClick = () => {},
}) => {
  return (
    <div
      {...draggableProps}
      {...dragHandleProps}
      onClick={onClick}
      className={` py-[14px] px-[13px] rounded-lg bg-[#F9F9F9] border border-[#DEDEDE] `}
    >
      <div className="flex flex-col gap-[13px]">
        <div className="flex gap-1 flex-col">
          <p className="text-[#606060] font-medium text-base ">{heading}</p>
          <p className="text-[#797979] text-[14px]">{description} </p>
        </div>

        <div
          className={`px-2 text-white w-fit py-[6px] ${checkPriority(
            priority
          )} rounded-lg`}
        >
          {priority}
        </div>
        <div className="flex gap-2 items-center ">
          <Image
            src="/assets/dashboard/workspace/clock.svg"
            alt="User"
            width={24}
            height={24}
          />
          <p className="text-[#606060] font-semibold text-sm">{date}</p>
        </div>
      </div>
      <div className="text-[#797979] font-medium text-sm font-inter mt-4">
        {time}
      </div>
    </div>
  );
};

export default List;
