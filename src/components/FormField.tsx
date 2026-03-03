interface FormFieldProps {
  label: string;
  value: string;
  onChange: (val: string) => void;
  placeholder?: string;
  error?: string;
  disabled?: boolean;
  type?: string;
}

const FormField = ({ label, value, onChange, placeholder, error, disabled = false, type = "text" }: FormFieldProps) => (
  <div>
    <label className="block text-sm text-gray-700 mb-1.5">{label}</label>
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      disabled={disabled}
      className={`w-full h-12 px-4 rounded-lg border bg-white placeholder-gray-400 focus:ring-2 focus:ring-blue-200 focus:border-blue-500 outline-none ${
        error ? "border-red-400 text-red-600" : "border-gray-300 text-gray-700"
      } ${disabled ? "bg-gray-100 opacity-60 cursor-not-allowed" : ""}`}
    />
    {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
  </div>
);

export default FormField;
