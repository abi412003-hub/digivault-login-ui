import { Pencil } from "lucide-react";

interface ExpensePillProps {
  label: string;
  amount: number;
  onEdit: () => void;
}

const ExpensePill = ({ label, amount, onEdit }: ExpensePillProps) => (
  <div className="flex items-center justify-between bg-blue-50 rounded-full px-5 py-3">
    <span className="text-sm font-medium text-blue-600">{label}</span>
    <div className="flex items-center gap-3">
      <span className="text-sm font-medium text-gray-800">{amount}</span>
      <button onClick={onEdit}>
        <Pencil size={16} className="text-blue-600" />
      </button>
    </div>
  </div>
);

export default ExpensePill;
