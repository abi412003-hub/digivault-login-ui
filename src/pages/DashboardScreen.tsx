import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { RefreshCw } from "lucide-react";
import { useAuth } from "@/lib/AuthContext";
import { supabase } from "@/lib/supabase";
import HeaderRow from "@/components/HeaderRow";
import DonutStat from "@/components/DonutStat";
import ProgressRow from "@/components/ProgressRow";
import ActivityTable from "@/components/ActivityTable";
import BottomTabBar from "@/components/BottomTabBar";

interface DashStats {
  docsCompleted: number;
  docsPending: number;
  docsRejected: number;
  docsTotal: number;
  estVerified: number;
  estPending: number;
  estRejected: number;
  estTotal: number;
  recentActivities: { title: string; date: string; status: string }[];
}

const DashboardScreen = () => {
  const navigate = useNavigate();
  const { user, profile } = useAuth();
  const [stats, setStats] = useState<DashStats>({
    docsCompleted: 0, docsPending: 0, docsRejected: 0, docsTotal: 0,
    estVerified: 0, estPending: 0, estRejected: 0, estTotal: 0,
    recentActivities: [],
  });
  const [refreshing, setRefreshing] = useState(false);

  const loadStats = async () => {
    if (!user) return;
    setRefreshing(true);

    // Fetch document counts for assigned clients
    const { data: docs } = await supabase
      .from("documents")
      .select("id, status")
      .eq("uploaded_by", user.id);

    const docsArr = docs || [];
    const docsCompleted = docsArr.filter((d) => d.status === "verified").length;
    const docsPending = docsArr.filter((d) => d.status === "pending").length;
    const docsRejected = docsArr.filter((d) => d.status === "rejected").length;

    // Fetch estimates
    const { data: estimates } = await supabase
      .from("estimates")
      .select("id, status")
      .eq("created_by", user.id);

    const estArr = estimates || [];
    const estVerified = estArr.filter((e) => e.status === "approved").length;
    const estPending = estArr.filter((e) => ["draft", "submitted", "in_review"].includes(e.status)).length;
    const estRejected = estArr.filter((e) => e.status === "rejected").length;

    // Fetch recent activity (last 10 documents with updates)
    const { data: activities } = await supabase
      .from("documents")
      .select("file_name, updated_at, status")
      .eq("uploaded_by", user.id)
      .order("updated_at", { ascending: false })
      .limit(10);

    const recentActivities = (activities || []).map((a) => ({
      title: a.file_name || "Document",
      date: new Date(a.updated_at).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" }),
      status: a.status === "verified" ? "Completed" : a.status === "pending" ? "Pending" : a.status === "rejected" ? "Rejected" : "On Going",
    }));

    setStats({
      docsCompleted,
      docsPending,
      docsRejected,
      docsTotal: docsArr.length,
      estVerified,
      estPending,
      estRejected,
      estTotal: estArr.length,
      recentActivities,
    });

    setRefreshing(false);
  };

  useEffect(() => {
    loadStats();
  }, [user]);

  // If account not verified, show pending screen
  if (profile?.verification_status === "pending_verification") {
    return (
      <div className="min-h-screen bg-gray-50 flex justify-center">
        <div className="w-full max-w-[420px] bg-white min-h-screen flex flex-col items-center justify-center p-6">
          <div className="w-16 h-16 rounded-full bg-yellow-100 flex items-center justify-center mb-4">
            <RefreshCw size={28} className="text-yellow-600" />
          </div>
          <h2 className="text-lg font-semibold text-gray-800">Account Under Review</h2>
          <p className="text-sm text-gray-500 text-center mt-2">
            Your registration is being verified by our team. You'll be notified once approved.
          </p>
          <p className="text-xs text-gray-400 mt-4">
            Registration ID: {profile?.registration_id || "—"}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex justify-center">
      <div className="w-full max-w-[420px] bg-white min-h-screen flex flex-col">
        <HeaderRow />

        <div className="flex-1 overflow-y-auto px-4 pb-4">
          {/* Clients Documents */}
          <div className="mt-4 rounded-xl shadow-md border border-gray-100 p-4">
            <h2 className="text-sm font-medium text-gray-800 mb-4">Clients Documents</h2>
            <div className="flex justify-around">
              <DonutStat value={stats.docsCompleted} total={stats.docsTotal || 1} label="Completed" color="#22c55e" trackColor="#dcfce7" />
              <DonutStat value={stats.docsPending} total={stats.docsTotal || 1} label="Pending" color="#f59e0b" trackColor="#fef3c7" />
              <DonutStat value={stats.docsRejected} total={stats.docsTotal || 1} label="Rejected" color="#ef4444" trackColor="#fee2e2" />
            </div>
          </div>

          {/* Estimation */}
          <div className="mt-4 rounded-xl shadow-md border border-gray-100 p-4">
            <h2 className="text-sm font-medium text-gray-800 mb-4">Estimation</h2>
            <div className="flex flex-col gap-3">
              <ProgressRow label="Verified" value={stats.estVerified} total={stats.estTotal || 1} color="#22c55e" trackColor="#dcfce7" />
              <ProgressRow label="Pending" value={stats.estPending} total={stats.estTotal || 1} color="#f59e0b" trackColor="#fef3c7" />
              <ProgressRow label="Rejected" value={stats.estRejected} total={stats.estTotal || 1} color="#ef4444" trackColor="#fee2e2" />
            </div>
          </div>

          {/* Recent Activity */}
          <div className="mt-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <RefreshCw size={16} className="text-blue-600" />
                <span className="text-sm font-medium text-gray-800">Recent Activity List</span>
              </div>
              <button onClick={loadStats} disabled={refreshing}>
                <RefreshCw size={14} className={`text-gray-400 ${refreshing ? "animate-spin" : ""}`} />
              </button>
            </div>
            {stats.recentActivities.length > 0 ? (
              <ActivityTable activities={stats.recentActivities} />
            ) : (
              <div className="text-center py-8 text-sm text-gray-400">
                No recent activity yet
              </div>
            )}
          </div>
        </div>

        <BottomTabBar defaultTab="Home" />
      </div>
    </div>
  );
};

export default DashboardScreen;
