import HeaderRowWithBack from "@/components/HeaderRowWithBack";
import ClientInfoBlock from "@/components/ClientInfoBlock";
import PdfThumbCard from "@/components/PdfThumbCard";
import VerticalStepper from "@/components/VerticalStepper";
import BottomTabBar from "@/components/BottomTabBar";

const TaskDetailsScreen = () => (
  <div className="min-h-screen bg-gray-50 flex justify-center">
    <div className="w-full max-w-[420px] bg-white min-h-screen flex flex-col">
      <HeaderRowWithBack title="Task Details" onBack={() => console.log("Back")} />

      <div className="flex-1 overflow-y-auto pb-24">
        <ClientInfoBlock />

        {/* Task title row */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200">
          <h2 className="text-base font-semibold text-gray-900">Khatha Extract</h2>
          <span className="px-4 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700">On Going</span>
        </div>

        {/* PDF preview */}
        <div className="px-4 mt-4">
          <PdfThumbCard />
        </div>

        {/* Stepper */}
        <div className="px-4">
          <VerticalStepper />
        </div>

        {/* Save */}
        <div className="px-4 mt-6 mb-4">
          <button
            onClick={() => console.log("Save")}
            className="bg-blue-700 text-white rounded-md px-10 py-3 text-sm font-medium hover:bg-blue-800"
          >
            Save
          </button>
        </div>
      </div>

      <BottomTabBar defaultTab="Client" />
    </div>
  </div>
);

export default TaskDetailsScreen;
