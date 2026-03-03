import { CheckCircle } from "lucide-react";

const SummaryBar = () => (
  <div className="bg-white border-t border-gray-200 px-4 py-3 flex items-center justify-between">
    <div className="text-xs text-gray-700 leading-relaxed">
      <p>Total Time: <span className="text-blue-600 font-medium">3 Days</span></p>
      <p>Total Price: <span className="text-blue-600 font-medium">500rs</span></p>
    </div>
    <button
      onClick={() => console.log("Send For Approval")}
      className="flex items-center gap-1.5 bg-green-600 text-white rounded-full px-5 py-2.5 text-sm font-medium shadow-sm"
    >
      <CheckCircle size={16} /> Send For Approval
    </button>
  </div>
);

export default SummaryBar;
