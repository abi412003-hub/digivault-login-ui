import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/lib/AuthContext";
import { supabase } from "@/lib/supabase";
import HeaderRowWithBack from "@/components/HeaderRowWithBack";
import SearchInput from "@/components/SearchInput";
import ClientCard from "@/components/ClientCard";
import BottomTabBar from "@/components/BottomTabBar";

interface ClientItem {
  id: string;
  client_id: string;
  full_name: string;
  profile_photo_url: string | null;
  incharge_id: string;
  progress: number;
  status: string;
}

const ClientsListScreen = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [clients, setClients] = useState<ClientItem[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      if (!user) return;

      // Fetch assignments where this DP is assigned
      const { data: assignments } = await supabase
        .from("assignments")
        .select("property_id, status")
        .eq("dp_id", user.id);

      if (!assignments || assignments.length === 0) {
        setLoading(false);
        return;
      }

      // Get unique property IDs -> fetch associated clients via services
      const propertyIds = [...new Set(assignments.map((a) => a.property_id))];

      const { data: services } = await supabase
        .from("services")
        .select("id, client_id, status")
        .in("property_id", propertyIds);

      if (!services || services.length === 0) {
        setLoading(false);
        return;
      }

      const clientIds = [...new Set(services.map((s) => s.client_id).filter(Boolean))];

      const { data: users } = await supabase
        .from("users")
        .select("id, client_id, full_name, profile_photo_url, reports_to, status")
        .in("id", clientIds);

      const clientList: ClientItem[] = (users || []).map((u) => {
        // Calculate progress from services for this client
        const clientServices = services.filter((s) => s.client_id === u.id);
        const completed = clientServices.filter((s) => s.status === "completed").length;
        const progress = clientServices.length > 0 ? Math.round((completed / clientServices.length) * 100) : 0;

        return {
          id: u.id,
          client_id: u.client_id || u.id.slice(0, 8).toUpperCase(),
          full_name: u.full_name,
          profile_photo_url: u.profile_photo_url,
          incharge_id: u.reports_to || "—",
          progress,
          status: u.status === "active" ? "Active" : u.status === "inactive" ? "On Hold" : "Pending",
        };
      });

      setClients(clientList);
      setLoading(false);
    };

    load();
  }, [user]);

  const filtered = clients.filter((c) =>
    !search ||
    c.full_name.toLowerCase().includes(search.toLowerCase()) ||
    c.client_id.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 flex justify-center">
      <div className="w-full max-w-[420px] bg-white min-h-screen flex flex-col">
        <HeaderRowWithBack title="Clients" onBack={() => navigate("/dashboard")} />

        <div className="px-4 mt-3">
          <SearchInput value={search} onChange={setSearch} placeholder="Search here" />
        </div>

        <div className="flex-1 overflow-y-auto px-4 pb-4 mt-3">
          {loading ? (
            <div className="flex justify-center py-12">
              <div className="w-6 h-6 border-2 border-blue-700 border-t-transparent rounded-full animate-spin" />
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-12 text-sm text-gray-400">
              {search ? "No clients match your search" : "No clients assigned yet"}
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              {filtered.map((c) => (
                <div key={c.id} onClick={() => navigate(`/client-details?id=${c.id}`)}>
                  <ClientCard
                    clientId={`Client ID : ${c.client_id}`}
                    inChargeId={`In-Charge : ${c.incharge_id}`}
                    progress={c.progress}
                    status={c.status}
                    photo={c.profile_photo_url}
                    name={c.full_name}
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        <BottomTabBar defaultTab="Client" />
      </div>
    </div>
  );
};

export default ClientsListScreen;
