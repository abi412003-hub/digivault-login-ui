import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "@/lib/AuthContext";
import { supabase } from "@/lib/supabase";
import HeaderRowWithBack from "@/components/HeaderRowWithBack";
import StatMiniCard from "@/components/StatMiniCard";
import InfoStrip from "@/components/InfoStrip";
import PrimaryButton from "@/components/PrimaryButton";
import BottomTabBar from "@/components/BottomTabBar";
import { CheckCircle, Hourglass, Clock, RefreshCw } from "lucide-react";

interface Activity {
  title: string;
  date: string;
  status: string;
}

const statusStyles: Record<string, string> = {
  Completed: "bg-green-100 text-green-700",
  completed: "bg-green-100 text-green-700",
  "On Going": "bg-blue-100 text-blue-700",
  in_progress: "bg-blue-100 text-blue-700",
  Pending: "bg-yellow-100 text-orange-600",
  pending: "bg-yellow-100 text-orange-600",
};

const ClientDetailsScreen = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const clientId = searchParams.get("id");
  const { user } = useAuth();

  const [loading, setLoading] = useState(true);
  const [clientName, setClientName] = useState("");
  const [clientDisplayId, setClientDisplayId] = useState("");
  const [stats, setStats] = useState({ completed: 0, ongoing: 0, pending: 0 });
  const [propertyCount, setPropertyCount] = useState(0);
  const [taskCount, setTaskCount] = useState(0);
  const [activities, setActivities] = useState<Activity[]>([]);

  useEffect(() => {
    if (clientId && user) fetchClientDetails();
  }, [clientId, user]);

  async function fetchClientDetails() {
    setLoading(true);

    // Fetch client info
    const { data: clientData } = await supabase
      .from("users")
      .select("full_name, client_id")
      .eq("id", clientId)
      .maybeSingle();

    if (clientData) {
      setClientName(clientData.full_name || "");
      setClientDisplayId(clientData.client_id || clientId?.substring(0, 8) || "");
    }

    // Fetch service requests for this client's properties
    const { data: services } = await supabase
      .from("service_requests")
      .select("id, status, main_service, updated_at, property_id")
      .order("updated_at", { ascending: false });

    if (services) {
      const completed = services.filter((s) => s.status === "completed").length;
      const ongoing = services.filter((s) => s.status === "in_progress").length;
      const pending = services.filter((s) => s.status === "pending").length;
      setStats({ completed, ongoing, pending });
      setTaskCount(services.length);

      // Map to activities
      const mapped: Activity[] = services.slice(0, 10).map((s) => ({
        title: s.main_service || "Service",
        date: s.updated_at ? new Date(s.updated_at).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" }) : "",
        status: s.status === "completed" ? "Completed" : s.status === "in_progress" ? "On Going" : "Pending",
      }));
      setActivities(mapped);

      // Count unique properties
      const uniqueProps = new Set(services.map((s) => s.property_id).filter(Boolean));
      setPropertyCount(uniqueProps.size);
    }

    setLoading(false);
  }

  const displayLabel = (s: string) => s.charAt(0).toUpperCase() + s.slice(1).replace(/_/g, " ");

  return (
    <div className="min-h-screen bg-gray-50 flex justify-center">
      <div className="w-full max-w-[420px] bg-white min-h-screen flex flex-col">
        <HeaderRowWithBack title={clientDisplayId || "Client"} onBack={() => navigate("/clients")} />

        <div className="flex-1 overflow-y-auto px-4 pb-24">
          {loading ? (
            <div className="flex items-center justify-center h-40">
              <div className="w-6 h-6 border-2 border-blue-700 border-t-transparent rounded-full animate-spin" />
            </div>
          ) : (
            <>
              <p className="text-sm text-gray-700 font-medium mt-3 mb-2">Documents</p>

              <div className="flex gap-2">
                <StatMiniCard icon={CheckCircle} count={stats.completed} label="Completed" variant="completed" />
                <StatMiniCard icon={Hourglass} count={stats.ongoing} label="Ongoing" variant="ongoing" />
                <StatMiniCard icon={Clock} count={stats.pending} label="Pending" variant="pending" />
              </div>

              <InfoStrip properties={propertyCount} tasks={taskCount} />

              <div className="mt-3">
                <PrimaryButton label="Estimate" onClick={() => navigate(`/estimate-list?client=${clientId}`)} />
              </div>

              <div className="flex items-center gap-2 mt-5 mb-2">
                <RefreshCw size={16} className="text-blue-600" />
                <span className="text-sm font-medium text-gray-800">
                  Recent Activity List{clientName ? ` Of ${clientName}` : ""}
                </span>
              </div>

              <div>
                <div className="grid grid-cols-[1fr_auto_auto] text-xs font-medium text-gray-600 bg-blue-50 px-3 py-2 rounded-t-md">
                  <span>Document Title</span>
                  <span className="w-24 text-center">Date</span>
                  <span className="w-24 text-center">Status Badge</span>
                </div>
                {activities.length === 0 ? (
                  <p className="text-xs text-gray-400 text-center py-6">No activities yet</p>
                ) : (
                  activities.map((a, i) => (
                    <div
                      key={i}
                      className="grid grid-cols-[1fr_auto_auto] items-center px-3 py-2.5 border-b border-gray-100 text-xs text-gray-700 cursor-pointer hover:bg-gray-50"
                    >
                      <span>{a.title}</span>
                      <span className="w-24 text-center text-gray-500">{a.date}</span>
                      <span className="w-24 flex justify-center">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusStyles[a.status] || "bg-gray-100 text-gray-600"}`}>
                          {a.status}
                        </span>
                      </span>
                    </div>
                  ))
                )}
              </div>
            </>
          )}
        </div>

        <BottomTabBar defaultTab="Client" />
      </div>
    </div>
  );
};

export default ClientDetailsScreen;
