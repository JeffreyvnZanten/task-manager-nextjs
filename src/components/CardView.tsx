"use client";

import { type Card } from "@/types";
import TaskCard from "./TaskCard";
import AddItem from "./AddItem";

type CardViewProps = {
  cards: Card[];
  projectId: number;
  createTask: (title: string, projectId: number) => void;
};

function CardView({ cards, projectId, createTask }: CardViewProps) {
  return (
    <main className="flex justify-center py-[4em]">
      <div
        className="w-[80%] xl:w-[40%] lg:w-[60%] md:w-[80%]
        grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4
        gap-[1em] 2xl:gap-[2em] xl:gap-[2em] lg:gap-[2em] md:gap-[2em] items-center"
      >
        <AddItem
          type="Card"
          createItem={(title) => createTask(title, projectId)}
        />
        {cards.map((card) => (
          <TaskCard key={card.id} card={card} />
        ))}
      </div>
    </main>
  );
}

export default CardView;
