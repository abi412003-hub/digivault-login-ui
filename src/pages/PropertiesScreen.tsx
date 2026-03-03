import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "@/lib/AuthContext";
import { supabase } from "@/lib/supabase";
import HeaderRowWithBack from "@/components/HeaderRowWithBack";
import SearchInput from "@/components/SearchInput";
import CountRow from "@/components/CountRow";
import PropertyCard from "@/components/PropertyCard";
import BottomTabBar from "@/components/BottomTabBar";

interface PropertyRow {
  id: string;
  name: string;
  project_id: string;
  address: string | null;
  latitude: number | null;
  longitude: number | null;
  photos: any;
}

const PropertiesScreen = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const clientId = searchParams.get("client");
  const { user } = useAuth();
  const [search, setSearch] = useState("");
  const [properties, setProperties] = useState<PropertyRow[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) fetchProperties();
  }, [user, clientId]);

  async function fetchProperties() {
    setLoading(true);
    // Fetch properties from assignments linked to this DP
    const { data, error } = await supabase
      .from("properties")
      .select("id, name, project_id, address, latitude, longitude, photos")
      .order("created_at", { ascending: false })
      .limit(50);

    if (!error && data) {
      setProperties(data as PropertyRow[]);
    }
    setLoading(false);
  }

  const filtered = properties.filter((p) => {
    if (!search) return true;
    return p.name.toLowerCase().includes(search.toLowerCase());
  });

  return (
    <div className="min-h-screen bg-gray-50 flex justify-center">
      <div className="w-full max-w-[420px] bg-white min-h-screen flex flex-col">
        <HeaderRowWithBack title="Properties" onBack={() => navigate(-1)} />

        <div className="px-4 mt-3">
          <SearchInput value={search} onChange={setSearch} />
        </div>

        <div className="px-4 mt-2">
          <CountRow count={filtered.length} label="Properties" />
        </div>

        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-5 pb-24">
          {loading ? (
            <div className="flex items-center justify-center h-32">
              <div className="w-6 h-6 border-2 border-blue-700 border-t-transparent rounded-full animate-spin" />
            </div>
          ) : filtered.length === 0 ? (
            <p className="text-center text-sm text-gray-400 py-10">No properties found</p>
          ) : (
            filtered.map((p) => (
              <div key={p.id} onClick={() => navigate(`/task-details?property=${p.id}`)}>
                <PropertyCard
                  name={p.name}
                  projectId={p.id.substring(0, 7).toUpperCase()}
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

export default PropertiesScreen;
