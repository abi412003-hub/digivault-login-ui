import { Settings } from "lucide-react";

const GearIllustration = () => (
  <div className="flex justify-center mt-8">
    <div className="relative w-20 h-16">
      <Settings size={48} className="text-blue-600 absolute bottom-0 left-0" />
      <Settings size={32} className="text-blue-700 absolute top-0 right-0" />
    </div>
  </div>
);

export default GearIllustration;
