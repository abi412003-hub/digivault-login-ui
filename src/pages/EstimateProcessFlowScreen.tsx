import HeaderRowWithBack from "@/components/HeaderRowWithBack";
import StepCard from "@/components/StepCard";
import SummaryBar from "@/components/SummaryBar";
import BottomTabBar from "@/components/BottomTabBar";

const tabs = ["Required Document", "Process Flow", "Report"];
const chips = [
  { amount: 100, label: "Real" },
  { amount: 200, label: "Misc" },
  { amount: 300, label: "Mind" },
];
const desc = [
  "This is the best step i have taken ever",
  "This is the best step i have taken ever",
];

const steps = [1, 2, 3];

const EstimateProcessFlowScreen = () => (
  <div className="min-h-screen bg-gray-50 flex justify-center">
    <div className="w-full max-w-[420px] bg-white min-h-screen flex flex-col">
      <HeaderRowWithBack title="Estimate" onBack={() => console.log("Back")} />

      <div className="flex-1 overflow-y-auto pb-36">
        {/* Outline tabs */}
        <div className="flex gap-3 px-4 mt-4">
          {tabs.map((t) => (
            <button key={t} onClick={() => console.log("tab:", t)} className="border border-blue-600 text-blue-600 rounded-md px-3 py-2 text-sm font-medium">
              {t}
            </button>
          ))}
        </div>

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
          </div>

          {/* Cards */}
          <div className="flex-1 space-y-4">
            {steps.map((s) => (
              <StepCard key={s} step={s} duration="1D" chips={chips} description={desc} />
            ))}

            <button
              onClick={() => console.log("Add Step 4")}
              className="w-full bg-blue-700 text-white rounded-full py-3.5 text-sm font-medium hover:bg-blue-800 shadow-sm"
            >
              Add Step 4
            </button>
          </div>
        </div>
      </div>

      <div className="sticky bottom-0">
        <SummaryBar />
        <BottomTabBar defaultTab="Client" />
      </div>
    </div>
  </div>
);

export default EstimateProcessFlowScreen;
