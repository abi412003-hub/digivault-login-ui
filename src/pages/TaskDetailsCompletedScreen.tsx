import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "@/lib/AuthContext";
import { supabase } from "@/lib/supabase";
import HeaderRowWithBack from "@/components/HeaderRowWithBack";
import ClientInfoBlock from "@/components/ClientInfoBlock";
import DocumentPreviewCard from "@/components/DocumentPreviewCard";
import BottomTabBar from "@/components/BottomTabBar";
import { toast } from "@/components/ui/use-toast";

const TaskDetailsCompletedScreen = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const serviceId = searchParams.get("service");
  const { user } = useAuth();

  const [loading, setLoading] = useState(true);
  const [serviceName, setServiceName] = useState("Service");
  const [remarks, setRemarks] = useState<string | null>(null);
  const [showRemarks, setShowRemarks] = useState(false);
  const [completedDoc, setCompletedDoc] = useState<{ url: string; name: string } | null>(null);

  useEffect(() => {
    if (serviceId && user) fetchData();
  }, [serviceId, user]);

  async function fetchData() {
    setLoading(true);

    const { data: svc } = await supabase
      .from("service_requests")
      .select("id, main_service, status, current_stage")
      .eq("id", serviceId)
      .maybeSingle();

    if (svc) setServiceName(svc.main_service || "Service");

    // Fetch completed step with remarks
    const { data: steps } = await supabase
      .from("service_workflow_steps")
      .select("notes, completed_at, completed_by")
      .eq("service_id", serviceId)
      .eq("status", "completed")
      .order("step_order", { ascending: false })
      .limit(1);

    if (steps?.[0]?.notes) setRemarks(steps[0].notes);

    // Fetch latest document
    const { data: docs } = await supabase
      .from("documents")
      .select("file_url, file_name")
      .eq("service_id", serviceId)
      .order("uploaded_at", { ascending: false })
      .limit(1);

    if (docs?.[0]) setCompletedDoc({ url: docs[0].file_url, name: docs[0].file_name });

    setLoading(false);
  }

  return (
    <div className="min-h-screen bg-gray-50 flex justify-center">
      <div className="w-full max-w-[420px] bg-white min-h-screen flex flex-col">
        <HeaderRowWithBack title="Task Details" onBack={() => navigate(-1)} />

        <div className="flex-1 overflow-y-auto pb-24">
          {loading ? (
            <div className="flex items-center justify-center h-40">
              <div className="w-6 h-6 border-2 border-blue-700 border-t-transparent rounded-full animate-spin" />
            </div>
          ) : (
            <>
              <ClientInfoBlock />

              <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200">
                <h2 className="text-base font-semibold text-gray-900">{serviceName}</h2>
                <span className="px-4 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">Completed</span>
              </div>

              <DocumentPreviewCard url={completedDoc?.url} name={completedDoc?.name} />

              <div className="px-4 mt-4 mb-6">
                <button
                  onClick={() => setShowRemarks(!showRemarks)}
                  className="bg-blue-700 text-white rounded-md px-8 py-3 text-sm font-medium hover:bg-blue-800 shadow-md"
                >
                  {showRemarks ? "Hide Remark" : "View Remark"}
                </button>

                {showRemarks && (
                  <div className="mt-3 bg-gray-50 rounded-lg p-4 border border-gray-200">
                    <p className="text-sm text-gray-700">{remarks || "No remarks available."}</p>
                  </div>
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

export default TaskDetailsCompletedScreen;
