import AddButton from "@/components/AddButton";
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

  const createCard = async () => {
    "use server";

    console.log("Create card");
  };

  return (
    <main className="flex justify-center py-[4em]">
      <div
        className="w-[80%] xl:w-[40%] lg:w-[60%] md:w-[80%]
        grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4
        gap-[1em] 2xl:gap-[2em] xl:gap-[2em] lg:gap-[2em] md:gap-[2em] items-center"
      >
        <AddButton type="Card" handleOnClick={createCard} />
        {cards.map((card) => (
          <div className="border bg-gray-800 w-[10em] p-4" key={card.id}>
            <h2>{card.title}</h2>
          </div>
        ))}
      </div>
    </main>
  );
}
