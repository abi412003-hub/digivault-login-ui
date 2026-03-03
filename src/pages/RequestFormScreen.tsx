import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/lib/AuthContext";
import { supabase } from "@/lib/supabase";
import HeaderRowWithBack from "@/components/HeaderRowWithBack";
import SegmentedTabs4 from "@/components/SegmentedTabs4";
import BottomTabBar from "@/components/BottomTabBar";
import { ChevronDown } from "lucide-react";
const toast = (opts: any) => { if (opts.variant === 'destructive') alert(opts.description || opts.title); };

const RequestFormScreen = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    clientId: "",
    jobId: "",
    projectService: "",
    task: "",
    amount: "",
  });

  const set = (key: string) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((f) => ({ ...f, [key]: e.target.value }));

  const inputClass = "w-full border border-gray-300 rounded-lg h-12 px-4 text-sm text-gray-700 placeholder-gray-400 focus:ring-2 focus:ring-blue-200 focus:border-blue-500 outline-none";

  const handleSubmit = async () => {
    if (!form.clientId || !form.amount || !user) {
      toast({ title: "Error", description: "Client ID and Amount are required", variant: "destructive" });
      return;
    }
    setLoading(true);

    const { error } = await supabase.from("fund_requests").insert({
      requested_by: user.id,
      client_id: form.clientId,
      job_id: form.jobId,
      project_service: form.projectService,
      task: form.task,
      amount: parseFloat(form.amount.replace(/[^0-9.]/g, "")) || 0,
      status: "pending",
    });

    setLoading(false);
    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Success", description: "Payment request submitted" });
      navigate("/request-pending");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex justify-center">
      <div className="w-full max-w-[420px] bg-white min-h-screen flex flex-col">
        <HeaderRowWithBack title="Request" onBack={() => navigate("/payments")} />

        <div className="flex-1 overflow-y-auto pb-24">
          <div className="mt-3">
            <SegmentedTabs4
              tabs={["Request", "Pending", "Approved", "Rejected"]}
              defaultTab="Request"
              onTabChange={(tab) => {
                if (tab === "Pending") navigate("/request-pending");
              }}
            />
          </div>

          <div className="mx-4 mt-4 space-y-4">
            <div>
              <label className="text-sm text-gray-700 mb-1 block">Client ID *</label>
              <input className={inputClass} value={form.clientId} onChange={set("clientId")} placeholder="CI-541278" />
            </div>
            <div>
              <label className="text-sm text-gray-700 mb-1 block">Job ID</label>
              <input className={inputClass} value={form.jobId} onChange={set("jobId")} placeholder="JB-987654" />
            </div>
            <div>
              <label className="text-sm text-gray-700 mb-1 block">Project / Service</label>
              <input className={inputClass} value={form.projectService} onChange={set("projectService")} placeholder="E-Katha" />
            </div>
            <div>
              <label className="text-sm text-gray-700 mb-1 block">Task</label>
              <div className="relative">
                <input className={inputClass} value={form.task} onChange={set("task")} placeholder="Select your Task" />
                <ChevronDown size={18} className="absolute right-3 top-3.5 text-gray-400" />
              </div>
            </div>
            <div>
              <label className="text-sm text-gray-700 mb-1 block">Amount *</label>
              <input className={inputClass} value={form.amount} onChange={set("amount")} placeholder="250" />
            </div>

            <div className="flex justify-center pt-2 pb-4">
              <button
                onClick={handleSubmit}
                disabled={loading}
                className="bg-blue-700 text-white rounded-md px-10 py-3 text-sm font-medium hover:bg-blue-800 shadow-sm disabled:opacity-50"
              >
                {loading ? "Submitting..." : "Request"}
              </button>
            </div>
          </div>
        </div>

        <BottomTabBar defaultTab="Transactions" />
      </div>
    </div>
  );
};

export default RequestFormScreen;
