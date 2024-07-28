import Image from "next/image";
import React from "react";

interface ButtonProps {
  text?: string;
  textClass?: string;
  onClick?: () => void;
}

const Button: React.FC<ButtonProps> = ({ text, textClass, onClick }) => {
  return (
    <div
      onClick={onClick}
      className={` cursor-pointer rounded-lg p-[1.5px] bg-gradient-to-t from-[#4B36CC] to-[#9C93D4]`}
    >
      <button
        className={`text-[20px] bg-gradient-to-b from-[#4C38C2] to-[#2F2188] rounded-lg shadow-md font-medium font-inter text-white p-2 flex items-center justify-center gap-2 w-full   ${textClass}`}
      >
        {text}
        <Image
          src="/assets/sidebar/plus.svg"
          alt="Plus"
          width={24}
          height={24}
        />
      </button>
    </div>
  );
};

export default Button;
