"use client";
import Image from "next/image";
import React, { useContext, useEffect, useState } from "react";
import Button2 from "../components/Button2";
import List from "../components/List";
import { v4 as uuidv4 } from "uuid";
import dynamic from "next/dynamic";
import { ListProps } from "../components/List";
import { ModalContext, Task } from "../context/modalContext";
import { toast, ToastContainer } from "react-toastify";

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
  const {
    setShowModal,
    setStatus,
    data,
    setSelectedTask,
    selectedTask,
    toastMessage,
    token,
  } = useContext(ModalContext);
  const [columns, setColumns] = useState<ColumnsState>({
    "To do": [],
    "In progress": [],
    "Under review": [],
    Finished: [],
  });

  useEffect(() => {
    setColumns({
      "To do": data.filter((item) => item.where === "To do"),
      "In progress": data.filter((item) => item.where === "In progress"),
      "Under review": data.filter((item) => item.where === "Under review"),
      Finished: data.filter((item) => item.where === "Finished"),
    });
  }, [data]);

  useEffect(() => {
    if (toastMessage) {
      toast(toastMessage);
    }
  }, [toastMessage]);

  const updateTaskStatus = async (task: ListProps, newStatus: string) => {
    try {
      const response = await fetch(
        process.env.NEXT_PUBLIC_API_URL + `/tasks/${task.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ task: { ...task, where: newStatus } }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update task status");
      }

      const result = await response.json();
      console.log("Task status updated:", result);
    } catch (error) {
      console.error("Error updating task status:", error);
    }
  };

  const onDragEnd = async (result: any) => {
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

    // Update task status on the backend
    await updateTaskStatus(removed, destColumn);
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
              className="cursor-pointer"
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
                          <List
                            {...item}
                            onClick={() => (
                              setSelectedTask(item as Task),
                              setStatus(columnName),
                              setShowModal(true)
                            )}
                          />
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                  <Button2
                    onClick={() => (setShowModal(true), setStatus(columnName))}
                  />
                </div>
              )}
            </Droppable>
          ))}
        </div>
      </DragDropContext>

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
    </div>
  );
};

export default Workspace;
