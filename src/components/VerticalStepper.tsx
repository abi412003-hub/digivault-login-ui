import { Eye } from "lucide-react";

interface StepData {
  label: string;
  subtitle: string;
}

interface VerticalStepperProps {
  steps?: StepData[];
  allView?: boolean;
}

const defaultSteps: StepData[] = [
  { label: "Step 1", subtitle: "Online Application" },
  { label: "Step 2", subtitle: "BBMP ARO Office" },
  { label: "Step 3", subtitle: "RI" },
  { label: "Step 4", subtitle: "Case Worker" },
];

const VerticalStepper = ({ steps = defaultSteps, allView = false }: VerticalStepperProps) => (
  <div className="relative pl-6 mt-4">
    <div className="absolute left-[13px] top-2 bottom-2 w-0.5 bg-blue-400" />
    <div className="space-y-6">
      {steps.map((step, i) => (
        <div key={i} className="relative flex items-center justify-between">
          <div className="absolute -left-6 w-7 h-7 rounded-full border-2 border-blue-500 bg-white flex items-center justify-center z-10">
            <div className="w-3 h-3 rounded-full bg-blue-600" />
          </div>
          <div>
            <p className="text-sm font-medium text-green-600">{step.label}</p>
            <p className="text-xs text-gray-400">{step.subtitle}</p>
          </div>
          <button
            onClick={() => console.log("View step", i + 1)}
            className="flex items-center gap-1.5 bg-white rounded-lg shadow-md px-4 py-2 text-blue-600 text-sm font-medium"
          >
            View <Eye size={16} />
          </button>
        </div>
      ))}
    </div>
  </div>
);

export default VerticalStepper;
