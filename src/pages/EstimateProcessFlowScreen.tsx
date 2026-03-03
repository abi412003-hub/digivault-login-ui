import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "@/lib/AuthContext";
import { supabase } from "@/lib/supabase";
import HeaderRowWithBack from "@/components/HeaderRowWithBack";
import StepCard from "@/components/StepCard";
import SummaryBar from "@/components/SummaryBar";
import BottomTabBar from "@/components/BottomTabBar";

const tabList = ["Required Document", "Process Flow", "Report"];

interface StepRow {
  id: string;
  step_order: number;
  process_name: string;
  description: string | null;
  duration_days: number | null;
  real_cost: number;
  bribe_cost: number;
  mind_cost: number;
  total: number | null;
}

const EstimateProcessFlowScreen = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const estimateId = searchParams.get("estimate");
  const { user } = useAuth();

  const [loading, setLoading] = useState(true);
  const [steps, setSteps] = useState<StepRow[]>([]);
  const [totals, setTotals] = useState({ real: 0, bribe: 0, misc: 0, grand: 0 });

  useEffect(() => {
    if (estimateId && user) fetchSteps();
  }, [estimateId, user]);

  async function fetchSteps() {
    setLoading(true);

    const { data } = await supabase
      .from("estimate_steps")
      .select("id, step_order, process_name, description, duration_days, real_cost, bribe_cost, mind_cost, total")
      .eq("estimate_id", estimateId)
      .order("step_order", { ascending: true });

    if (data) {
      setSteps(data as StepRow[]);
      const real = data.reduce((s, d) => s + (Number(d.real_cost) || 0), 0);
      const bribe = data.reduce((s, d) => s + (Number(d.bribe_cost) || 0), 0);
      const misc = data.reduce((s, d) => s + (Number(d.mind_cost) || 0), 0);
      setTotals({ real, bribe, misc, grand: real + bribe + misc });
    }
    setLoading(false);
  }

  const handleTabClick = (tab: string) => {
    if (tab === "Required Document" || tab === "Report") {
      navigate(`/estimate-start?id=${estimateId}`);
    }
  };

  const nextStep = steps.length + 1;

  return (
    <div className="min-h-screen bg-gray-50 flex justify-center">
      <div className="w-full max-w-[420px] bg-white min-h-screen flex flex-col">
        <HeaderRowWithBack title="Estimate" onBack={() => navigate(`/estimate-start?id=${estimateId}`)} />

        <div className="flex-1 overflow-y-auto pb-36">
          {/* Outline tabs */}
          <div className="flex gap-3 px-4 mt-4">
            {tabList.map((t) => (
              <button
                key={t}
                onClick={() => handleTabClick(t)}
                className={`border rounded-md px-3 py-2 text-sm font-medium ${
                  t === "Process Flow"
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
          ) : (
            <>
              {/* Timeline + cards */}
              <div className="relative flex px-4 mt-6">
                {/* Timeline line */}
                <div className="flex flex-col items-center mr-3 flex-shrink-0">
                  {steps.map((_, i) => (
                    <div key={i} className="flex flex-col items-center">
                      <div className="w-8 h-8 rounded-full border-2 border-blue-600 bg-white flex items-center justify-center z-10">
                        <div className="w-3.5 h-3.5 rounded-full bg-blue-700" />
                      </div>
                      {i < steps.length - 1 && <div className="w-0.5 bg-blue-400 flex-1 min-h-[180px]" />}
                    </div>
                  ))}
                  {/* Connector to Add button */}
                  {steps.length > 0 && <div className="w-0.5 bg-blue-400 min-h-[40px]" />}
                  <div className="w-8 h-8 rounded-full border-2 border-blue-600 bg-white flex items-center justify-center z-10">
                    <div className="w-3.5 h-3.5 rounded-full bg-blue-700" />
                  </div>
                </div>

                {/* Cards */}
                <div className="flex-1 space-y-4">
                  {steps.map((s) => (
                    <StepCard
                      key={s.id}
                      step={s.step_order}
                      duration={s.duration_days ? `${s.duration_days}D` : "–"}
                      chips={[
                        { amount: Number(s.real_cost), label: "Real" },
                        { amount: Number(s.bribe_cost), label: "Bribe" },
                        { amount: Number(s.mind_cost), label: "Misc" },
                      ]}
                      description={s.description ? [s.description] : []}
                    />
                  ))}

                  {steps.length === 0 && (
                    <p className="text-sm text-gray-400 py-4">No steps added yet</p>
                  )}

                  <button
                    onClick={() => navigate(`/estimate-step-form?estimate=${estimateId}&step=${nextStep}`)}
                    className="w-full bg-blue-700 text-white rounded-full py-3.5 text-sm font-medium hover:bg-blue-800 shadow-sm"
                  >
                    Add Step {nextStep}
                  </button>
                </div>
              </div>
            </>
          )}
        </div>

        <div className="sticky bottom-0">
          <SummaryBar real={totals.real} bribe={totals.bribe} misc={totals.misc} total={totals.grand} />
          <BottomTabBar defaultTab="Client" />
        </div>
      </div>
    </div>
  );
};

export default EstimateProcessFlowScreen;
