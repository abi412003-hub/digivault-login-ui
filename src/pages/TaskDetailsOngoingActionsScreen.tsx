import { useState, useEffect, useRef } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "@/lib/AuthContext";
import { supabase } from "@/lib/supabase";
import HeaderRowWithBack from "@/components/HeaderRowWithBack";
import ClientInfoBlock from "@/components/ClientInfoBlock";
import PdfThumbCard from "@/components/PdfThumbCard";
import VerticalStepper from "@/components/VerticalStepper";
import BottomTabBar from "@/components/BottomTabBar";
import { Upload, Check } from "lucide-react";
const toast = (opts: any) => { if (opts.variant === 'destructive') alert(opts.description || opts.title); };

const TaskDetailsOngoingActionsScreen = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const serviceId = searchParams.get("service");
  const { user } = useAuth();
  const fileRef = useRef<HTMLInputElement>(null);

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [serviceName, setServiceName] = useState("Service");
  const [steps, setSteps] = useState<any[]>([]);

  useEffect(() => {
    if (serviceId && user) fetchData();
  }, [serviceId, user]);

  async function fetchData() {
    setLoading(true);

    const { data: svc } = await supabase
      .from("service_requests")
      .select("id, main_service, status")
      .eq("id", serviceId)
      .maybeSingle();

    if (svc) setServiceName(svc.main_service || "Service");

    const { data: stepsData } = await supabase
      .from("service_workflow_steps")
      .select("*")
      .eq("service_id", serviceId)
      .order("step_order", { ascending: true });

    if (stepsData) setSteps(stepsData);
    setLoading(false);
  }

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file || !serviceId || !user) return;

    // Validate size (5MB max per PRD)
    if (file.size > 5 * 1024 * 1024) {
      toast({ title: "Error", description: "File must be under 5MB", variant: "destructive" });
      return;
    }

    // Validate type
    const allowed = ["application/pdf", "image/jpeg", "image/png"];
    if (!allowed.includes(file.type)) {
      toast({ title: "Error", description: "Only PDF, JPG, and PNG allowed", variant: "destructive" });
      return;
    }

    setUploading(true);
    const ext = file.name.split(".").pop();
    const path = `${user.id}/${serviceId}/${Date.now()}.${ext}`;

    const { error: uploadErr } = await supabase.storage
      .from("dp-documents")
      .upload(path, file);

    if (uploadErr) {
      toast({ title: "Upload Failed", description: uploadErr.message, variant: "destructive" });
      setUploading(false);
      return;
    }

    const { data: urlData } = supabase.storage.from("dp-documents").getPublicUrl(path);

    // Save document record
    await supabase.from("documents").insert({
      service_id: serviceId,
      category: "task_completion",
      file_url: urlData.publicUrl,
      file_name: file.name,
      file_size: file.size,
      file_type: file.type,
      status: "uploaded",
      uploaded_by: user.id,
    });

    setUploading(false);
    toast({ title: "Uploaded", description: file.name });
  }

  async function handleSendForApproval() {
    if (!serviceId || !user) return;
    setSubmitting(true);

    // Update service status to pending approval
    const { error } = await supabase
      .from("service_requests")
      .update({ status: "in_progress", current_stage: "pending_approval" })
      .eq("id", serviceId);

    // Log activity
    await supabase.from("activities").insert({
      user_id: user.id,
      title: `Sent ${serviceName} for approval`,
      status: "pending",
      date: new Date().toISOString().split("T")[0],
      related_type: "service_request",
      related_id: serviceId,
    });

    setSubmitting(false);

    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Sent", description: "Task sent for approval" });
      navigate(-1);
    }
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
                <span className="px-4 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700">On Going</span>
              </div>

              <div className="px-4 mt-4">
                <PdfThumbCard />
              </div>

              <div className="px-4">
                <VerticalStepper steps={steps} allView />
              </div>

              {/* Action row */}
              <input type="file" ref={fileRef} className="hidden" accept=".pdf,.jpg,.jpeg,.png" onChange={handleUpload} />

              <div className="flex gap-3 px-4 mt-6 mb-4">
                <button
                  onClick={() => fileRef.current?.click()}
                  disabled={uploading}
                  className="flex-1 flex items-center justify-center gap-2 bg-white border border-gray-200 rounded-lg py-3 text-blue-600 text-sm font-medium shadow-sm disabled:opacity-50"
                >
                  {uploading ? "Uploading..." : "Upload"} <Upload size={16} />
                </button>
                <button
                  onClick={handleSendForApproval}
                  disabled={submitting}
                  className="flex-[1.3] flex items-center justify-center gap-2 bg-blue-700 rounded-lg py-3 text-white text-sm font-medium hover:bg-blue-800 disabled:opacity-50"
                >
                  <Check size={16} /> {submitting ? "Sending..." : "Send For Approval"}
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

export default TaskDetailsOngoingActionsScreen;
