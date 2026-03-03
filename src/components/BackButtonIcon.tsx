import { ChevronLeft } from "lucide-react";

const BackButtonIcon = ({ onClick }: { onClick?: () => void }) => (
  <button onClick={onClick} className="p-2 -ml-2 text-gray-800 hover:text-gray-600">
    <ChevronLeft size={24} />
  </button>
);

export default BackButtonIcon;
