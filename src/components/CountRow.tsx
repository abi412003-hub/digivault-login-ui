import { Landmark } from "lucide-react";

interface CountRowProps {
  count: number;
  label: string;
}

const CountRow = ({ count, label }: CountRowProps) => (
  <div className="flex items-center gap-2 py-3 border-b border-gray-200">
    <Landmark size={20} className="text-gray-600" />
    <span className="text-lg font-semibold">
      <span className="text-blue-600">{count}</span>{" "}
      <span className="text-gray-800">{label}</span>
    </span>
  </div>
);

export default CountRow;
