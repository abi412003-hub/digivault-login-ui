interface TextAreaFieldProps {
  label: string;
  value: string;
  onChange: (val: string) => void;
  placeholder?: string;
}

const TextAreaField = ({ label, value, onChange, placeholder }: TextAreaFieldProps) => (
  <div>
    <label className="block text-sm text-gray-700 mb-1.5">{label}</label>
    <textarea
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      rows={3}
      className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-white text-gray-700 placeholder-gray-400 focus:ring-2 focus:ring-blue-200 focus:border-blue-500 outline-none resize-none"
    />
  </div>
);

export default TextAreaField;
