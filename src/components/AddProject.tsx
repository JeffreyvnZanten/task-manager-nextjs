"use client";

import useAddItem from "@/hooks/useAddItem";

export default function AddProject() {
  const { title, isCreating, createNewItem, handleChange, cancel } = useAddItem(
    {
      type: "Board",
    }
  );

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
              className="bg-blue-400 px-2 rounded-lg cursor-pointer w-full py-1"
              onClick={() => {}}
            >
              Create
            </button>
            <button
              className="bg-red-400 px-2 rounded-lg cursor-pointer w-full py-1"
              onClick={cancel}
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
