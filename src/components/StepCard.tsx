import { Pencil, Clock } from "lucide-react";
import ChipTag from "@/components/ChipTag";

interface StepCardProps {
  step: number;
  duration: string;
  chips: { amount: number; label: string }[];
  description: string[];
}

const StepCard = ({ step, duration, chips, description }: StepCardProps) => (
  <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-4">
    <div className="flex items-start justify-between mb-3">
      <div className="flex items-center gap-2">
        <span className="text-base font-bold text-gray-900">Step {step}</span>
        <button onClick={() => console.log("Edit step", step)} className="flex items-center gap-1 text-blue-600 text-xs">
          <Pencil size={12} /> Edit
        </button>
      </div>
      <div className="flex items-center gap-1 text-blue-600 text-xs font-medium">
        <Clock size={14} /> {duration}
      </div>
    </div>
    <div className="flex gap-2 mb-3">
      {chips.map((c, i) => (
        <ChipTag key={i} amount={c.amount} label={c.label} />
      ))}
    </div>
    {description.map((line, i) => (
      <p key={i} className="text-sm text-gray-500 leading-relaxed">{line}</p>
    ))}
  </div>
);

export default StepCard;
