import HeaderRowWithBack from "@/components/HeaderRowWithBack";
import StatusSummaryCard from "@/components/StatusSummaryCard";
import ActivityTable from "@/components/ActivityTable";
import BottomTabBar from "@/components/BottomTabBar";
import { BarChart3, CheckCircle, XCircle, Clock, RefreshCw, Plus, Eye } from "lucide-react";

const LeadDashboardScreen = () => (
  <div className="min-h-screen bg-gray-50 flex justify-center">
    <div className="w-full max-w-[420px] bg-white min-h-screen flex flex-col">
      <HeaderRowWithBack title="Lead" onBack={() => console.log("Back")} />

      <div className="flex-1 overflow-y-auto px-4 pb-24">
        {/* Section header */}
        <div className="flex items-center gap-2 mt-3 pb-2 border-b border-gray-200">
          <BarChart3 size={16} className="text-gray-500" />
          <span className="text-sm font-medium text-gray-700">Status Summary Cards Of Leads</span>
        </div>

        {/* Summary cards */}
        <div className="flex gap-3 mt-3">
          <StatusSummaryCard icon={CheckCircle} label="Verified" count={4} variant="verified" />
          <StatusSummaryCard icon={XCircle} label="Rejected" count={4} variant="rejected" />
        </div>
        <div className="flex justify-center mt-3 mb-3">
          <div className="w-1/2">
            <StatusSummaryCard icon={Clock} label="Pending" count={12} variant="pending" />
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex gap-3 mt-2 mb-4">
          <button onClick={() => console.log("Add new leads")} className="flex items-center gap-2 bg-blue-700 text-white rounded-md px-5 py-3 text-sm font-medium shadow-md">
            Add new Leads <Plus size={16} />
          </button>
          <button onClick={() => console.log("Leads report")} className="flex items-center gap-2 bg-white border border-gray-200 text-blue-600 rounded-md px-5 py-3 text-sm font-medium shadow-md">
            Leads Report <Eye size={16} />
          </button>
        </div>

        {/* Recent Activity */}
        <div className="flex items-center gap-2 mb-2">
          <RefreshCw size={16} className="text-blue-600" />
          <span className="text-sm font-medium text-gray-800">Recent Activity List</span>
        </div>

        <ActivityTable />
      </div>

      <BottomTabBar defaultTab="Leads" />
    </div>
  </div>
);

export default LeadDashboardScreen;
