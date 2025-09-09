"use client";

import useAddItem from "@/hooks/useAddItem";

type AddItemProps = {
  type: "Board" | "Card";
  createItem: (title: string) => void;
};

function AddItem({ type, createItem }: AddItemProps) {
  const { isCreating, title, handleChange, createNewItem, cancelCreating } =
    useAddItem({ type });

  function handleCreate() {
    createItem(title);
    cancelCreating();
  }

  return (
    <div className="flex justify-center items-center">
      {isCreating ? (
        <div className="flex flex-col gap-[1em] bg-black p-[1em] rounded-md w-full">
          <input
            type="text"
            value={title}
            onChange={handleChange}
            className="bg-gray-800 text-white p-2 text-sm rounded-md"
          />
          <div className="flex gap-[1em]">
            <button
              className="bg-blue-600 px-2 rounded-lg cursor-pointer w-full py-1"
              onClick={handleCreate}
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
          className="bg-blue-400 px-2 rounded-2xl cursor-pointer w-[3em] h-[3em]"
          onClick={createNewItem}
        >
          +
        </button>
      )}
    </div>
  );
}

export default AddItem;
