// Sigin Form Component

import Link from "next/link";
import React from "react";

const SignInForm = () => {
  return (
    <div
      className={`min-h-screen  bg-gradient-to-b from-white to-[#AFA3FF] pt-[120px] px-4 lg:px-24`}
    >
      <div className="bg-gradient-to-b from-[#F7F7F7] w-full  to-[#F0F0F0] md:w-[600px] md:min-h-[476px] mx-auto rounded-2xl border border-[#CECECE] p-4 md:p-[60px]">
        {/* Heading */}
        <h1 className="font-barlow  font-semibold md:text-5xl text-3xl flex items-center justify-center w-full text-[#2D2D2D]">
          Welcome to&nbsp;<span className="text-[#4534AC]">Workflo</span>!
        </h1>

        <div className="py-8 w-full h-full">
          {/* Email/Password */}
          <form className="flex flex-col ">
            <div className="flex flex-col gap-6 font-inter">
              <input
                type="text"
                placeholder="Your Email"
                className=" py-4 px-3 font-inter text-[20px] bg-[#EBEBEB] rounded-lg  focus:outline-none"
              />
              <input
                type="password"
                placeholder="Password"
                className=" py-4 px-3 font-inter text-[20px] bg-[#EBEBEB] rounded-lg  focus:outline-none"
              />
            </div>

            <button className="py-3 flex items-center justify-center w-full bg-gradient-to-t from-[#4B36CC] to-[#9C93D4] text-white rounded-lg text-lg p-2 mt-[22px] shadow-md">
              Login
            </button>
          </form>
        </div>

        {/* Create a new account */}
        <p className="text-[#606060] font-inter text-[20px] flex items-center justify-center w-full">
          Don’t have an account? Create a&nbsp;
          <Link href="/siginup" className="text-[#0054A1] cursor-pointer">
            new account.
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignInForm;
