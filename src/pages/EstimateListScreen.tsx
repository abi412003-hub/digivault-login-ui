import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "@/lib/AuthContext";
import { supabase } from "@/lib/supabase";
import HeaderRowWithBack from "@/components/HeaderRowWithBack";
import SearchInput from "@/components/SearchInput";
import SegmentedTabs from "@/components/SegmentedTabs";
import EstimateCard from "@/components/EstimateCard";
import BottomTabBar from "@/components/BottomTabBar";

const tabToStatuses: Record<string, string[]> = {
  Approved: ["approved", "incharge_approved", "rm_approved", "sh_approved"],
  Assigned: ["draft", "submitted", "incharge_pending", "rm_pending", "sh_pending", "accountant_pending"],
  Rejected: ["rejected", "incharge_rejected", "rm_rejected", "sh_rejected"],
};

interface EstimateRow {
  id: string;
  status: string;
  total_amount: number | null;
  created_at: string;
  service_requests: {
    main_service: string;
    properties: {
      name: string;
      photos: any;
    } | null;
  } | null;
}

const EstimateListScreen = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { user } = useAuth();
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState("Approved");
  const [estimates, setEstimates] = useState<EstimateRow[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) fetchEstimates();
  }, [user, activeTab]);

  async function fetchEstimates() {
    setLoading(true);
    const statuses = tabToStatuses[activeTab] || [];
    
    const { data, error } = await supabase
      .from("estimates")
      .select(`
        id, status, total_amount, created_at,
        service_requests!inner (
          main_service,
          properties ( name, photos )
        )
      `)
      .in("status", statuses)
      .eq("created_by", user!.id)
      .order("created_at", { ascending: false })
      .limit(20);

    if (!error && data) {
      setEstimates(data as any);
    }
    setLoading(false);
  }

  const statusLabel = (s: string) => {
    if (s.includes("approved")) return "Approved";
    if (s.includes("rejected")) return "Rejected";
    if (s.includes("pending")) return "Pending For Approval";
    if (s === "draft") return "Not Started";
    if (s === "submitted") return "Submitted";
    return s;
  };

  const statusColor = (s: string) => {
    if (s.includes("approved")) return "text-green-600";
    if (s.includes("rejected")) return "text-red-500";
    if (s.includes("pending")) return "text-orange-500";
    return "text-red-500";
  };

  const filtered = estimates.filter((e) => {
    if (!search) return true;
    const svc = (e.service_requests as any)?.main_service || "";
    const prop = (e.service_requests as any)?.properties?.name || "";
    return svc.toLowerCase().includes(search.toLowerCase()) || prop.toLowerCase().includes(search.toLowerCase());
  });

  return (
    <div className="min-h-screen bg-gray-50 flex justify-center">
      <div className="w-full max-w-[420px] bg-white min-h-screen flex flex-col">
        <HeaderRowWithBack title="Estimate" onBack={() => navigate(-1)} />

        <div className="px-4 mt-3">
          <SearchInput value={search} onChange={setSearch} />
        </div>

        <div className="mt-3">
          <SegmentedTabs tabs={["Approved", "Assigned", "Rejected"]} defaultTab={activeTab} onTabChange={setActiveTab} />
        </div>

        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4 pb-24">
          {loading ? (
            <div className="flex items-center justify-center h-32">
              <div className="w-6 h-6 border-2 border-blue-700 border-t-transparent rounded-full animate-spin" />
            </div>
          ) : filtered.length === 0 ? (
            <p className="text-center text-sm text-gray-400 py-10">No estimates found</p>
          ) : (
            filtered.map((e) => (
              <div key={e.id} onClick={() => navigate(`/estimate-start?id=${e.id}`)}>
                <EstimateCard
                  name={(e.service_requests as any)?.properties?.name || "Property"}
                  propertyId={e.id.substring(0, 10).toUpperCase()}
                  service={(e.service_requests as any)?.main_service || "Service"}
                  date={new Date(e.created_at).toLocaleDateString("en-IN", { day: "2-digit", month: "2-digit", year: "numeric" })}
                  status={statusLabel(e.status)}
                  statusColor={statusColor(e.status)}
                  image={(e.service_requests as any)?.properties?.photos?.[0] || ""}
                />
              </div>
            ))
          )}
        </div>

        <BottomTabBar defaultTab="Client" />
      </div>
    </div>
  );
};

export default EstimateListScreen;
