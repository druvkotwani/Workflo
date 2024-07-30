"use client";

import { useState, createContext, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

export interface Task {
  id: string;
  heading: string;
  description: string;
  priority: string;
  date: string;
  time: string;
  where: string;
}

const tempData = [
  {
    id: uuidv4(),
    heading: "Hire Dhruv as a Full Stack Developer",
    description:
      "Why? Because he is a great developer and a great person to work with. He may stuck sometimes but he never gives up.",
    priority: "Urgent",
    date: "2024-08-15",
    time: "1hr ago",
    where: "To do",
  },
  {
    id: uuidv4(),
    heading: "How much experience does Dhruv have?",
    description:
      "Dhruv has ~5 months (Internships) of experience in Frontend Development and he has build some amazing projects.",
    priority: "Medium",
    date: "2024-08-15",
    time: "1hr ago",
    where: "In progress",
  },
  {
    id: uuidv4(),
    heading: "What is Dhruv's current role?",
    description:
      "Dhruv is currently working as a Frontend Developer Intern @QuillAudits where he is working on some amazing projects.",
    priority: "Low",
    date: "2024-08-20",
    time: "2 days ago",
    where: "Under review",
  },
  {
    id: uuidv4(),
    heading: "What is Dhruv's future goal?",
    description:
      "Dhruv wants to become a Full Stack Developer and he is working hard to achieve his goal.",
    priority: "Not Selected",
    date: "2024-07-30",
    time: "4 days ago",
    where: "Finished",
  },
];

const fetchUserTasks = async (token: any) => {
  const response = await fetch(process.env.NEXT_PUBLIC_API_URL + "/tasks", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const tasks = await response.json();
  return tasks;
};

export const ModalContext = createContext({
  title: "",
  setTitle: (value: string) => {},
  showModal: false,
  setShowModal: (value: boolean) => {},
  status: "Not Selected",
  setStatus: (value: string) => {},
  data: tempData,
  setData: (value: any) => {},
  selectedTask: null as Task | null,
  setSelectedTask: (value: Task | null) => {},
  deleteTask: (id: string) => {},
  toastMessage: "",
  setToastMessage: (value: string) => {},
  username: "",
  setUsername: (value: string) => {},
  token: "",
  setToken: (value: string) => {},
});

export const ModalProvider = ({ children }: any) => {
  const [data, setData] = useState(tempData);
  const [title, setTitle] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [status, setStatus] = useState("Not Selected");
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [toastMessage, setToastMessage] = useState("");
  const [username, setUsername] = useState("");
  const [token, setToken] = useState("");

  const deleteTask = (id: string) => {
    setData((prev: any) => prev.filter((task: any) => task.id !== id));
  };

  useEffect(() => {
    if (token) {
      fetchUserTasks(token).then((userTasks) => {
        setData([...tempData, ...userTasks]);
      });
    }
  }, [token]);

  return (
    <ModalContext.Provider
      value={{
        title,
        setTitle,
        showModal,
        setShowModal,
        status,
        setStatus,
        data,
        setData,
        selectedTask,
        setSelectedTask,
        deleteTask,
        toastMessage,
        setToastMessage,
        username,
        setUsername,
        token,
        setToken,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};
