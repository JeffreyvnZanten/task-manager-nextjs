import { GetAllCardsByProjectId } from "@/db/cardRepository";
import { Project } from "@/types";
import Link from "next/link";

type ProjectCardProps = {
  project: Project;
};

export default async function ProjectCard({ project }: ProjectCardProps) {
  const cardData = await GetAllCardsByProjectId(project.id);
  console.log("Card Data for project", project.id, ":", cardData);

  return (
    <Link
      className="flex rounded-md p-4 min-h-[10em] 
    xl:min-w-[10em] lg:min-w-[12em] md:min-w-[4em] sm:min-w-[5em] 
    justify-center items-center cursor-pointer bg-black"
      href={`/projects/${project.id}`}
    >
      <h2 className="text-sm xl:text-md font-semibold">
        {project.title} ({cardData.length})
      </h2>
    </Link>
  );
}
