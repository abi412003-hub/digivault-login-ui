import HeaderRowWithBack from "@/components/HeaderRowWithBack";
import BottomTabBar from "@/components/BottomTabBar";

const tabs = ["Required Document", "Process Flow", "Report"];

const EstimateStartScreen = () => (
  <div className="min-h-screen bg-gray-50 flex justify-center">
    <div className="w-full max-w-[420px] bg-white min-h-screen flex flex-col">
      <HeaderRowWithBack title="Estimate" onBack={() => console.log("Back")} />

      <div className="flex-1 px-4">
        {/* Top tabs */}
        <div className="flex gap-3 mt-4">
          {tabs.map((t) => (
            <button
              key={t}
              onClick={() => console.log("tab:", t)}
              className="border border-blue-600 text-blue-600 rounded-md px-3 py-2 text-sm font-medium"
            >
              {t}
            </button>
          ))}
        </div>

        {/* Add Step 1 row */}
        <div className="flex items-center gap-3 mt-7">
          <div className="w-8 h-8 rounded-full border-2 border-blue-700 flex items-center justify-center flex-shrink-0">
            <div className="w-3.5 h-3.5 rounded-full bg-blue-700" />
          </div>
          <button
            onClick={() => console.log("Add Step 1")}
            className="flex-1 bg-blue-700 text-white rounded-full py-3.5 text-sm font-medium hover:bg-blue-800 shadow-sm"
          >
            Add Step 1
          </button>
        </div>
      </div>

      <BottomTabBar defaultTab="Client" />
    </div>
  </div>
);

export default EstimateStartScreen;
