import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/lib/AuthContext";
import { supabase } from "@/lib/supabase";
import HeaderRowWithBack from "@/components/HeaderRowWithBack";
import SegmentedTabs4 from "@/components/SegmentedTabs4";
import RequestStatusCard from "@/components/RequestStatusCard";
import BottomTabBar from "@/components/BottomTabBar";

const tabToStatus: Record<string, string[]> = {
  Request: [],
  Pending: ["pending"],
  Approved: ["approved", "disbursed"],
  Rejected: ["rejected"],
};

const RequestPendingListScreen = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("Pending");
  const [requests, setRequests] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) fetchRequests();
  }, [user, activeTab]);

  async function fetchRequests() {
    if (activeTab === "Request") {
      navigate("/request-form");
      return;
    }
    setLoading(true);
    const statuses = tabToStatus[activeTab] || [];

    const { data } = await supabase
      .from("fund_requests")
      .select("id, client_id, job_id, amount, status, created_at")
      .eq("requested_by", user!.id)
      .in("status", statuses)
      .order("created_at", { ascending: false })
      .limit(30);

    if (data) setRequests(data);
    setLoading(false);
  }

  const statusLabel = (s: string) => {
    if (s === "pending") return "Pending for Approval";
    if (s === "approved") return "Approved";
    if (s === "disbursed") return "Disbursed";
    if (s === "rejected") return "Rejected";
    return s;
  };

  return (
    <div className="min-h-screen bg-gray-50 flex justify-center">
      <div className="w-full max-w-[420px] bg-white min-h-screen flex flex-col">
        <HeaderRowWithBack title="Request" onBack={() => navigate("/payments")} />

        <div className="mt-3">
          <SegmentedTabs4
            tabs={["Request", "Pending", "Approved", "Rejected"]}
            defaultTab={activeTab}
            onTabChange={setActiveTab}
          />
        </div>

        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4 pb-24">
          {loading ? (
            <div className="flex items-center justify-center h-32">
              <div className="w-6 h-6 border-2 border-blue-700 border-t-transparent rounded-full animate-spin" />
            </div>
          ) : requests.length === 0 ? (
            <p className="text-center text-sm text-gray-400 py-10">No requests found</p>
          ) : (
            requests.map((r) => (
              <RequestStatusCard
                key={r.id}
                id={r.client_id || r.id.substring(0, 10).toUpperCase()}
                progress={r.status === "approved" ? 100 : r.status === "pending" ? 70 : 0}
                status={statusLabel(r.status)}
              />
            ))
          )}
        </div>

        <BottomTabBar defaultTab="Transactions" />
      </div>
    </div>
  );
};

export default RequestPendingListScreen;
