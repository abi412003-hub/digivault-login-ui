import { LucideIcon } from "lucide-react";

interface ChoiceCardProps {
  icon: LucideIcon;
  label: string;
  onClick?: () => void;
}

const ChoiceCard = ({ icon: Icon, label, onClick }: ChoiceCardProps) => (
  <button
    onClick={onClick}
    className="w-36 h-24 rounded-lg flex flex-col items-center justify-center gap-2 cursor-pointer hover:bg-blue-200/60 active:scale-[0.98] transition-all"
    style={{ backgroundColor: "#E6ECFF" }}
  >
    <Icon size={28} className="text-blue-900" />
    <span className="text-sm font-medium text-blue-900">{label}</span>
  </button>
);

export default ChoiceCard;
