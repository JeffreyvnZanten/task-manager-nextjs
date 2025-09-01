import { useEffect, useState } from "react";

type ItemType = "Board" | "Card";

export default function useAddItem({ type }: { type: ItemType }) {
  const [title, setTitle] = useState("New " + type);
  const [isCreating, setIsCreating] = useState(false);

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        cancel();
        window.removeEventListener("keydown", handleEscape);
      }
    };

    window.addEventListener("keydown", handleEscape);
  }, [isCreating]);

  const createNewItem = async () => {
    setIsCreating(true);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const cancel = () => {
    setIsCreating(false);
    setTitle("New " + type);
  };

  return {
    title,
    isCreating,
    createNewItem,
    handleChange,
    cancel,
  };
}
