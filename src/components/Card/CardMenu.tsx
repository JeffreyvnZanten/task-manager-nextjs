"use client";
import { MouseEvent } from "react";

type CardMenuProps = {
  handleClick: (e: MouseEvent<HTMLDivElement>) => void;
  type: string;
};

function CardMenu({ handleClick, type }: CardMenuProps) {
  return (
    <div className="w-full justify-end flex flex-row" onClick={handleClick}>
      <div className="cursor-pointer text-[12px] bg-gray-900 border-1 text-center py-2 hover:bg-red-600 w-[60%]">
        Delete {type}
      </div>
    </div>
  );
}

export default CardMenu;
