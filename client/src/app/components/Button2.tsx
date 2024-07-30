import Image from "next/image";
import React from "react";

interface ButtonProps {
  text?: string;
  onClick?: () => void;
}

const Button2: React.FC<ButtonProps> = ({ text, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`text-base bg-gradient-to-b from-[#3A3A3A] to-[#202020] rounded-lg font-inter text-white p-2 flex items-center justify-between w-full `}
    >
      Add new
      <Image
        src="/assets/dashboard/workspace/add.svg"
        alt="Plus"
        width={24}
        height={24}
      />
    </button>
  );
};

export default Button2;
