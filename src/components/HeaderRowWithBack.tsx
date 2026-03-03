import { ChevronLeft, MessageSquare, Bell } from "lucide-react";

interface HeaderRowWithBackProps {
  title: string;
  onBack?: () => void;
}

const HeaderRowWithBack = ({ title, onBack }: HeaderRowWithBackProps) => (
  <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200">
    <div className="flex items-center gap-2">
      <button onClick={onBack} className="p-1 text-gray-800"><ChevronLeft size={22} /></button>
      <h1 className="text-lg font-medium text-gray-900">{title}</h1>
    </div>
    <div className="flex items-center gap-3">
      <button onClick={() => console.log("Messages")} className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center"><MessageSquare size={16} className="text-gray-600" /></button>
      <button onClick={() => console.log("Notifications")} className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center"><Bell size={16} className="text-gray-600" /></button>
      <div className="w-9 h-9 rounded-full bg-blue-700 flex items-center justify-center text-white text-xs font-semibold">KV</div>
    </div>
  </div>
);

export default HeaderRowWithBack;
