import HeaderRowWithBack from "@/components/HeaderRowWithBack";
import BottomTabBar from "@/components/BottomTabBar";
import { ClipboardList, FileText, DollarSign, RefreshCw } from "lucide-react";

const donutData = [
  { label: "Received", value: "100A", color: "#22c55e", pct: 20 },
  { label: "Expenditure", value: "150A", color: "#ef4444", pct: 30 },
  { label: "Request", value: "50A", color: "#f59e0b", pct: 10 },
  { label: "Balance", value: "200A", color: "#a855f7", pct: 40 },
];

const transactions = [
  { clientId: "CLNT0001234", jobId: "JB-235673", service: "E-katha", step: "Step 4" },
  { clientId: "CLNT0001235", jobId: "JB-235674", service: "Mutation", step: "Step 1" },
  { clientId: "CLNT0001236", jobId: "JB-235675", service: "Transfer", step: "Step 5" },
  { clientId: "CLNT0001237", jobId: "JB-235676", service: "Building", step: "Step2" },
];

const quickActions = [
  { icon: ClipboardList, label: "Request" },
  { icon: FileText, label: "Expenditure" },
  { icon: DollarSign, label: "Transaction" },
];

// Build conic gradient from data
const buildConic = () => {
  let acc = 0;
  const stops = donutData.map((d) => {
    const start = acc;
    acc += d.pct * 3.6; // degrees
    return `${d.color} ${start}deg ${acc}deg`;
  });
  return `conic-gradient(${stops.join(", ")})`;
};

const PaymentsScreen = () => (
  <div className="min-h-screen bg-gray-50 flex justify-center">
    <div className="w-full max-w-[420px] bg-white min-h-screen flex flex-col">
      <HeaderRowWithBack title="Payments" onBack={() => console.log("Back")} />

      <div className="flex-1 overflow-y-auto px-4 pb-24">
        {/* Donut summary card */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-5 mt-4 flex items-center gap-5">
          {/* Donut */}
          <div className="relative w-[160px] h-[160px] flex-shrink-0">
            <div className="w-full h-full rounded-full" style={{ background: buildConic() }} />
            <div className="absolute inset-[30px] bg-white rounded-full flex flex-col items-center justify-center">
              <span className="text-2xl font-bold text-gray-900">200A</span>
              <span className="text-sm text-gray-400">Total</span>
            </div>
          </div>
          {/* Legend */}
          <div className="flex-1 space-y-3">
            {donutData.map((d) => (
              <div key={d.label} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: d.color }} />
                  <span className="text-sm font-medium text-gray-700">{d.label}</span>
                </div>
                <span className="text-sm font-semibold text-gray-800">{d.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Quick actions */}
        <div className="flex justify-around mt-5 mb-4">
          {quickActions.map(({ icon: Icon, label }) => (
            <button key={label} onClick={() => console.log(label)} className="flex flex-col items-center gap-1.5">
              <Icon size={40} className="text-blue-600" strokeWidth={1.5} />
              <span className="text-sm text-gray-700">{label}</span>
            </button>
          ))}
        </div>

        {/* Section header */}
        <div className="flex items-center gap-2 pb-2 border-b border-gray-200">
          <RefreshCw size={18} className="text-blue-600" />
          <span className="text-lg font-semibold text-gray-900">Recent Transactions</span>
        </div>

        {/* Table */}
        <div className="mt-2 overflow-x-auto">
          <div className="min-w-[440px]">
            <div className="grid grid-cols-5 text-xs font-medium text-gray-600 bg-blue-50 px-3 py-2.5 rounded-t-md">
              <span>Client ID</span>
              <span>Job ID</span>
              <span>Service</span>
              <span>Step No</span>
              <span>Amount</span>
            </div>
            {transactions.map((t, i) => (
              <div
                key={i}
                onClick={() => console.log("Open transaction row", t.clientId)}
                className="grid grid-cols-5 items-center px-3 py-3 border-b border-gray-100 text-xs text-gray-700 cursor-pointer hover:bg-gray-50"
              >
                <span>{t.clientId}</span>
                <span>{t.jobId}</span>
                <span>{t.service}</span>
                <span>{t.step}</span>
                <span>—</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <BottomTabBar defaultTab="Transactions" />
    </div>
  </div>
);

export default PaymentsScreen;
