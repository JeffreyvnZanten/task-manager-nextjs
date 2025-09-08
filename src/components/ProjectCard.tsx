"use client";

import { Card, Project } from "@/types";
import { useEffect, useState } from "react";
import { getAllTasksAction } from "@/server-actions/taskActions";
import { deleteProjectAction } from "@/server-actions/projectActions";
import { useTransition } from "react";
import CardUI from "./Card/CardUI";
import CardHeader from "./Card/CardHeader";
import useSettingsMenu from "@/hooks/useSettingsMenu";
import CardMenu from "./Card/CardMenu";

type ProjectCardProps = {
  project: Project;
};

export default function ProjectCard({ project }: ProjectCardProps) {
  const [cards, setCards] = useState<Card[]>([]);
  const [, startTransition] = useTransition();
  const { isOpen, toggleMenu } = useSettingsMenu();

  useEffect(() => {
    async function fetchCards() {
      const fetchedCards = await getAllTasksAction(project.id);
      setCards(fetchedCards);
    }
    fetchCards();
  }, []);

  const handleDeleteClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    console.log("Delete clicked for project:", project.id);
    startTransition(async () => {
      await deleteProjectAction(project.id);
    });
  };

  return (
    <CardUI>
      <CardHeader
        title={project.title}
        navigationLink={`/projects/${project.id}`}
        cardCount={cards.length}
        handleToggle={toggleMenu}
      />
      <div>
        {isOpen && <CardMenu type="Project" handleClick={handleDeleteClick} />}
      </div>
    </CardUI>
  );
}
