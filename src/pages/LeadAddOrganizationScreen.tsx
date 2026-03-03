import { useState } from "react";
import HeaderRowWithBack from "@/components/HeaderRowWithBack";
import BottomTabBar from "@/components/BottomTabBar";
import { Plus } from "lucide-react";

const fields = [
  { label: "Organisation Name", placeholder: "Citrine Solutions Pvt. Ltd", type: "input" },
  { label: "Registered Office Address", placeholder: "34, TechPark Lane, Koramangala, Bangalore, Karnataka - 560034", type: "textarea" },
  { label: "Date of Establishment", placeholder: "12 March 2017", type: "input" },
  { label: "Type of Organisation", placeholder: "Private Limited Company", type: "input" },
  { label: "Name of the Owner", placeholder: "Rajesh Kumar", type: "input" },
  { label: "Ownership Status", placeholder: "Individual Business", type: "input" },
];

const radioOptions = ["Personal", "Organization", "Service"];

const LeadAddOrganizationScreen = () => {
  const [selectedRadio, setSelectedRadio] = useState("Organization");
  const inputClass = "w-full border border-gray-300 rounded-lg h-12 px-4 text-sm text-gray-700 placeholder-gray-400 focus:ring-2 focus:ring-blue-200 focus:border-blue-500 outline-none";

  return (
    <div className="min-h-screen bg-gray-50 flex justify-center">
      <div className="w-full max-w-[420px] bg-white min-h-screen flex flex-col">
        <HeaderRowWithBack title="Lead" onBack={() => console.log("Back")} />

        <div className="flex-1 overflow-y-auto pb-24">
          {/* Subtitle */}
          <p className="text-sm text-gray-700 text-center mt-3 pb-2 border-b border-gray-200">Add New Lead</p>

          {/* Upload avatar */}
          <div className="flex flex-col items-center mt-4 mb-3">
            <div className="relative w-24 h-24">
              <div className="w-24 h-24 rounded-full bg-amber-200 overflow-hidden">
                <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face" alt="Avatar" className="w-full h-full object-cover opacity-70" />
              </div>
              <button onClick={() => console.log("Upload photo")} className="absolute bottom-0 right-0 w-7 h-7 rounded-full bg-blue-600 flex items-center justify-center">
                <Plus size={14} className="text-white" />
              </button>
            </div>
            <span className="text-xs text-gray-500 mt-1">Upload Photo</span>
          </div>

          {/* Radio row */}
          <div className="flex justify-center gap-6 mb-4">
            {radioOptions.map((opt) => (
              <label key={opt} className="flex items-center gap-1.5 text-sm text-gray-700 cursor-pointer">
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${selectedRadio === opt ? "border-blue-600" : "border-gray-300"}`}>
                  {selectedRadio === opt && <div className="w-2.5 h-2.5 rounded-full bg-blue-600" />}
                </div>
                <input type="radio" className="hidden" checked={selectedRadio === opt} onChange={() => setSelectedRadio(opt)} />
                {opt}
              </label>
            ))}
          </div>

          {/* Section header */}
          <div className="px-5 mb-3">
            <h3 className="text-base font-medium text-gray-700 pb-2 border-b border-gray-200">Organization Details</h3>
          </div>

          {/* Form fields */}
          <div className="px-5 space-y-4">
            {fields.map((f) => (
              <div key={f.label}>
                <label className="text-sm text-gray-700 mb-1 block">{f.label}</label>
                {f.type === "textarea" ? (
                  <textarea className={`${inputClass} h-20 py-3 resize-none`} placeholder={f.placeholder} />
                ) : (
                  <input className={inputClass} placeholder={f.placeholder} />
                )}
              </div>
            ))}
          </div>

          {/* Action buttons */}
          <div className="flex justify-center gap-6 mt-6 mb-6 px-5">
            <button onClick={() => console.log("Skip")} className="bg-blue-700 text-white rounded-md px-10 py-3 text-sm font-medium">Skip</button>
            <button onClick={() => console.log("Next")} className="bg-blue-700 text-white rounded-md px-10 py-3 text-sm font-medium">Next</button>
          </div>
        </div>

        <BottomTabBar defaultTab="Leads" />
      </div>
    </div>
  );
};

export default LeadAddOrganizationScreen;
