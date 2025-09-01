import { GetAllCardsByProjectId } from "@/db/cardRepository";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

type PageProps = {
  params: {
    id: string;
  };
};

export default async function Page({ params }: PageProps) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return <div>Not authenticated</div>;
  }

  const { id } = params;
  const cards = await GetAllCardsByProjectId(Number(id));
  console.log("Cards for project", id, ":", cards);

  return (
    <div className="flex col gap-[2em] p-[2em]">
      {cards.map((card) => (
        <div className="border bg-gray-800 w-[10em] p-4" key={card.id}>
          <h2>{card.title}</h2>
        </div>
      ))}
    </div>
  );
}
