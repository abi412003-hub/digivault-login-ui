import { ChevronDown } from "lucide-react";

interface SelectFieldProps {
  label: string;
  value: string;
  onChange: (val: string) => void;
  options: string[];
  error?: string;
}

const SelectField = ({ label, value, onChange, options, error }: SelectFieldProps) => (
  <div>
    <label className="block text-sm text-gray-700 mb-1.5">{label}</label>
    <div className="relative">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`w-full h-12 px-4 pr-10 rounded-lg border bg-white appearance-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500 outline-none ${
          error ? "border-red-400 text-red-600" : "border-gray-300 text-gray-700"
        } ${!value ? "text-gray-400" : ""}`}
      >
        <option value="">Select {label.replace(" *", "")}</option>
        {options.map((opt) => (
          <option key={opt} value={opt}>{opt}</option>
        ))}
      </select>
      <ChevronDown size={18} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
    </div>
    {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
  </div>
);

export default SelectField;
