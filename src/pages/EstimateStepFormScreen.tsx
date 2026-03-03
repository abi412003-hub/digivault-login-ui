import { useState } from "react";
import BottomTabBar from "@/components/BottomTabBar";
import ExpensePill from "@/components/ExpensePill";

const EstimateStepFormScreen = () => {
  const [process, setProcess] = useState("Step 1");
  const [fromDate, setFromDate] = useState("12-4-2025");
  const [toDate, setToDate] = useState("14-4-2025");
  const [description, setDescription] = useState("");
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [department, setDepartment] = useState("");

  const inputClass = "w-full border border-gray-300 rounded-md h-11 px-4 text-sm text-gray-800 placeholder-gray-400 focus:ring-2 focus:ring-blue-200 focus:border-blue-500 outline-none";

  return (
    <div className="min-h-screen bg-gray-50 flex justify-center">
      <div className="w-full max-w-[420px] bg-white min-h-screen flex flex-col">
        <div className="flex-1 overflow-y-auto px-5 py-6 pb-24">
          <h1 className="text-xl font-bold text-blue-600 mb-5">Step 1</h1>

          {/* Process */}
          <label className="text-sm font-medium text-gray-700">Process</label>
          <input className={`${inputClass} mt-1 mb-4`} value={process} onChange={(e) => setProcess(e.target.value)} />

          {/* Date */}
          <label className="text-sm font-medium text-gray-700">Date</label>
          <p className="text-xs text-gray-500 mt-1">From</p>
          <input className={`${inputClass} mt-1`} value={fromDate} onChange={(e) => setFromDate(e.target.value)} />
          <p className="text-xs text-gray-500 mt-3">To</p>
          <input className={`${inputClass} mt-1`} value={toDate} onChange={(e) => setToDate(e.target.value)} />
          <p className="text-xs text-gray-500 text-right mt-1 mb-4">in 2 Days</p>

          {/* Expense */}
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-medium text-gray-800">Expense</span>
            <button onClick={() => console.log("Add expense")} className="bg-blue-700 text-white rounded-md px-6 py-2 text-sm font-medium">
              Add
            </button>
          </div>
          <ExpensePill label="Misc Expense" amount={100} onEdit={() => console.log("Edit expense")} />

          {/* Description */}
          <label className="text-sm font-medium text-gray-700 block mt-5">Description</label>
          <input className={`${inputClass} mt-1`} placeholder="Describe" value={description} onChange={(e) => setDescription(e.target.value)} />
          <p className="text-xs text-right mt-1 mb-4">
            <span className="text-gray-500">Max </span><span className="text-red-500">50</span><span className="text-gray-500"> word</span>
          </p>

          {/* Contact Information */}
          <label className="text-sm font-medium text-gray-700 block mb-2">Contact Information</label>
          <input className={`${inputClass} mb-2`} placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
          <input className={`${inputClass} mb-2`} placeholder="Number" value={number} onChange={(e) => setNumber(e.target.value)} />
          <input className={`${inputClass} mb-4`} placeholder="Department" value={department} onChange={(e) => setDepartment(e.target.value)} />

          {/* Bottom actions */}
          <div className="flex items-center justify-between">
            <button onClick={() => console.log("Cancel")} className="text-red-500 text-sm font-medium">Cancel</button>
            <button onClick={() => console.log("Submit step (UI only)")} className="bg-blue-700 text-white rounded-md px-10 py-3 text-sm font-medium hover:bg-blue-800">
              Add
            </button>
          </div>
        </div>

        <BottomTabBar defaultTab="Client" />
      </div>
    </div>
  );
};

export default EstimateStepFormScreen;
