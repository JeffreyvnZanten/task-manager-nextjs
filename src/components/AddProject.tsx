"use client";

import { createProjectAction } from "@/loginAction";
import useAddItem from "@/hooks/useAddItem";

export default function AddProject() {
  const { title, isCreating, createNewItem, handleChange, cancelCreating } =
    useAddItem({
      type: "Board",
    });

  const handleCreateProject = (title: string) => {
    createProjectAction(title);
    cancelCreating();
  };

  return (
    <div className="flex justify-center items-center">
      {isCreating ? (
        <div className="flex flex-col gap-[1em] bg-black p-[2em] rounded-md">
          <input
            type="text"
            value={title}
            onChange={handleChange}
            className="bg-gray-800 text-white p-2 rounded-md"
          />
          <div className="flex gap-[1em]">
            <button
              className="bg-blue-600 px-2 rounded-lg cursor-pointer w-full py-1"
              onClick={() => handleCreateProject(title)}
            >
              Add
            </button>
            <button
              className="bg-red-600 px-2 rounded-lg cursor-pointer w-full py-1"
              onClick={cancelCreating}
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <button
          className="bg-blue-400 px-2 rounded-2xl cursor-pointer w-[4em] h-[4em]"
          onClick={createNewItem}
        >
          +
        </button>
      )}
    </div>
  );
}
