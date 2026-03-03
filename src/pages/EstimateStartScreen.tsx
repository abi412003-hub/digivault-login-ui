import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "@/lib/AuthContext";
import { supabase } from "@/lib/supabase";
import HeaderRowWithBack from "@/components/HeaderRowWithBack";
import BottomTabBar from "@/components/BottomTabBar";

const tabList = ["Required Document", "Process Flow", "Report"];

const EstimateStartScreen = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const estimateId = searchParams.get("id");
  const { user } = useAuth();

  const [activeTab, setActiveTab] = useState("Required Document");
  const [loading, setLoading] = useState(true);
  const [stepsCount, setStepsCount] = useState(0);
  const [requiredDocs, setRequiredDocs] = useState<string[]>([]);
  const [estimateStatus, setEstimateStatus] = useState("");

  useEffect(() => {
    if (estimateId && user) fetchEstimate();
  }, [estimateId, user]);

  async function fetchEstimate() {
    setLoading(true);

    const { data: est } = await supabase
      .from("estimates")
      .select("id, status, service_id")
      .eq("id", estimateId)
      .maybeSingle();

    if (est) {
      setEstimateStatus(est.status);

      // Fetch existing steps count
      const { count } = await supabase
        .from("estimate_steps")
        .select("id", { count: "exact", head: true })
        .eq("estimate_id", estimateId);

      setStepsCount(count || 0);

      // Fetch required docs from service's documents
      if (est.service_id) {
        const { data: docs } = await supabase
          .from("documents")
          .select("file_name, category, status")
          .eq("service_id", est.service_id)
          .order("created_at", { ascending: true });

        if (docs) setRequiredDocs(docs.map((d) => d.file_name || d.category));
      }
    }
    setLoading(false);
  }

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
    if (tab === "Process Flow") {
      navigate(`/estimate-process-flow?estimate=${estimateId}`);
    }
  };

  const nextStep = stepsCount + 1;

  return (
    <div className="min-h-screen bg-gray-50 flex justify-center">
      <div className="w-full max-w-[420px] bg-white min-h-screen flex flex-col">
        <HeaderRowWithBack title="Estimate" onBack={() => navigate("/estimate-list")} />

        <div className="flex-1 px-4">
          {/* Top tabs */}
          <div className="flex gap-3 mt-4">
            {tabList.map((t) => (
              <button
                key={t}
                onClick={() => handleTabClick(t)}
                className={`border rounded-md px-3 py-2 text-sm font-medium ${
                  activeTab === t
                    ? "bg-blue-700 text-white border-blue-700"
                    : "border-blue-600 text-blue-600"
                }`}
              >
                {t}
              </button>
            ))}
          </div>

          {loading ? (
            <div className="flex items-center justify-center h-32 mt-6">
              <div className="w-6 h-6 border-2 border-blue-700 border-t-transparent rounded-full animate-spin" />
            </div>
          ) : activeTab === "Required Document" ? (
            <div className="mt-6">
              {requiredDocs.length > 0 ? (
                <div className="space-y-2">
                  {requiredDocs.map((doc, i) => (
                    <div key={i} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg border border-gray-100">
                      <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 text-xs font-bold">{i + 1}</div>
                      <span className="text-sm text-gray-700">{doc}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-gray-400 text-center mt-10">No required documents listed</p>
              )}
            </div>
          ) : activeTab === "Report" ? (
            <div className="mt-6">
              <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                <p className="text-sm text-gray-600">Status: <span className="font-medium text-gray-800">{estimateStatus.replace(/_/g, " ")}</span></p>
                <p className="text-sm text-gray-600 mt-1">Steps completed: <span className="font-medium text-gray-800">{stepsCount}</span></p>
              </div>
            </div>
          ) : null}

          {/* Add Step button */}
          <div className="flex items-center gap-3 mt-7">
            <div className="w-8 h-8 rounded-full border-2 border-blue-700 flex items-center justify-center flex-shrink-0">
              <div className="w-3.5 h-3.5 rounded-full bg-blue-700" />
            </div>
            <button
              onClick={() => navigate(`/estimate-step-form?estimate=${estimateId}&step=${nextStep}`)}
              className="flex-1 bg-blue-700 text-white rounded-full py-3.5 text-sm font-medium hover:bg-blue-800 shadow-sm"
            >
              Add Step {nextStep}
            </button>
          </div>
        </div>

        <BottomTabBar defaultTab="Client" />
      </div>
    </div>
  );
};

export default EstimateStartScreen;
