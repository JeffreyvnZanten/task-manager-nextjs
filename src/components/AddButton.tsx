type AddButtonProps = {
  type: string;
  handleOnClick: () => void;
};

export default function AddButton({ type, handleOnClick }: AddButtonProps) {
  return (
    <button
      className="bg-blue-400 px-2 rounded-2xl cursor-pointer"
      onClick={handleOnClick}
    >
      +
    </button>
  );
}
