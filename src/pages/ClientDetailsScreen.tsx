import HeaderRowWithBack from "@/components/HeaderRowWithBack";
import StatMiniCard from "@/components/StatMiniCard";
import InfoStrip from "@/components/InfoStrip";
import PrimaryButton from "@/components/PrimaryButton";
import BottomTabBar from "@/components/BottomTabBar";
import { CheckCircle, Hourglass, Clock, RefreshCw } from "lucide-react";

const activities = [
  { title: "E-khatha Certificate", date: "08 Apr 2025", status: "Completed" },
  { title: "Khatha Certificate", date: "06 Apr 2025", status: "On Going" },
  { title: "Khatha Extract", date: "05 Apr 2025", status: "Pending" },
  { title: "Tax Paid Receipt", date: "05 Apr 2025", status: "Pending" },
  { title: "Building Plan Approval", date: "05 Apr 2025", status: "Pending" },
  { title: "Assessment Book", date: "05 Apr 2025", status: "Pending" },
  { title: "Assessment Book", date: "05 Apr 2025", status: "Pending" },
];

const statusStyles: Record<string, string> = {
  Completed: "bg-green-100 text-green-700",
  "On Going": "bg-blue-100 text-blue-700",
  Pending: "bg-yellow-100 text-orange-600",
};

const ClientDetailsScreen = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex justify-center">
      <div className="w-full max-w-[420px] bg-white min-h-screen flex flex-col">
        <HeaderRowWithBack title="CL-541285" onBack={() => console.log("Back")} />

        <div className="flex-1 overflow-y-auto px-4 pb-24">
          {/* Documents label */}
          <p className="text-sm text-gray-700 font-medium mt-3 mb-2">Documents</p>

          {/* Stat cards */}
          <div className="flex gap-2">
            <StatMiniCard icon={CheckCircle} count={2} label="Completed" variant="completed" />
            <StatMiniCard icon={Hourglass} count={6} label="Ongoing" variant="ongoing" />
            <StatMiniCard icon={Clock} count={2} label="Pending" variant="pending" />
          </div>

          {/* Info strip */}
          <InfoStrip properties={4} tasks={10} />

          {/* Estimate button */}
          <div className="mt-3">
            <PrimaryButton label="Estimate" onClick={() => console.log("Estimate")} />
          </div>

          {/* Recent Activity */}
          <div className="flex items-center gap-2 mt-5 mb-2">
            <RefreshCw size={16} className="text-blue-600" />
            <span className="text-sm font-medium text-gray-800">Recent Activity List Of Kavya</span>
          </div>

          {/* Activity Table */}
          <div>
            <div className="grid grid-cols-[1fr_auto_auto] text-xs font-medium text-gray-600 bg-blue-50 px-3 py-2 rounded-t-md">
              <span>Document Title</span>
              <span className="w-24 text-center">Date</span>
              <span className="w-24 text-center">Status Badge</span>
            </div>
            {activities.map((a, i) => (
              <div
                key={i}
                onClick={() => console.log("Open document", a.title)}
                className="grid grid-cols-[1fr_auto_auto] items-center px-3 py-2.5 border-b border-gray-100 text-xs text-gray-700 cursor-pointer hover:bg-gray-50"
              >
                <span>{a.title}</span>
                <span className="w-24 text-center text-gray-500">{a.date}</span>
                <span className="w-24 flex justify-center">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusStyles[a.status]}`}>
                    {a.status}
                  </span>
                </span>
              </div>
            ))}
          </div>
        </div>

        <BottomTabBar defaultTab="Client" />
      </div>
    </div>
  );
};

export default ClientDetailsScreen;
