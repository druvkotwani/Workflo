//Form Component / Reusable Component for Signin and Signup Page
"use client";
import Image from "next/image";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Link from "next/link";
import React, { useContext, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { ModalContext } from "../context/modalContext";

function validCredentials(
  email: string,
  password: string,
  name: string,
  pathname: string
) {
  if (pathname === "/signup") {
    return email.length > 0 && password.length > 0 && name.length > 0;
  } else {
    return email.length > 0 && password.length > 0;
  }
}

const Form = () => {
  const { setToastMessage, setUsername, setToken } = useContext(ModalContext);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const pathname = usePathname();

  const router = useRouter();

  const handleEmailChange = async (event: React.FormEvent) => {
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement);
    const name = formData.get("name");
    const email = formData.get("email");
    const password = formData.get("password");

    const url =
      pathname === "/signup"
        ? "http://localhost:8000/signup"
        : "http://localhost:8000/signin";

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(
          pathname === "/signup"
            ? { name, email, password }
            : { email, password }
        ),
      });

      if (response.ok) {
        if (pathname === "/signup") {
          setToastMessage("😌 User created successfully");
          router.push("/signin");
        } else {
          const data = await response.json();
          setToastMessage("✈️ Sign-in successful");
          setToken(data.token);
          localStorage.setItem("token", data.token);
          setUsername(data.name);
          router.push("/dashboard");
        }
      } else {
        const data = await response.json();
        toast(data.message);
      }
    } catch (error) {
      toast("⚠️ Error: " + error);
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
            <form className="flex flex-col " onSubmit={handleEmailChange}>
              <div className="flex flex-col gap-6 font-inter">
                {pathname === "/signup" && (
                  <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    type="text"
                    name="name"
                    placeholder="Full name"
                    className=" py-4 px-3 font-inter text-[#606060] text-[20px] bg-[#EBEBEB] rounded-lg  focus:outline-none"
                  />
                )}
                <input
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  name="email"
                  placeholder="Your Email"
                  className={`py-4 px-3 text-[#606060] font-inter text-[20px] bg-[#EBEBEB] rounded-lg focus:outline-none `}
                />

                <div className="relative w-full">
                  <input
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    type={passwordVisible ? "text" : "password"}
                    placeholder="Password"
                    name="password"
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

              <button
                disabled={
                  validCredentials(email, password, name, pathname || "") ===
                  false
                }
                className=" mt-[22px] shadow-md bg-gradient-to-t from-[#4B36CC] to-[#9C93D4] p-[1.5px] rounded-lg"
              >
                <div
                  className={`py-3 flex items-center justify-center w-full text-white rounded-lg text-lg p-2 ${
                    validCredentials(email, password, name, pathname || "") ===
                    true
                      ? "bg-gradient-to-t from-[#4C38C2] to-[#2F2188] "
                      : " "
                  }   `}
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
