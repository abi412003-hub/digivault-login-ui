import { IdCard, Phone, Mail, MapPin } from "lucide-react";

const ClientInfoBlock = () => (
  <div className="flex items-start gap-4 px-4 py-4">
    <div className="w-20 h-20 rounded-full bg-gray-200 overflow-hidden flex-shrink-0">
      <img
        src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=160&h=160&fit=crop&crop=face"
        alt="Client"
        className="w-full h-full object-cover grayscale"
      />
    </div>
    <div className="flex flex-col gap-1.5 text-sm text-gray-700">
      <div className="flex items-center gap-2">
        <IdCard size={16} className="text-blue-600 flex-shrink-0" />
        <span>Client ID: CI564783</span>
      </div>
      <div className="flex items-center gap-2">
        <Phone size={16} className="text-blue-600 flex-shrink-0" />
        <span>90******83</span>
      </div>
      <div className="flex items-center gap-2">
        <Mail size={16} className="text-blue-600 flex-shrink-0" />
        <span>r******gmail.com</span>
      </div>
      <div className="flex items-start gap-2">
        <MapPin size={16} className="text-blue-600 flex-shrink-0 mt-0.5" />
        <span className="leading-tight">Malleshwaram Urban Bengaluru<br />Pinocode - 560001</span>
      </div>
    </div>
  </div>
);

export default ClientInfoBlock;
