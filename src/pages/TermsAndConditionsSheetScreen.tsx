import { useState } from "react";
import { User, Eye } from "lucide-react";
import AuthHeader from "@/components/AuthHeader";
import TextInputWithIcon from "@/components/TextInputWithIcon";
import BottomSheet from "@/components/BottomSheet";
import CheckboxRow from "@/components/CheckboxRow";
import PrimaryButton from "@/components/PrimaryButton";

const TermsAndConditionsSheetScreen = () => {
  const [mobile, setMobile] = useState("");
  const [otp, setOtp] = useState("");
  const [accepted, setAccepted] = useState(false);
  const [sheetOpen] = useState(true);

  return (
    <div className="relative min-h-screen" style={{ backgroundColor: "#F3F4F6" }}>
      {/* Background login UI */}
      <div className="min-h-screen flex items-center justify-center px-6">
        <div className="w-full max-w-[420px]">
          <AuthHeader />
          <div className="mt-8">
            <label className="block text-sm text-gray-700 mb-2">Enter Your Mobile Number</label>
            <TextInputWithIcon icon={User} value={mobile} onChange={setMobile} placeholder="9812546586" />
          </div>
          <div className="mt-5">
            <label className="block text-sm text-gray-700 mb-2">Enter OTP</label>
            <TextInputWithIcon icon={Eye} value={otp} onChange={setOtp} placeholder="******" type="password" />
            <p className="text-right text-xs text-gray-500 mt-1 cursor-pointer hover:text-blue-600">Resend Code</p>
          </div>
        </div>
      </div>

      {/* Bottom Sheet */}
      <BottomSheet open={sheetOpen}>
        <h2 className="text-lg font-semibold text-gray-900 text-center mb-5">T&C</h2>

        <CheckboxRow
          checked={accepted}
          onChange={setAccepted}
          label="click here to accept Terms & Conditions & Privacy Policy"
        />

        <p className="text-sm text-gray-700 mt-3 leading-relaxed">
          By signing in, creating an account i am agreeing to DigiVault{" "}
          <span className="text-blue-600 underline cursor-pointer">Terms & Conditions</span> and to our{" "}
          <span className="text-blue-600 underline cursor-pointer">Privacy Policy</span>
        </p>

        <div className="mt-8">
          <PrimaryButton
            label="Continue"
            onClick={() => console.log("Continue")}
          />
          {!accepted && (
            <div className="absolute inset-x-0 bottom-0 h-16 pointer-events-none" />
          )}
        </div>
      </BottomSheet>
    </div>
  );
};

export default TermsAndConditionsSheetScreen;
