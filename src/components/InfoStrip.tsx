import { Landmark } from "lucide-react";

interface InfoStripProps {
  properties: number;
  tasks: number;
}

const InfoStrip = ({ properties, tasks }: InfoStripProps) => (
  <div className="bg-purple-50 rounded-xl p-3 mt-3 flex items-center justify-between">
    <div className="flex items-center gap-2">
      <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center">
        <Landmark size={16} className="text-purple-600" />
      </div>
      <span className="text-sm font-medium text-purple-700">{properties} Properties</span>
    </div>
    <span className="text-sm font-medium text-purple-700">{tasks} Tasks</span>
  </div>
);

export default InfoStrip;
