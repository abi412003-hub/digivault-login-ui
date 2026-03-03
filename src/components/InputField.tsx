import { User } from "lucide-react";

interface InputFieldProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

const InputField = ({ value, onChange, placeholder = "9812546586" }: InputFieldProps) => {
  return (
    <div className="flex items-center h-12 rounded-lg border border-gray-300 bg-white px-3 gap-2">
      <User className="text-gray-400 shrink-0" size={20} />
      <input
        type="tel"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full outline-none text-gray-700 placeholder-gray-400 bg-transparent"
      />
    </div>
  );
};

export default InputField;
