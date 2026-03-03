import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "@/lib/AuthContext";
import { supabase } from "@/lib/supabase";
import BottomTabBar from "@/components/BottomTabBar";
import ExpensePill from "@/components/ExpensePill";
import { toast } from "@/components/ui/use-toast";

const EstimateStepFormScreen = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const estimateId = searchParams.get("estimate");
  const stepOrder = parseInt(searchParams.get("step") || "1");
  const { user } = useAuth();

  const [loading, setLoading] = useState(false);
  const [process, setProcess] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [realCost, setRealCost] = useState("");
  const [bribeCost, setBribeCost] = useState("");
  const [miscCost, setMiscCost] = useState("");
  const [description, setDescription] = useState("");
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [department, setDepartment] = useState("");

  const daysBetween = () => {
    if (!fromDate || !toDate) return 0;
    const diff = new Date(toDate).getTime() - new Date(fromDate).getTime();
    return Math.max(1, Math.ceil(diff / (1000 * 60 * 60 * 24)));
  };

  const inputClass = "w-full border border-gray-300 rounded-md h-11 px-4 text-sm text-gray-800 placeholder-gray-400 focus:ring-2 focus:ring-blue-200 focus:border-blue-500 outline-none";

  const handleAdd = async () => {
    if (!estimateId || !process || !user) {
      toast({ title: "Error", description: "Process name is required", variant: "destructive" });
      return;
    }
    setLoading(true);

    const real = parseFloat(realCost) || 0;
    const bribe = parseFloat(bribeCost) || 0;
    const misc = parseFloat(miscCost) || 0;

    const { error } = await supabase.from("estimate_steps").insert({
      estimate_id: estimateId,
      step_order: stepOrder,
      process_name: process,
      description,
      date_from: fromDate || null,
      date_to: toDate || null,
      duration_days: daysBetween(),
      real_cost: real,
      bribe_cost: bribe,
      mind_cost: misc,
      total: real + bribe + misc,
      contact_name: name || null,
      contact_number: number || null,
      contact_department: department || null,
    });

    setLoading(false);
    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Step Added", description: `Step ${stepOrder} saved` });
      navigate(`/estimate-process-flow?estimate=${estimateId}`);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex justify-center">
      <div className="w-full max-w-[420px] bg-white min-h-screen flex flex-col">
        <div className="flex-1 overflow-y-auto px-5 py-6 pb-24">
          <h1 className="text-xl font-bold text-blue-600 mb-5">Step {stepOrder}</h1>

          <label className="text-sm font-medium text-gray-700">Process</label>
          <input className={`${inputClass} mt-1 mb-4`} value={process} onChange={(e) => setProcess(e.target.value)} placeholder="e.g. Online Submission" />

          <label className="text-sm font-medium text-gray-700">Date</label>
          <p className="text-xs text-gray-500 mt-1">From</p>
          <input type="date" className={`${inputClass} mt-1`} value={fromDate} onChange={(e) => setFromDate(e.target.value)} />
          <p className="text-xs text-gray-500 mt-3">To</p>
          <input type="date" className={`${inputClass} mt-1`} value={toDate} onChange={(e) => setToDate(e.target.value)} />
          <p className="text-xs text-gray-500 text-right mt-1 mb-4">in {daysBetween()} Days</p>

          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-medium text-gray-800">Expense</span>
          </div>
          <div className="space-y-2 mb-4">
            <div className="flex gap-2">
              <input className={`${inputClass} flex-1`} placeholder="Real ₹" value={realCost} onChange={(e) => setRealCost(e.target.value)} />
              <input className={`${inputClass} flex-1`} placeholder="Bribe ₹" value={bribeCost} onChange={(e) => setBribeCost(e.target.value)} />
              <input className={`${inputClass} flex-1`} placeholder="Misc ₹" value={miscCost} onChange={(e) => setMiscCost(e.target.value)} />
            </div>
            <p className="text-xs text-right text-gray-500">
              Total: ₹{((parseFloat(realCost) || 0) + (parseFloat(bribeCost) || 0) + (parseFloat(miscCost) || 0)).toLocaleString()}
            </p>
          </div>

          <label className="text-sm font-medium text-gray-700 block mt-5">Description</label>
          <input className={`${inputClass} mt-1`} placeholder="Brief description" value={description} onChange={(e) => setDescription(e.target.value)} maxLength={200} />
          <p className="text-xs text-right mt-1 mb-4">
            <span className="text-gray-500">Max </span><span className="text-red-500">50</span><span className="text-gray-500"> words</span>
          </p>

          <label className="text-sm font-medium text-gray-700 block mb-2">Contact Information</label>
          <input className={`${inputClass} mb-2`} placeholder="Officer Name" value={name} onChange={(e) => setName(e.target.value)} />
          <input className={`${inputClass} mb-2`} placeholder="Contact Number" value={number} onChange={(e) => setNumber(e.target.value)} />
          <input className={`${inputClass} mb-4`} placeholder="Department" value={department} onChange={(e) => setDepartment(e.target.value)} />

          <div className="flex items-center justify-between">
            <button onClick={() => navigate(-1)} className="text-red-500 text-sm font-medium">Cancel</button>
            <button
              onClick={handleAdd}
              disabled={loading}
              className="bg-blue-700 text-white rounded-md px-10 py-3 text-sm font-medium hover:bg-blue-800 disabled:opacity-50"
            >
              {loading ? "Saving..." : "Add"}
            </button>
          </div>
        </div>

        <BottomTabBar defaultTab="Client" />
      </div>
    </div>
  );
};

export default EstimateStepFormScreen;
