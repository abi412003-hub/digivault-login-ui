interface PrimaryButtonProps {
  label: string;
  onClick: () => void;
}

const PrimaryButton = ({ label, onClick }: PrimaryButtonProps) => {
  return (
    <button
      onClick={onClick}
      className="w-full h-12 rounded-lg bg-blue-700 text-white font-medium hover:bg-blue-800 transition-colors"
    >
      {label}
    </button>
  );
};

export default PrimaryButton;
