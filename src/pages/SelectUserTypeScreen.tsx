import { User, Building2 } from "lucide-react";
import BackButtonIcon from "@/components/BackButtonIcon";
import AuthHeader from "@/components/AuthHeader";
import ChoiceCard from "@/components/ChoiceCard";

const SelectUserTypeScreen = () => (
  <div className="min-h-screen bg-white flex justify-center">
    <div className="w-full max-w-[420px] px-6 pt-4 flex flex-col">
      <BackButtonIcon onClick={() => console.log("Back")} />

      <div className="mt-6">
        <AuthHeader />
      </div>

      <p className="text-center text-base text-gray-700 mt-8">
        Please choose how you'd like to Register
      </p>

      <div className="flex justify-center gap-5 mt-8">
        <ChoiceCard icon={User} label="Individual" onClick={() => console.log("Individual selected")} />
        <ChoiceCard icon={Building2} label="Organization" onClick={() => console.log("Organization selected")} />
      </div>

      <div className="mt-auto mb-16 px-1">
        <p className="text-sm font-semibold text-gray-800">Note:</p>
        <div className="mt-1 text-sm text-gray-500 leading-relaxed">
          <p>Register as an Individual for Personal use.</p>
          <p>Register as a Business or Organization.</p>
          <p>Register as a Land Aggregator.</p>
        </div>
      </div>
    </div>
  </div>
);

export default SelectUserTypeScreen;
