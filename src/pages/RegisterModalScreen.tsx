import { useState } from "react";
import { User, Eye } from "lucide-react";
import AuthHeader from "@/components/AuthHeader";
import TextInputWithIcon from "@/components/TextInputWithIcon";
import PrimaryButton from "@/components/PrimaryButton";
import Modal from "@/components/Modal";

const RegisterModalScreen = () => {
  const [mobile, setMobile] = useState("");
  const [otp, setOtp] = useState("");
  const [regMobile, setRegMobile] = useState("");
  const [isRegisterOpen, setIsRegisterOpen] = useState(true);

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

      {/* Dim overlay */}
      {isRegisterOpen && <div className="fixed inset-0 z-40 bg-black/35" />}

      {/* Register modal */}
      <Modal open={isRegisterOpen} onClose={() => setIsRegisterOpen(false)}>
        <h2 className="text-lg font-medium text-blue-700 text-center mb-5">Register</h2>

        <label className="block text-sm text-gray-700 mb-2">Enter Your Mobile Number</label>
        <TextInputWithIcon icon={User} value={regMobile} onChange={setRegMobile} placeholder="9812546586" />

        <div className="mt-5">
          <PrimaryButton label="Send OTP" onClick={() => console.log("Send OTP clicked")} />
        </div>

        <p className="text-center text-sm text-gray-500 mt-5">
          Already have an account?{" "}
          <span
            className="text-blue-600 font-medium cursor-pointer underline"
            onClick={() => {
              console.log("Login clicked");
              setIsRegisterOpen(false);
            }}
          >
            Login
          </span>
        </p>
      </Modal>
    </div>
  );
};

export default RegisterModalScreen;
