import { Upload, Eye, XCircle } from "lucide-react";

interface UploadFieldProps {
  label: string;
  onClick?: () => void;
  onPreview?: () => void;
  onNotAvailable?: () => void;
}

const UploadField = ({ label, onClick, onPreview, onNotAvailable }: UploadFieldProps) => (
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
    <div className="flex gap-2 mt-2">
      <button
        type="button"
        onClick={onPreview}
        className="flex-1 h-9 rounded-md border border-blue-600 text-blue-700 bg-blue-50 flex items-center justify-center gap-1.5 text-xs font-medium hover:bg-blue-100 transition-colors"
      >
        <Eye size={14} />
        Preview
      </button>
      <button
        type="button"
        onClick={onNotAvailable}
        className="flex-1 h-9 rounded-md border border-red-400 text-red-600 bg-red-50 flex items-center justify-center gap-1.5 text-xs font-medium hover:bg-red-100 transition-colors"
      >
        <XCircle size={14} />
        Not Available
      </button>
    </div>
  </div>
);

export default UploadField;
