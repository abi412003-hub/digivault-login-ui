interface CheckboxRowProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label: string;
}

const CheckboxRow = ({ checked, onChange, label }: CheckboxRowProps) => (
  <label className="flex items-start gap-2 cursor-pointer">
    <input
      type="checkbox"
      checked={checked}
      onChange={(e) => onChange(e.target.checked)}
      className="mt-0.5 h-4 w-4 shrink-0 rounded border-gray-300 accent-blue-700"
    />
    <span className="text-sm text-gray-600">{label}</span>
  </label>
);

export default CheckboxRow;
