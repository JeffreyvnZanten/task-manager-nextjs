"use client";

import { useEffect, useState } from "react";

type AddButtonProps = {
  type: string;
  handleOnClick: () => void;
};

export default function AddButton({ type, handleOnClick }: AddButtonProps) {
  const [newProject, setNewProject] = useState("");
  const [isCreating, setIsCreating] = useState(false);

  const createNewProject = async () => {
    setIsCreating(true);
    setNewProject("New Project");
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setNewProject("");
        setIsCreating(false);
        window.removeEventListener("keydown", handleKeyDown);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
  }, [newProject]);

  return (
    <div className="flex justify-center items-center">
      {isCreating ? (
        <p>{newProject}...</p>
      ) : (
        <button
          className="bg-blue-400 px-2 rounded-2xl cursor-pointer w-[2em] h-[2em]"
          onClick={createNewProject}
        >
          +
        </button>
      )}
    </div>
  );
}
