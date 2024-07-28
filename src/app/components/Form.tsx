//Form Component / Reusable Component for Signin and Signup Page
"use client";
import Image from "next/image";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Link from "next/link";
import React, { useState } from "react";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";

function vaildEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function validCredentials(
  email: string,
  password: string,
  name: string,
  pathname: string
) {
  if (pathname === "/signup") {
    return vaildEmail(email) && password.length >= 8 && name.length > 0;
  } else {
    return vaildEmail(email);
  }
}

const Form = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const pathname = usePathname();
  const emailWrong = () => toast("⚠️ Email is not valid!");
  const passwordShort = () => toast("🥷 Password is too short!");

  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [isEmailValid, setIsEmailValid] = useState(true);

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const emailValue = e.target.value;
    setEmail(emailValue);
    setIsEmailValid(vaildEmail(emailValue));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isEmailValid === false) {
      emailWrong();
      return;
    }
    if (pathname === "/signup" && password.length < 8) {
      passwordShort();
      return;
    } else if (pathname === "/signup" && name.length === 0) {
      toast("🤡 Name is required!");
      return;
    }
    // if (validPassword(password) === false) {
    //   passwordShort();
    //   return;
    // }
    setIsEmailValid(true);
    setPassword("");
    setEmail("");
    setName("");
    // pathname === "/signup" ? signUp() : "";

    // Redirect to sign-in page after successful sign-up
    if (pathname === "/signup") {
      router.push("/signin");
    }
  };

  return (
    <>
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
            <form className="flex flex-col " onSubmit={handleSubmit}>
              <div className="flex flex-col gap-6 font-inter">
                {pathname === "/signup" && (
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Full name"
                    className=" py-4 px-3 font-inter text-[#606060] text-[20px] bg-[#EBEBEB] rounded-lg  focus:outline-none"
                  />
                )}
                <input
                  type="text"
                  value={email}
                  onChange={handleEmailChange}
                  placeholder="Your Email"
                  className={`py-4 px-3 text-[#606060] font-inter text-[20px] bg-[#EBEBEB] rounded-lg focus:outline-none `}
                />

                <div className="relative w-full">
                  <input
                    type={passwordVisible ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    className=" py-4 px-3 font-inter text-[#606060] w-full text-[20px] bg-[#EBEBEB] rounded-lg  focus:outline-none"
                  />
                  {/* Toggle Visibility for Password */}
                  <Image
                    onClick={() => setPasswordVisible(!passwordVisible)}
                    src={`/assets/${
                      passwordVisible ? "eye-closed" : "eye"
                    }.svg`}
                    alt="eye"
                    width={24}
                    height={24}
                    className="absolute cursor-pointer  -translate-y-1/2 top-1/2 transform right-4 "
                  />
                </div>
              </div>

              <button className=" mt-[22px] shadow-md bg-gradient-to-t from-[#4B36CC] to-[#9C93D4] p-[1.5px] rounded-lg">
                <div
                  className={`py-3 flex items-center justify-center w-full ${
                    validCredentials(email, password, name, pathname) === true
                      ? "bg-gradient-to-t from-[#4C38C2] to-[#2F2188] "
                      : " "
                  } text-white rounded-lg text-lg p-2  `}
                >
                  {pathname === "/signup" ? "Sign Up" : "Login"}
                </div>
              </button>
            </form>
          </div>

          {/* Create a new account for Signin Page */}
          {pathname === "/signin" && (
            <p className="text-[#606060] font-inter text-[20px] flex items-center justify-center w-full">
              Don’t have an account? Create a&nbsp;
              <Link href="/signup" className="text-[#0054A1] cursor-pointer">
                new account.
              </Link>
            </p>
          )}

          {/* Already have an account for Signup Page */}
          {pathname === "/signup" && (
            <p className="text-[#606060] font-inter text-[20px] flex items-center justify-center w-full">
              Already have an account?&nbsp;
              <Link href="/signin" className="text-[#0054A1] cursor-pointer">
                Log in.
              </Link>
            </p>
          )}
        </div>
      </div>
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </>
  );
};

export default Form;
