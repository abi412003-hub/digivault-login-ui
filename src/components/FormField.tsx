interface FormFieldProps {
  label: string;
  value: string;
  onChange: (val: string) => void;
  placeholder?: string;
}

const FormField = ({ label, value, onChange, placeholder }: FormFieldProps) => (
  <div>
    <label className="block text-sm text-gray-700 mb-1.5">{label}</label>
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="w-full h-12 px-4 rounded-lg border border-gray-300 bg-white text-gray-700 placeholder-gray-400 focus:ring-2 focus:ring-blue-200 focus:border-blue-500 outline-none"
    />
  </div>
);

export default FormField;
