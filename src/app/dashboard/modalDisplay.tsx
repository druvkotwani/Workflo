"use client";

import React, { useContext } from "react";
import Modal from "../components/Modal";
import { ModalContext } from "../context/modalContext";

const ModalDisplay = () => {
  const { showModal, setShowModal } = useContext(ModalContext);

  return (
    <div className="relative">
      {showModal && <Modal />}

      {/* Overlay */}

      {showModal && (
        <div
          className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50"
          onClick={() => setShowModal(false)}
        ></div>
      )}
    </div>
  );
};

export default ModalDisplay;
