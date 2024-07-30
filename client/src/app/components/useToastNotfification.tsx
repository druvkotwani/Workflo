// useToastNotification.ts

"use client";
import { useContext, useEffect } from "react";
import { toast } from "react-toastify";
import { ModalContext } from "../context/modalContext";

const UseToastNotification = () => {
  const { toastMessage, setToastMessage } = useContext(ModalContext);
  useEffect(() => {
    if (toastMessage) {
      toast(toastMessage);
      setToastMessage("");
    }
  }, []);
  return null;
};

export default UseToastNotification;
