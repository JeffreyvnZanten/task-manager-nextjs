"use client";

type ViewTabProps = {
  title: string;
  isActive: boolean;
  handleOnClick: () => void;
};

function ViewTab({ title, isActive, handleOnClick }: ViewTabProps) {
  return (
    <button
      className={`p-1 hover:opacity-70 border-1 cursor-pointer ${
        isActive ? "brightness-250 opacity-100" : "brightness-70 opacity-50"
      }`}
      onClick={handleOnClick}
    >
      {title}
    </button>
  );
}

export default ViewTab;
