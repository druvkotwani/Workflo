import Image from "next/image";
import React from "react";
import Button2 from "../components/Button2";
import List from "../components/List";

const tempData = [
  {
    heading: "Implement User Authentication",
    description:
      "Develop and integrate user authentication using email and password.",
    priority: "Urgent",
    date: "2024-08-15",
    time: "1hr ago",
    where: "To do",
  },
  {
    heading: "Design Home Page UI",
    description:
      "Develop and integrate user authentication using email and password.",
    priority: "Medium",
    date: "2024-08-15",
    time: "1hr ago",
    where: "In progress",
  },
  {
    heading: "Conduct User Feedback Survey",
    description: "Collect and analyze user feedback to improve app features.",
    priority: "Low",
    date: "2024-08-05",
    time: "3hr ago",
    where: "In progress",
  },
  {
    heading: "Conduct User Feedback Survey",
    description: "Collect and analyze user feedback to improve app features.",
    priority: "Low",
    date: "2024-08-05",
    time: "3hr ago",
    where: "In progress",
  },
  {
    heading: "Conduct User Feedback Survey",
    description: "Collect and analyze user feedback to improve app features.",
    priority: "Low",
    date: "2024-08-05",
    time: "3hr ago",
    where: "In progress",
  },
  {
    heading: "Integrate Cloud Storage",
    description: "Enable cloud storage for note backup and synchronization.",
    priority: "Urgent",
    date: "2024-08-20",
    time: "2 days ago",
    where: "Under review",
  },
  {
    heading: "Test Cross-browser Compatibility",
    description:
      "Ensure the app works seamlessly across different web browsers.",
    priority: "Medium",
    date: "2024-07-30",
    time: "4 days ago",
    where: "Finished",
  },
];

const columns = ["To do", "In progress", "Under review", "Finished"];

const Workspace = () => {
  return (
    <div
      className="mt-4 p-4 bg-white rounded-lg overflow-y-auto"
      style={{ maxHeight: "59vh" }}
    >
      <div className="grid grid-cols-4 gap-4 mb-4">
        {columns.map((item, index) => (
          <div key={index} className="flex justify-between">
            <p className="text-[#555555] text-[20px]">{item}</p>
            <Image
              src="/assets/dashboard/workspace/sort.svg"
              alt="Arrow"
              width={24}
              height={24}
            />
          </div>
        ))}
      </div>

      <div className="grid grid-cols-4 gap-4">
        {columns.map((columnName, columnIndex) => (
          <div key={columnIndex} className="flex flex-col gap-4">
            {tempData
              .filter((item) => item.where === columnName)
              .map((item, itemIndex) => (
                <List key={itemIndex} {...item} />
              ))}
            <Button2 />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Workspace;
