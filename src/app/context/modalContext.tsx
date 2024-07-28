"use client";

import { useState, createContext } from "react";

export const ModalContext = createContext({
  title: "",
  setTitle: (value: string) => {},
  showModal: false,
  setShowModal: (value: boolean) => {},
  status: "Not Selected",
  setStatus: (value: string) => {},
  priority: "Not Selected",
  setPriority: (value: string) => {},
  deadline: "",
  setDeadline: (value: string) => {},
  description: "",
  setDescription: (value: string) => {},
  bigDescription: "",
  setBigDescription: (value: string) => {},
});

export const ModalProvider = ({ children }: any) => {
  const [title, setTitle] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [status, setStatus] = useState("Not Selected");
  const [priority, setPriority] = useState("Not Selected");
  const [deadline, setDeadline] = useState("");
  const [description, setDescription] = useState("");
  const [bigDescription, setBigDescription] = useState("");

  return (
    <ModalContext.Provider
      value={{
        title,
        setTitle,
        showModal,
        setShowModal,
        status,
        setStatus,
        priority,
        setPriority,
        deadline,
        setDeadline,
        description,
        setDescription,
        bigDescription,
        setBigDescription,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};
