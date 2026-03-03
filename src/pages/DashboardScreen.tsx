import { RefreshCw } from "lucide-react";
import HeaderRow from "@/components/HeaderRow";
import DonutStat from "@/components/DonutStat";
import ProgressRow from "@/components/ProgressRow";
import ActivityTable from "@/components/ActivityTable";
import BottomTabBar from "@/components/BottomTabBar";

const DashboardScreen = () => (
  <div className="min-h-screen bg-gray-50 flex justify-center">
    <div className="w-full max-w-[420px] bg-white min-h-screen flex flex-col">
      <HeaderRow />

      <div className="flex-1 overflow-y-auto px-4 pb-4">
        {/* Clients Documents */}
        <div className="mt-4 rounded-xl shadow-md border border-gray-100 p-4">
          <h2 className="text-sm font-medium text-gray-800 mb-4">Clients Documents</h2>
          <div className="flex justify-around">
            <DonutStat value={28} total={140} label="Completed" color="#22c55e" trackColor="#dcfce7" />
            <DonutStat value={42} total={140} label="Pending" color="#f59e0b" trackColor="#fef3c7" />
            <DonutStat value={28} total={140} label="Rejected" color="#ef4444" trackColor="#fee2e2" />
          </div>
        </div>

        {/* Estimation */}
        <div className="mt-4 rounded-xl shadow-md border border-gray-100 p-4">
          <h2 className="text-sm font-medium text-gray-800 mb-4">Estimation</h2>
          <div className="flex flex-col gap-3">
            <ProgressRow label="Verified" value={50} total={100} color="#22c55e" trackColor="#dcfce7" />
            <ProgressRow label="Pending" value={34} total={100} color="#f59e0b" trackColor="#fef3c7" />
            <ProgressRow label="Rejected" value={16} total={100} color="#ef4444" trackColor="#fee2e2" />
          </div>
        </div>

        {/* Recent Activity */}
        <div className="mt-4">
          <div className="flex items-center gap-2 mb-3">
            <RefreshCw size={16} className="text-blue-600" />
            <span className="text-sm font-medium text-gray-800">Recent Activity List</span>
          </div>
          <ActivityTable />
        </div>
      </div>

      <BottomTabBar />
    </div>
  </div>
);

export default DashboardScreen;
