import { FileText } from "lucide-react";

const PdfThumbCard = () => (
  <div className="w-28 h-32 rounded-xl bg-gray-100 flex flex-col items-center justify-center shadow-sm">
    <div className="w-14 h-14 rounded-lg border-2 border-red-500 flex items-center justify-center mb-1">
      <FileText size={28} className="text-red-500" />
    </div>
    <span className="text-xs font-bold text-red-500">PDF</span>
  </div>
);

export default PdfThumbCard;
