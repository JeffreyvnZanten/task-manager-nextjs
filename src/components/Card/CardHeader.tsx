import Link from "next/link";
import SettingsButton from "../SettingsButton";

`use client`;

export type CardHeaderProps = {
  title: string;
  navigationLink: string;
  cardCount?: number;
  handleToggle: () => void;
};

function CardHeader({
  title,
  navigationLink,
  cardCount,
  handleToggle,
}: CardHeaderProps) {
  return (
    <div className="flex flex-row justify-between items-center w-full h-[10%]">
      <Link className="cursor-pointer w-full" href={navigationLink}>
        <h1 className="px-2 text-sm xl:text-md font-semibold text-wrap overflow-hidden">
          {title} {cardCount !== undefined && `(${cardCount})`}
        </h1>
      </Link>
      <SettingsButton toggleSettingsMenu={handleToggle} />
    </div>
  );
}

export default CardHeader;
