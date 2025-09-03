import { GetAllCardsByProjectId } from "@/db/cardRepository";
import { Project } from "@/types";
import Link from "next/link";
import SettingsButton from "./SettingsButton";
import { deleteProjectAction } from "@/loginAction";

type ProjectCardProps = {
  project: Project;
};

export default async function ProjectCard({ project }: ProjectCardProps) {
  const cardData = await GetAllCardsByProjectId(project.id);
  console.log("Card Data for project", project.id, ":", cardData);

  async function handleSettingsClick() {
    "use server";

    console.log("Settings clicked");
    if (project.id !== null) {
      deleteProjectAction(project.id);
    }
  }

  return (
    <div
      className="flex rounded-md min-h-[10em] 
    xl:min-w-[10em] lg:min-w-[12em] md:min-w-[4em] sm:min-w-[5em] 
    justify-center bg-black"
    >
      <div className="flex flex-row justify-between items-center w-full h-[3em]">
        <Link
          className="cursor-pointer w-full"
          href={`/projects/${project.id}`}
        >
          <h1 className="px-[1em] text-sm xl:text-md font-semibold text-wrap">
            {project.title} ({cardData.length})
          </h1>
        </Link>
        <SettingsButton onClick={handleSettingsClick} />
      </div>
    </div>
  );
}
