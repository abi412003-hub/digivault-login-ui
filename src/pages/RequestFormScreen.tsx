import { useState } from "react";
import HeaderRowWithBack from "@/components/HeaderRowWithBack";
import SegmentedTabs4 from "@/components/SegmentedTabs4";
import BottomTabBar from "@/components/BottomTabBar";
import { ChevronDown } from "lucide-react";

const RequestFormScreen = () => {
  const [clientId] = useState("CI-541278");
  const [jobId] = useState("JB-987654");
  const [project] = useState("E-katha");
  const [mainService] = useState("Gram Panchayat");
  const [subService] = useState("E-Katha B");
  const [service] = useState("E-Katha 11b");
  const [task] = useState("");
  const [amount] = useState("250A");

  const inputClass = "w-full border border-gray-300 rounded-lg h-12 px-4 text-sm text-gray-700 placeholder-gray-400 focus:ring-2 focus:ring-blue-200 focus:border-blue-500 outline-none";

  return (
    <div className="min-h-screen bg-gray-50 flex justify-center">
      <div className="w-full max-w-[420px] bg-white min-h-screen flex flex-col">
        <HeaderRowWithBack title="Request" onBack={() => console.log("Back")} />

        <div className="flex-1 overflow-y-auto pb-24">
          <div className="mt-3">
            <SegmentedTabs4 tabs={["Request", "Pending", "Approved", "Rejected"]} />
          </div>

          <div className="mx-4 mt-4 space-y-4">
            <div>
              <label className="text-sm text-gray-700 mb-1 block">Client ID</label>
              <input className={inputClass} defaultValue={clientId} />
            </div>
            <div>
              <label className="text-sm text-gray-700 mb-1 block">Job ID</label>
              <input className={inputClass} defaultValue={jobId} />
            </div>
            <div>
              <label className="text-sm text-gray-700 mb-1 block">Project</label>
              <div className="relative">
                <input className={inputClass} defaultValue={project} readOnly />
                <ChevronDown size={18} className="absolute right-3 top-3.5 text-gray-400" />
              </div>
            </div>
            <div>
              <label className="text-sm text-gray-700 mb-1 block">Main Service</label>
              <input className={inputClass} defaultValue={mainService} />
            </div>
            <div>
              <label className="text-sm text-gray-700 mb-1 block">Sub -Service</label>
              <input className={inputClass} defaultValue={subService} />
            </div>
            <div>
              <label className="text-sm text-gray-700 mb-1 block">Service</label>
              <input className={inputClass} defaultValue={service} />
            </div>
            <div>
              <label className="text-sm text-gray-700 mb-1 block">Task</label>
              <div className="relative">
                <input className={inputClass} placeholder="Select your Task" defaultValue={task} readOnly />
                <ChevronDown size={18} className="absolute right-3 top-3.5 text-gray-400" />
              </div>
            </div>
            <div>
              <label className="text-sm text-gray-700 mb-1 block">Amount</label>
              <input className={inputClass} defaultValue={amount} />
            </div>

            <div className="flex justify-center pt-2 pb-4">
              <button
                onClick={() => console.log("Request submitted (UI only)")}
                className="bg-blue-700 text-white rounded-md px-10 py-3 text-sm font-medium hover:bg-blue-800 shadow-sm"
              >
                Request
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
