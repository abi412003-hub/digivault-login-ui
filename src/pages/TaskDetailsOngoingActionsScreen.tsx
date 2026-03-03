import HeaderRowWithBack from "@/components/HeaderRowWithBack";
import ClientInfoBlock from "@/components/ClientInfoBlock";
import PdfThumbCard from "@/components/PdfThumbCard";
import VerticalStepper from "@/components/VerticalStepper";
import BottomTabBar from "@/components/BottomTabBar";
import { Upload, Check } from "lucide-react";

const TaskDetailsOngoingActionsScreen = () => (
  <div className="min-h-screen bg-gray-50 flex justify-center">
    <div className="w-full max-w-[420px] bg-white min-h-screen flex flex-col">
      <HeaderRowWithBack title="Task Details" onBack={() => console.log("Back")} />

      <div className="flex-1 overflow-y-auto pb-24">
        <ClientInfoBlock />

        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200">
          <h2 className="text-base font-semibold text-gray-900">Khatha Extract</h2>
          <span className="px-4 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700">On Going</span>
        </div>

        <div className="px-4 mt-4">
          <PdfThumbCard />
        </div>

        <div className="px-4">
          <VerticalStepper allView />
        </div>

        {/* Action row */}
        <div className="flex gap-3 px-4 mt-6 mb-4">
          <button
            onClick={() => console.log("Upload clicked")}
            className="flex-1 flex items-center justify-center gap-2 bg-white border border-gray-200 rounded-lg py-3 text-blue-600 text-sm font-medium shadow-sm"
          >
            Upload <Upload size={16} />
          </button>
          <button
            onClick={() => console.log("Send For Approval")}
            className="flex-[1.3] flex items-center justify-center gap-2 bg-blue-700 rounded-lg py-3 text-white text-sm font-medium hover:bg-blue-800"
          >
            <Check size={16} /> Send For Approval
          </button>
        </div>
      </div>

      <BottomTabBar defaultTab="Client" />
    </div>
  </div>
);

export default TaskDetailsOngoingActionsScreen;
