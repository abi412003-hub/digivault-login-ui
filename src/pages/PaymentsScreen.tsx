import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ClipboardList, FileText, DollarSign } from "lucide-react";
import { useAuth } from "@/lib/AuthContext";
import { supabase } from "@/lib/supabase";
import HeaderRowWithBack from "@/components/HeaderRowWithBack";
import DonutStat from "@/components/DonutStat";
import BottomTabBar from "@/components/BottomTabBar";

interface TxRow { clientId: string; jobId: string; service: string; step: string; amount: string }

const PaymentsScreen = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [summary, setSummary] = useState({ received: 0, expenditure: 0, requested: 0, balance: 0, total: 0 });
  const [transactions, setTransactions] = useState<TxRow[]>([]);

  useEffect(() => {
    const load = async () => {
      if (!user) return;

      // Fund requests
      const { data: requests } = await supabase
        .from("fund_requests")
        .select("amount, status")
        .eq("requested_by", user.id);

      const reqArr = requests || [];
      const received = reqArr.filter((r) => r.status === "disbursed").reduce((s, r) => s + Number(r.amount), 0);
      const requested = reqArr.filter((r) => r.status === "pending").reduce((s, r) => s + Number(r.amount), 0);

      // Expenditures
      const { data: expenditures } = await supabase
        .from("expenditures")
        .select("amount, service_id, step_id, notes")
        .eq("logged_by", user.id)
        .order("created_at", { ascending: false })
        .limit(20);

      const expTotal = (expenditures || []).reduce((s, e) => s + Number(e.amount), 0);
      const total = received + expTotal + requested;

      setSummary({ received, expenditure: expTotal, requested, balance: received - expTotal, total: total || 1 });

      setTransactions(
        (expenditures || []).slice(0, 10).map((e) => ({
          clientId: "—",
          jobId: e.service_id?.slice(0, 8) || "—",
          service: e.notes || "Expense",
          step: e.step_id?.slice(0, 6) || "—",
          amount: `₹${Number(e.amount).toLocaleString("en-IN")}`,
        }))
      );
    };
    load();
  }, [user]);

  return (
    <div className="min-h-screen bg-gray-50 flex justify-center">
      <div className="w-full max-w-[420px] bg-white min-h-screen flex flex-col">
        <HeaderRowWithBack title="Payments" onBack={() => navigate("/dashboard")} />

        <div className="flex-1 overflow-y-auto px-4 pb-4">
          {/* Summary Donut */}
          <div className="mt-4 rounded-xl shadow-md border border-gray-100 p-4">
            <div className="flex items-center gap-4">
              <DonutStat value={summary.total} total={summary.total} label="Total" color="#3b82f6" trackColor="#dbeafe" />
              <div className="flex-1 flex flex-col gap-1 text-xs">
                <div className="flex justify-between"><span className="text-gray-500">Received</span><span className="font-medium text-green-600">₹{summary.received.toLocaleString()}</span></div>
                <div className="flex justify-between"><span className="text-gray-500">Expenditure</span><span className="font-medium text-orange-500">₹{summary.expenditure.toLocaleString()}</span></div>
                <div className="flex justify-between"><span className="text-gray-500">Request</span><span className="font-medium text-blue-600">₹{summary.requested.toLocaleString()}</span></div>
                <div className="flex justify-between"><span className="text-gray-500">Balance</span><span className="font-medium text-purple-600">₹{summary.balance.toLocaleString()}</span></div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 mt-4">
            <button onClick={() => navigate("/request-form")} className="flex-1 flex flex-col items-center gap-1 bg-gray-50 rounded-xl py-4 border border-gray-200">
              <ClipboardList size={20} className="text-blue-600" />
              <span className="text-xs text-gray-700">Request</span>
            </button>
            <button onClick={() => navigate("/request-pending")} className="flex-1 flex flex-col items-center gap-1 bg-gray-50 rounded-xl py-4 border border-gray-200">
              <FileText size={20} className="text-orange-500" />
              <span className="text-xs text-gray-700">Expenditure</span>
            </button>
            <button className="flex-1 flex flex-col items-center gap-1 bg-gray-50 rounded-xl py-4 border border-gray-200">
              <DollarSign size={20} className="text-green-600" />
              <span className="text-xs text-gray-700">Transaction</span>
            </button>
          </div>

          {/* Recent Transactions Table */}
          <div className="mt-4">
            <p className="text-sm font-medium text-gray-800 mb-2">Recent Transactions</p>
            {transactions.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full text-xs">
                  <thead><tr className="text-left text-gray-500 border-b">
                    <th className="pb-2 pr-2">Client ID</th>
                    <th className="pb-2 pr-2">Job ID</th>
                    <th className="pb-2 pr-2">Service</th>
                    <th className="pb-2 pr-2">Step</th>
                    <th className="pb-2">Amount</th>
                  </tr></thead>
                  <tbody>
                    {transactions.map((tx, i) => (
                      <tr key={i} className="border-b border-gray-50">
                        <td className="py-2 pr-2 text-gray-700">{tx.clientId}</td>
                        <td className="py-2 pr-2 text-gray-700">{tx.jobId}</td>
                        <td className="py-2 pr-2 text-gray-700">{tx.service}</td>
                        <td className="py-2 pr-2 text-gray-700">{tx.step}</td>
                        <td className="py-2 font-medium">{tx.amount}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="text-center text-sm text-gray-400 py-6">No transactions yet</p>
            )}
          </div>
        </div>

        <BottomTabBar defaultTab="Transactions" />
      </div>
    </div>
  );
};

export default PaymentsScreen;
