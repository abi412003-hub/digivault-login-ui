import { ChevronLeft } from "lucide-react";

interface TopTitleBarProps {
  title: string;
  onBack?: () => void;
}

const TopTitleBar = ({ title, onBack }: TopTitleBarProps) => (
  <div className="flex items-center pt-4">
    <button onClick={onBack} className="p-1 text-gray-800">
      <ChevronLeft size={24} />
    </button>
    <h1 className="flex-1 text-center text-xl font-semibold text-gray-900 pr-8">{title}</h1>
  </div>
);

export default TopTitleBar;
