import { MapPin, Camera, Info, Wrench } from "lucide-react";

interface PropertyCardProps {
  name: string;
  projectId: string;
}

const actions = [
  { label: "Locate", icon: MapPin },
  { label: "Photos", icon: Camera },
  { label: "Details", icon: Info },
  { label: "Task", icon: Wrench },
];

const PropertyCard = ({ name, projectId }: PropertyCardProps) => (
  <div className="bg-blue-50/60 rounded-2xl p-4 shadow-sm">
    <div className="flex flex-col items-center gap-1 mb-3">
      <div className="text-3xl">🏢</div>
      <h3 className="text-base font-bold text-gray-900">{name}</h3>
      <p className="text-xs text-gray-400">Project ID -{projectId}</p>
    </div>
    <div className="bg-white rounded-xl shadow-sm py-3 flex justify-around">
      {actions.map(({ label, icon: Icon }) => (
        <button
          key={label}
          onClick={() => console.log(label, name)}
          className="flex flex-col items-center gap-1 text-blue-600"
        >
          <Icon size={20} />
          <span className="text-[11px] font-medium">{label}</span>
        </button>
      ))}
    </div>
  </div>
);

export default PropertyCard;
