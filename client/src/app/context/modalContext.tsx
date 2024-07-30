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
    heading: "Implement User Authentication",
    description:
      "Develop and integrate user authentication using email and password.",
    priority: "Urgent",
    date: "2024-08-15",
    time: "1hr ago",
    where: "To do",
  },
  {
    id: uuidv4(),
    heading: "Design Home Page UI",
    description:
      "Develop and integrate user authentication using email and password.",
    priority: "Medium",
    date: "2024-08-15",
    time: "1hr ago",
    where: "In progress",
  },
  {
    id: uuidv4(),
    heading: "Integrate Cloud Storage",
    description: "Enable cloud storage for note backup and synchronization.",
    priority: "Urgent",
    date: "2024-08-20",
    time: "2 days ago",
    where: "Under review",
  },
  {
    id: uuidv4(),
    heading: "Test Cross-browser Compatibility",
    description:
      "Ensure the app works seamlessly across different web browsers.",
    priority: "Medium",
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
