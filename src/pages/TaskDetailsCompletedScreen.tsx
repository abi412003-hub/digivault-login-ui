import HeaderRowWithBack from "@/components/HeaderRowWithBack";
import ClientInfoBlock from "@/components/ClientInfoBlock";
import DocumentPreviewCard from "@/components/DocumentPreviewCard";
import BottomTabBar from "@/components/BottomTabBar";

const TaskDetailsCompletedScreen = () => (
  <div className="min-h-screen bg-gray-50 flex justify-center">
    <div className="w-full max-w-[420px] bg-white min-h-screen flex flex-col">
      <HeaderRowWithBack title="Task Details" onBack={() => console.log("Back")} />

      <div className="flex-1 overflow-y-auto pb-24">
        <ClientInfoBlock />

        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200">
          <h2 className="text-base font-semibold text-gray-900">Khatha Extract</h2>
          <span className="px-4 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">Completed</span>
        </div>

        <DocumentPreviewCard />

        <div className="px-4 mt-4 mb-6">
          <button
            onClick={() => console.log("View Remark")}
            className="bg-blue-700 text-white rounded-md px-8 py-3 text-sm font-medium hover:bg-blue-800 shadow-md"
          >
            View Remark
          </button>
        </div>
      </div>

      <BottomTabBar defaultTab="Client" />
    </div>
  </div>
);

export default TaskDetailsCompletedScreen;
