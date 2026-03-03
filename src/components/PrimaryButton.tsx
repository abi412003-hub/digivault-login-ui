interface PrimaryButtonProps {
  label: string;
  onClick: () => void;
  disabled?: boolean;
}

const PrimaryButton = ({ label, onClick, disabled = false }: PrimaryButtonProps) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="w-full h-12 rounded-lg bg-blue-700 text-white font-medium hover:bg-blue-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {label}
    </button>
  );
};

export default PrimaryButton;
