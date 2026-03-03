import { Search } from "lucide-react";

interface SearchInputProps {
  value: string;
  onChange: (val: string) => void;
}

const SearchInput = ({ value, onChange }: SearchInputProps) => (
  <div className="relative">
    <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-500" />
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder="Search here"
      className="w-full h-11 pl-10 pr-4 rounded-lg border border-gray-200 bg-white text-sm text-gray-700 placeholder-gray-400 outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500"
    />
  </div>
);

export default SearchInput;
