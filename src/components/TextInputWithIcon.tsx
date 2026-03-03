import { LucideIcon } from "lucide-react";

interface TextInputWithIconProps {
  icon: LucideIcon;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: string;
}

const TextInputWithIcon = ({ icon: Icon, value, onChange, placeholder, type = "text" }: TextInputWithIconProps) => (
  <div className="flex items-center h-12 rounded-lg border border-gray-300 bg-white px-3 gap-2">
    <Icon className="text-gray-400 shrink-0" size={20} />
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="w-full outline-none text-gray-700 placeholder-gray-400 bg-transparent"
    />
  </div>
);

export default TextInputWithIcon;
