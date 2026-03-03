import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "@/lib/AuthContext";
import { supabase } from "@/lib/supabase";
import HeaderRowWithBack from "@/components/HeaderRowWithBack";
import ClientInfoBlock from "@/components/ClientInfoBlock";
import PdfThumbCard from "@/components/PdfThumbCard";
import VerticalStepper from "@/components/VerticalStepper";
import BottomTabBar from "@/components/BottomTabBar";
import { toast } from "@/components/ui/use-toast";

const TaskDetailsScreen = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const serviceId = searchParams.get("service");
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [serviceName, setServiceName] = useState("Service");
  const [serviceStatus, setServiceStatus] = useState("pending");
  const [steps, setSteps] = useState<any[]>([]);

  useEffect(() => {
    if (serviceId && user) fetchTaskDetails();
  }, [serviceId, user]);

  async function fetchTaskDetails() {
    setLoading(true);

    // Fetch service request
    const { data: svc } = await supabase
      .from("service_requests")
      .select("id, main_service, status")
      .eq("id", serviceId)
      .maybeSingle();

    if (svc) {
      setServiceName(svc.main_service || "Service");
      setServiceStatus(svc.status || "pending");
    }

    // Fetch workflow steps
    const { data: stepsData } = await supabase
      .from("service_workflow_steps")
      .select("*")
      .eq("service_id", serviceId)
      .order("step_order", { ascending: true });

    if (stepsData) setSteps(stepsData);
    setLoading(false);
  }

  const statusBadge = (s: string) => {
    if (s === "completed") return { label: "Completed", cls: "bg-green-100 text-green-700" };
    if (s === "in_progress") return { label: "On Going", cls: "bg-blue-100 text-blue-700" };
    return { label: "Pending", cls: "bg-yellow-100 text-orange-600" };
  };

  const badge = statusBadge(serviceStatus);

  const handleSave = async () => {
    setSaving(true);
    // Save step updates
    for (const step of steps) {
      if (step._dirty) {
        await supabase
          .from("service_workflow_steps")
          .update({ status: step.status, notes: step.notes })
          .eq("id", step.id);
      }
    }
    setSaving(false);
    toast({ title: "Saved", description: "Task updates saved successfully" });
  };

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
                <span className={`px-4 py-1 rounded-full text-xs font-medium ${badge.cls}`}>
                  {badge.label}
                </span>
              </div>

              <div className="px-4 mt-4">
                <PdfThumbCard />
              </div>

              <div className="px-4">
                <VerticalStepper steps={steps} onStepUpdate={(idx, update) => {
                  setSteps((prev) => prev.map((s, i) => i === idx ? { ...s, ...update, _dirty: true } : s));
                }} />
              </div>

              <div className="px-4 mt-6 mb-4">
                <button
                  onClick={handleSave}
                  disabled={saving}
                  className="bg-blue-700 text-white rounded-md px-10 py-3 text-sm font-medium hover:bg-blue-800 disabled:opacity-50"
                >
                  {saving ? "Saving..." : "Save"}
                </button>
              </div>
            </>
          )}
        </div>

        <BottomTabBar defaultTab="Client" />
      </div>
    </div>
  );
};

export default TaskDetailsScreen;
