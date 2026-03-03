interface TextAreaFieldProps {
  label: string;
  value: string;
  onChange: (val: string) => void;
  placeholder?: string;
  error?: string;
}

const TextAreaField = ({ label, value, onChange, placeholder, error }: TextAreaFieldProps) => (
  <div>
    <label className="block text-sm text-gray-700 mb-1.5">{label}</label>
    <textarea
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      rows={3}
      className={`w-full px-4 py-3 rounded-lg border bg-white placeholder-gray-400 focus:ring-2 focus:ring-blue-200 focus:border-blue-500 outline-none resize-none ${
        error ? "border-red-400 text-red-600" : "border-gray-300 text-gray-700"
      }`}
    />
    {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
  </div>
);

export default TextAreaField;
