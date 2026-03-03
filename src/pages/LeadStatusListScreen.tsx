import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/lib/AuthContext";
import { supabase } from "@/lib/supabase";
import HeaderRowWithBack from "@/components/HeaderRowWithBack";
import SearchInput from "@/components/SearchInput";
import SegmentedTabs from "@/components/SegmentedTabs";
import LeadCard from "@/components/LeadCard";
import BottomTabBar from "@/components/BottomTabBar";

const tabToStatus: Record<string, string[]> = {
  Approved: ["approved", "converted"],
  Pending: ["pending", "processing"],
  Rejected: ["rejected"],
};

const LeadStatusListScreen = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState("Pending");
  const [leads, setLeads] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) fetchLeads();
  }, [user, activeTab]);

  async function fetchLeads() {
    setLoading(true);
    const statuses = tabToStatus[activeTab] || [];

    const { data } = await supabase
      .from("leads")
      .select("id, name, phone, email, status, created_at")
      .eq("created_by", user!.id)
      .in("status", statuses)
      .order("created_at", { ascending: false })
      .limit(30);

    if (data) setLeads(data);
    setLoading(false);
  }

  const filtered = leads.filter((l) => {
    if (!search) return true;
    return l.name?.toLowerCase().includes(search.toLowerCase()) ||
      l.phone?.includes(search) ||
      l.email?.toLowerCase().includes(search.toLowerCase());
  });

  return (
    <div className="min-h-screen bg-gray-50 flex justify-center">
      <div className="w-full max-w-[420px] bg-white min-h-screen flex flex-col">
        <HeaderRowWithBack title="Lead Status" onBack={() => navigate("/lead-dashboard")} />

        <div className="px-4 mt-3">
          <SearchInput value={search} onChange={setSearch} />
        </div>

        <div className="mt-3">
          <SegmentedTabs tabs={["Approved", "Pending", "Rejected"]} defaultTab={activeTab} onTabChange={setActiveTab} />
        </div>

        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4 pb-24">
          {loading ? (
            <div className="flex items-center justify-center h-32">
              <div className="w-6 h-6 border-2 border-blue-700 border-t-transparent rounded-full animate-spin" />
            </div>
          ) : filtered.length === 0 ? (
            <p className="text-center text-sm text-gray-400 py-10">No leads found</p>
          ) : (
            filtered.map((l) => (
              <LeadCard
                key={l.id}
                leadId={`Lead-${l.id.substring(0, 6)}`}
                phone={l.phone ? l.phone.substring(0, 2) + "XXXXXX" + l.phone.substring(8) : ""}
                email={l.email || ""}
                date={new Date(l.created_at).toLocaleDateString("en-IN", { day: "2-digit", month: "2-digit", year: "numeric" })}
              />
            ))
          )}
        </div>

        <BottomTabBar defaultTab="Leads" />
      </div>
    </div>
  );
};

export default LeadStatusListScreen;
