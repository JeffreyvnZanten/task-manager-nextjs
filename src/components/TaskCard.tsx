"use client";

import CardHeader from "./Card/CardHeader";
import CardUI from "./Card/CardUI";
import CardMenu from "./Card/CardMenu";
import useSettingsMenu from "@/hooks/useSettingsMenu";
import { type Card } from "@/types";
import { startTransition, useEffect } from "react";
import { deleteTaskAction } from "@/server-actions/taskActions";

function TaskCard({ card }: { card: Card }) {
  const { isOpen, toggleMenu } = useSettingsMenu();

  const handleDeleteClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    console.log("Delete clicked for task:", card.id);
    startTransition(async () => {
      await deleteTaskAction(card.id);
    });
  };

  return (
    <CardUI>
      <CardHeader
        title={card.title}
        navigationLink="#"
        handleToggle={toggleMenu}
      />
      <div>
        {isOpen && <CardMenu type="Card" handleClick={handleDeleteClick} />}
      </div>
    </CardUI>
  );
}

export default TaskCard;
