import { Tag } from "lucide-react";

interface ChipTagProps {
  amount: number;
  label: string;
}

const ChipTag = ({ amount, label }: ChipTagProps) => (
  <div className="bg-blue-50 border border-blue-100 rounded-lg px-3 py-2 flex flex-col items-center min-w-[70px]">
    <div className="flex items-center gap-1">
      <Tag size={12} className="text-gray-400" />
      <span className="text-xs font-medium text-gray-700">{amount}</span>
    </div>
    <span className="text-xs font-medium text-blue-700">{label}</span>
  </div>
);

export default ChipTag;
