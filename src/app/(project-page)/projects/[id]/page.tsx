import CardView from "@/components/CardView";
import { GetAllTasksByProjectId } from "@/db/taskRepository";
import { auth } from "@/lib/auth";
import { createTaskAction } from "@/server-actions/taskActions";
import { headers } from "next/headers";

type PageProps = {
  params: {
    id: string;
  };
};

async function Page({ params }: PageProps) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return <div>Not authenticated</div>;
  }

  const { id } = params;
  const cards = await GetAllTasksByProjectId(Number(id));
  console.log("Cards for project", id, ":", cards);

  const createCard = async () => {
    "use server";

    console.log("Create card");
  };

  return (
    <CardView
      cards={cards}
      projectId={Number(id)}
      createTask={createTaskAction}
    />
  );
}

export default Page;
