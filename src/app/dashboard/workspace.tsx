"use client";
import Image from "next/image";
import React, { useState } from "react";
import Button2 from "../components/Button2";
import List from "../components/List";
import { v4 as uuidv4 } from "uuid";
import dynamic from "next/dynamic";
import { ListProps } from "../components/List";

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

    heading: "Conduct User Feedback Survey",
    description: "Collect and analyze user feedback to improve app features.",
    priority: "Low",
    date: "2024-08-05",
    time: "3hr ago",
    where: "In progress",
  },
  {
    id: uuidv4(),

    heading: "Conduct User Feedback Survey",
    description: "Collect and analyze user feedback to improve app features.",
    priority: "Low",
    date: "2024-08-05",
    time: "3hr ago",
    where: "In progress",
  },
  {
    id: uuidv4(),

    heading: "Conduct User Feedback Survey",
    description: "Collect and analyze user feedback to improve app features.",
    priority: "Low",
    date: "2024-08-05",
    time: "3hr ago",
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

const col = ["To do", "In progress", "Under review", "Finished"];

type ColumnsState = {
  [key: string]: ListProps[];
};

const DragDropContext = dynamic(
  () => import("react-beautiful-dnd").then((mod) => mod.DragDropContext),
  { ssr: false }
);
const Droppable = dynamic(
  () => import("react-beautiful-dnd").then((mod) => mod.Droppable),
  { ssr: false }
);
const Draggable = dynamic(
  () => import("react-beautiful-dnd").then((mod) => mod.Draggable),
  { ssr: false }
);

const Workspace = () => {
  const [columns, setColumns] = useState<ColumnsState>({
    "To do": tempData.filter((item) => item.where === "To do"),
    "In progress": tempData.filter((item) => item.where === "In progress"),
    "Under review": tempData.filter((item) => item.where === "Under review"),
    Finished: tempData.filter((item) => item.where === "Finished"),
  });

  const onDragEnd = (result: any) => {
    const { source, destination } = result;
    if (!destination) return;

    const sourceColumn = source.droppableId;
    const destColumn = destination.droppableId;
    const sourceItems = [...columns[sourceColumn]];
    const destItems =
      sourceColumn === destColumn ? sourceItems : [...columns[destColumn]];
    const [removed] = sourceItems.splice(source.index, 1);
    destItems.splice(destination.index, 0, removed);

    setColumns({
      ...columns,
      [sourceColumn]: sourceItems,
      [destColumn]: destItems,
    });
  };
  return (
    <div
      className="mt-4 p-4 bg-white rounded-lg overflow-y-auto"
      style={{ maxHeight: "calc(100vh - 300px)" }}
    >
      <div className="grid grid-cols-4 gap-4 mb-4">
        {col.map((item: any, index: number) => (
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

      <DragDropContext onDragEnd={onDragEnd}>
        <div className="grid grid-cols-4 gap-4">
          {Object.entries(columns).map(([columnName, items]) => (
            <Droppable droppableId={columnName} key={columnName}>
              {(provided) => (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  className="flex flex-col gap-4"
                >
                  {items.map((item, index) => (
                    <Draggable
                      key={item.id}
                      draggableId={item.id}
                      index={index}
                    >
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          <List {...item} />
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                  <Button2 />
                </div>
              )}
            </Droppable>
          ))}
        </div>
      </DragDropContext>
    </div>
  );
};

export default Workspace;
