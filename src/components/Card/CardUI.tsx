"use client";

function CardUI({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="flex flex-col rounded-md min-h-[10em] 
    xl:min-w-[10em] lg:min-w-[12em] md:min-w-[4em] sm:min-w-[5em] 
    bg-black p-2"
    >
      {children}
    </div>
  );
}

export default CardUI;
