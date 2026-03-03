import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Plus, Eye } from "lucide-react";
import { useAuth } from "@/lib/AuthContext";
import { supabase } from "@/lib/supabase";
import HeaderRowWithBack from "@/components/HeaderRowWithBack";
import StatusSummaryCard from "@/components/StatusSummaryCard";
import ActivityTable from "@/components/ActivityTable";
import BottomTabBar from "@/components/BottomTabBar";

const LeadDashboardScreen = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [counts, setCounts] = useState({ verified: 0, pending: 0, rejected: 0 });
  const [activities, setActivities] = useState<{ title: string; date: string; status: string }[]>([]);

  useEffect(() => {
    const load = async () => {
      if (!user) return;

      const { data: leads } = await supabase
        .from("leads")
        .select("id, name, status, created_at")
        .eq("created_by", user.id)
        .order("created_at", { ascending: false });

      const arr = leads || [];
      setCounts({
        verified: arr.filter((l) => l.status === "approved").length,
        pending: arr.filter((l) => l.status === "pending").length,
        rejected: arr.filter((l) => l.status === "rejected").length,
      });

      setActivities(
        arr.slice(0, 10).map((l) => ({
          title: l.name || "Lead",
          date: new Date(l.created_at).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" }),
          status: l.status === "approved" ? "Completed" : l.status === "rejected" ? "Rejected" : "Pending",
        }))
      );
    };
    load();
  }, [user]);

  return (
    <div className="min-h-screen bg-gray-50 flex justify-center">
      <div className="w-full max-w-[420px] bg-white min-h-screen flex flex-col">
        <HeaderRowWithBack title="Lead" onBack={() => navigate("/dashboard")} />

        <div className="flex-1 overflow-y-auto px-4 pb-4">
          {/* Status Summary */}
          <div className="mt-4">
            <p className="text-xs text-gray-500 mb-2">Status Summary Cards Of Leads</p>
            <StatusSummaryCard verified={counts.verified} pending={counts.pending} rejected={counts.rejected} />
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 mt-4">
            <button
              onClick={() => navigate("/lead-add")}
              className="flex-1 flex items-center justify-center gap-2 bg-blue-700 text-white rounded-lg py-3 text-sm font-medium"
            >
              <Plus size={16} /> Add new Leads
            </button>
            <button
              onClick={() => navigate("/lead-status")}
              className="flex-1 flex items-center justify-center gap-2 border border-gray-300 rounded-lg py-3 text-sm font-medium text-gray-700"
            >
              Leads Report <Eye size={16} />
            </button>
          </div>

          {/* Recent Activity */}
          <div className="mt-5">
            <p className="text-sm font-medium text-gray-800 mb-2">Recent Activity List</p>
            {activities.length > 0 ? (
              <ActivityTable activities={activities} />
            ) : (
              <p className="text-center text-sm text-gray-400 py-6">No leads yet. Add your first lead!</p>
            )}
          </div>
        </div>

        <BottomTabBar defaultTab="Leads" />
      </div>
    </div>
  );
};

export default LeadDashboardScreen;
