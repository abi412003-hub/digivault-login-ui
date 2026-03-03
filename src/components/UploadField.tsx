import { Upload } from "lucide-react";

interface UploadFieldProps {
  label: string;
  onClick?: () => void;
}

const UploadField = ({ label, onClick }: UploadFieldProps) => (
  <div>
    <p className="text-sm font-medium text-blue-800 mb-1.5">{label}</p>
    <button
      type="button"
      onClick={onClick}
      className="w-full h-12 px-4 rounded-md border border-gray-400 bg-white flex items-center justify-between cursor-pointer hover:bg-gray-50 transition-colors"
    >
      <span className="text-gray-400 text-sm">Upload File</span>
      <Upload size={18} className="text-gray-500" />
    </button>
  </div>
);

export default UploadField;
