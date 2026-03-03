import { ChevronLeft } from "lucide-react";

interface ScreenHeaderProps {
  title: string;
  subtitle: string;
  onBack?: () => void;
}

const ScreenHeader = ({ title, subtitle, onBack }: ScreenHeaderProps) => (
  <div className="flex items-center gap-2 pt-4">
    <button onClick={onBack} className="p-1 text-gray-800">
      <ChevronLeft size={24} />
    </button>
    <div className="flex-1 text-center pr-8">
      <h1 className="text-xl font-semibold text-gray-900">{title}</h1>
      <p className="text-sm text-gray-500 mt-0.5">{subtitle}</p>
    </div>
  </div>
);

export default ScreenHeader;
