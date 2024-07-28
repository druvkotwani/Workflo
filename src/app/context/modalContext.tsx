"use client";

import { useState, createContext } from "react";

export const ModalContext = createContext({
  showModal: false,
  setShowModal: (value: boolean) => {},
});

export const ModalProvider = ({ children }: any) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <ModalContext.Provider value={{ showModal, setShowModal }}>
      {children}
    </ModalContext.Provider>
  );
};
