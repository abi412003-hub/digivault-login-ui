import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { User, Building2 } from "lucide-react";
import BackButtonIcon from "@/components/BackButtonIcon";
import AuthHeader from "@/components/AuthHeader";
import PrimaryButton from "@/components/PrimaryButton";

const SelectUserTypeScreen = () => {
  const navigate = useNavigate();
  const [selected, setSelected] = useState<"individual" | "organization" | null>(null);

  const handleContinue = () => {
    if (!selected) return;
    sessionStorage.setItem("dp_user_type", selected);
    navigate("/personal-details");
  };

  return (
    <div className="min-h-screen bg-white flex justify-center">
      <div className="w-full max-w-[420px] px-5 pb-10">
        <div className="flex items-center gap-3 mt-6">
          <BackButtonIcon onClick={() => navigate("/terms")} />
        </div>

        <AuthHeader />

        <p className="text-sm text-gray-600 text-center mt-6">
          Please choose how you'd like to Register
        </p>

        <div className="flex gap-4 mt-6 justify-center">
          <button
            onClick={() => setSelected("individual")}
            className={`w-36 h-24 rounded-lg flex flex-col items-center justify-center gap-2 cursor-pointer transition-all active:scale-[0.98] ${
              selected === "individual"
                ? "bg-blue-700 text-white ring-2 ring-blue-700"
                : "bg-[#E6ECFF] text-blue-900 hover:bg-blue-200/60"
            }`}
          >
            <User size={28} />
            <span className="text-sm font-medium">Individual</span>
          </button>

          <button
            onClick={() => setSelected("organization")}
            className={`w-36 h-24 rounded-lg flex flex-col items-center justify-center gap-2 cursor-pointer transition-all active:scale-[0.98] ${
              selected === "organization"
                ? "bg-blue-700 text-white ring-2 ring-blue-700"
                : "bg-[#E6ECFF] text-blue-900 hover:bg-blue-200/60"
            }`}
          >
            <Building2 size={28} />
            <span className="text-sm font-medium">Organization</span>
          </button>
        </div>

        <div className="mt-8 bg-gray-50 rounded-lg p-4">
          <p className="text-xs font-medium text-gray-600 mb-1">Note:</p>
          <p className="text-xs text-gray-500">Register as an Individual for Personal use.</p>
          <p className="text-xs text-gray-500">Register as a Business or Organization.</p>
          <p className="text-xs text-gray-500">Register as a Land Aggregator.</p>
        </div>

        <div className="mt-8">
          <PrimaryButton
            label="Continue"
            onClick={handleContinue}
          />
        </div>
      </div>
    </div>
  );
};

export default SelectUserTypeScreen;
