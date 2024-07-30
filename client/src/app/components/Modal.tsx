"use client";

import Image from "next/image";
import { useContext, useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { v4 as uuidv4 } from "uuid";
import { ModalContext } from "../context/modalContext";
import styles from "./Modal.module.css";
const tempData = [
  {
    name: "Status",
    icon: "status.svg",
  },
  {
    name: "Priority",
    icon: "priority.svg",
  },
  {
    name: "Deadline",
    icon: "date.svg",
  },
  {
    name: "Description",
    icon: "edit.svg",
  },
];

function validTitleAndStatus(title: string, status: string) {
  return title.length > 0 && status !== "Not Selected";
}

const Modal = () => {
  const {
    setShowModal,
    status,
    setStatus,
    setData,
    data,
    selectedTask,
    setSelectedTask,
    deleteTask,
    token,
    setToastMessage,
  } = useContext(ModalContext);
  const [title, setTitle] = useState(selectedTask?.heading || "");

  const titleMissing = () => toast("👻 Plz fill both Title and Status");

  const [priority, setPriorityLocal] = useState("Not Selected");
  const [deadline, setDeadlineLocal] = useState("");
  const [description, setDescriptionLocal] = useState("");
  const [mainDescription, setMainDescription] = useState("");

  useEffect(() => {
    if (selectedTask) {
      setTitle(selectedTask.heading);
      setPriorityLocal(selectedTask.priority);
      setDeadlineLocal(selectedTask.date);
      setDescriptionLocal(selectedTask.description);
    }
  }, [selectedTask]);

  const handleSubmit = async () => {
    if (!validTitleAndStatus(title, status)) {
      titleMissing();
      return;
    }

    const updatedTask = {
      id: selectedTask ? selectedTask.id : uuidv4(),
      heading: title,
      description,
      priority,
      date: deadline,
      time: new Date().toLocaleTimeString(),
      where: status,
    };

    if (selectedTask) {
      // Update existing task
      setData((prev: any) =>
        prev.map((task: any) =>
          task.id === updatedTask.id ? updatedTask : task
        )
      );

      // Send updated task to backend
      try {
        const response = await fetch(
          process.env.NEXT_PUBLIC_API_URL + `/tasks/${updatedTask.id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ task: updatedTask }),
          }
        );

        if (!response.ok) {
          throw new Error("Failed to update task");
        }

        const result = await response.json();

        console.log("Task updated:", result);
      } catch (error) {
        console.error("Error updating task:", error);
        toast.error("Failed to update task");
      }
    } else {
      // Add new task
      setData((prev: any) => [updatedTask, ...prev]);

      // Send new task to backend
      try {
        const response = await fetch(
          process.env.NEXT_PUBLIC_API_URL + "/tasks",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ task: updatedTask }),
          }
        );

        if (!response.ok) {
          throw new Error("Failed to create task");
        }

        const result = await response.json();

        console.log("Task created:", result);
      } catch (error) {
        console.error("Error creating task:", error);
        toast.error("Failed to create task");
      }
    }
    setToastMessage("✅ Task saved successfully");
    setShowModal(false);
    setSelectedTask(null);
  };

  const handleDelete = async () => {
    if (selectedTask) {
      // Delete task from backend
      try {
        const response = await fetch(
          process.env.NEXT_PUBLIC_API_URL + `/tasks/${selectedTask.id}`,
          {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to delete task");
        }

        // Delete task from frontend
        setData((prev: any) =>
          prev.filter((task: any) => task.id !== selectedTask.id)
        );

        console.log("Task deleted:", selectedTask.id);
      } catch (error) {
        console.error("Error deleting task:", error);
        toast.error("Failed to delete task");
      }
    }
    selectedTask && deleteTask(selectedTask.id), setShowModal(false);
    setSelectedTask(null);
  };
  return (
    <>
      <div
        data-aos="fade-left"
        data-aos-offset="200"
        data-aos-easing="ease-in-out"
        data-aos-duration="400"
        className="h-screen absolute right-0 top-0 z-10 bg-white min-w-[670px] pt-4 flex flex-col gap-8 px-6"
      >
        {/* Div */}
        <div className="flex flex-col gap-[27px]">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <Image
                src="/assets/dashboard/modal/close.svg"
                alt="Close"
                width={24}
                height={24}
                onClick={() => (setShowModal(false), setSelectedTask(null))}
                className="cursor-pointer"
              />
              <Image
                src="/assets/dashboard/modal/zoom.svg"
                alt="Big"
                width={24}
                height={24}
                className="cursor-pointer"
              />
            </div>
            <div className="flex items-center gap-4">
              <div
                onClick={handleSubmit}
                className="cursor-pointer p-2 flex gap-[14px] bg-[#F4F4F4] rounded font-inter text-base text-[#797979]"
              >
                Save
                <Image
                  src="/assets/dashboard/modal/save.svg"
                  alt="Save"
                  width={24}
                  height={24}
                />
              </div>
              <div
                onClick={handleDelete}
                className="cursor-pointer p-2 flex gap-[14px] bg-[#F4F4F4] rounded font-inter text-base text-[#797979]"
              >
                Delete
                <Image
                  src="/assets/dashboard/modal/delete.svg"
                  alt="Delete"
                  width={24}
                  height={24}
                />
              </div>
              <div className="cursor-pointer p-2 flex gap-[14px] bg-[#F4F4F4] rounded font-inter text-base text-[#797979]">
                Share
                <Image
                  src="/assets/dashboard/modal/share.svg"
                  alt="Share"
                  width={24}
                  height={24}
                />
              </div>
              <div className="p-2 cursor-pointer flex gap-[14px] bg-[#F4F4F4] rounded font-inter text-base text-[#797979]">
                Favourite
                <Image
                  src="/assets/dashboard/modal/favourite.svg"
                  alt="Favourite"
                  width={24}
                  height={24}
                />
              </div>
            </div>
          </div>

          {/* Data */}
          <div className="flex flex-col gap-[38px]">
            <div className="flex flex-col gap-8 items-start justify-center">
              <input
                type="text"
                onChange={(e) => setTitle(e.target.value)}
                value={title}
                placeholder="Title"
                className={`text-5xl font-barlow font-semibold focus:outline-none ${styles["input-placeholder"]} ${styles["input-text"]}`}
              />

              <div className="flex gap-[60px] w-full">
                <div className="flex flex-col gap-8">
                  {tempData.map((item: any, index: number) => (
                    <div key={index} className="flex gap-6">
                      <Image
                        src={`/assets/dashboard/modal/${item.icon}`}
                        alt={item.name}
                        width={24}
                        height={24}
                      />
                      <span className="font-inter text-base text-[#666666]">
                        {item.name}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="flex flex-col gap-8 w-full ">
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    className={`max-w-[150px] text-base font-inter rounded focus:outline-none ${styles.customSelect}`}
                  >
                    <option
                      className="text-[#C1BDBD] font-inter text-base"
                      value="Not Selected"
                      disabled
                      selected
                      hidden
                    >
                      Not Selected
                    </option>
                    {["To do", "In progress", "Under review", "Finished"].map(
                      (item, index) => (
                        <option key={index} value={item}>
                          {item}
                        </option>
                      )
                    )}
                  </select>

                  <select
                    value={priority}
                    onChange={(e) => setPriorityLocal(e.target.value)}
                    className={`max-w-[150px] text-base font-inter rounded focus:outline-none ${styles.customSelect}`}
                  >
                    <option
                      className="text-[#C1BDBD] font-inter text-base"
                      value="Not Selected"
                      disabled
                      selected
                      hidden
                    >
                      Not Selected
                    </option>
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="Urgent">Urgent</option>
                  </select>

                  <input
                    value={deadline}
                    onChange={(e) => setDeadlineLocal(e.target.value)}
                    type="date"
                    className={`w-full max-w-[150px] text-base font-inter rounded focus:outline-none  ${styles.customSelect}`}
                  />

                  <input
                    placeholder="Description"
                    value={description}
                    onChange={(e) => setDescriptionLocal(e.target.value)}
                    className={`text-base  font-inter  rounded focus:outline-none ${styles["input-placeholder"]}  ${styles["input-text-2"]}`}
                  />
                </div>
              </div>
            </div>
            <div className="flex gap-[23px] cursor-pointer">
              <Image
                src="/assets/dashboard/modal/add.svg"
                alt="add"
                width={24}
                height={24}
              />
              <span className="font-inter text-base text-[#000000]">
                Add custom property
              </span>
            </div>
          </div>
        </div>

        {/* Seperation */}
        <div className="border-t w-full h-[1.5px] border-[#DEDEDE]"></div>

        {/* Start writing, or drag your own files here. */}

        <input
          value={mainDescription}
          onChange={(e) => setMainDescription(e.target.value)}
          type="text"
          placeholder="Start writing, or drag your own files here."
          className={`text-base font-inter  focus:outline-none ${styles["input-placeholder"]} ${styles["input-text-2"]}`}
        />
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

export default Modal;
