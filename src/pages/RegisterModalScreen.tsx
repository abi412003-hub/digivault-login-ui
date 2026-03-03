import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { User, Eye } from "lucide-react";
import { useAuth } from "@/lib/AuthContext";
import AuthHeader from "@/components/AuthHeader";
import TextInputWithIcon from "@/components/TextInputWithIcon";
import PrimaryButton from "@/components/PrimaryButton";
import Modal from "@/components/Modal";

const RegisterModalScreen = () => {
  const navigate = useNavigate();
  const { sendOtp, verifyOtp } = useAuth();
  const [regMobile, setRegMobile] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState<"phone" | "otp">("phone");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSendOtp = async () => {
    if (regMobile.replace(/\D/g, "").length !== 10) {
      setError("Phone number must be 10 digits");
      return;
    }
    setLoading(true);
    setError("");
    const result = await sendOtp(regMobile);
    setLoading(false);
    if (result.success) {
      setStep("otp");
    } else {
      setError(result.error || "Failed to send OTP");
    }
  };

  const handleVerifyOtp = async () => {
    if (otp.length < 6) {
      setError("Enter the 6-digit OTP");
      return;
    }
    setLoading(true);
    setError("");
    const result = await verifyOtp(regMobile, otp);
    setLoading(false);
    if (result.success) {
      // Registration flow — always go to T&C first
      navigate("/terms");
    } else {
      setError(result.error || "Invalid OTP");
    }
  };

  return (
    <div className="relative min-h-screen" style={{ backgroundColor: "#F3F4F6" }}>
      {/* Background login UI (dimmed) */}
      <div className="min-h-screen flex items-center justify-center px-6">
        <div className="w-full max-w-[420px]">
          <AuthHeader />
        </div>
      </div>

      {/* Dim overlay */}
      <div className="fixed inset-0 z-40 bg-black/35" />

      {/* Register modal */}
      <Modal open={true} onClose={() => navigate("/login")}>
        <h2 className="text-lg font-medium text-blue-700 text-center mb-5">Register</h2>

        {step === "phone" ? (
          <>
            <label className="block text-sm text-gray-700 mb-2">Enter Your Mobile Number</label>
            <TextInputWithIcon icon={User} value={regMobile} onChange={setRegMobile} placeholder="9812546586" />
            {error && <p className="text-red-500 text-xs mt-2">{error}</p>}
            <div className="mt-5">
              <PrimaryButton label={loading ? "Sending OTP..." : "Send OTP"} onClick={handleSendOtp} disabled={loading} />
            </div>
          </>
        ) : (
          <>
            <label className="block text-sm text-gray-700 mb-2">Enter OTP</label>
            <p className="text-xs text-gray-400 mb-2">Verification code sent to +91 {regMobile}</p>
            <TextInputWithIcon icon={Eye} value={otp} onChange={setOtp} placeholder="Enter 6-digit OTP" type="password" />
            {error && <p className="text-red-500 text-xs mt-2">{error}</p>}
            <div className="flex justify-end mt-2">
              <button onClick={handleSendOtp} className="text-blue-600 text-xs font-medium" disabled={loading}>Resend Code</button>
            </div>
            <div className="mt-4">
              <PrimaryButton label={loading ? "Verifying..." : "Verify & Register"} onClick={handleVerifyOtp} disabled={loading} />
            </div>
            <button onClick={() => { setStep("phone"); setOtp(""); setError(""); }} className="block mx-auto mt-3 text-sm text-gray-500 underline">Change number</button>
          </>
        )}

        <p className="text-center text-sm text-gray-500 mt-5">
          Already have an account?{" "}
          <span className="text-blue-600 font-medium cursor-pointer underline" onClick={() => navigate("/login")}>Login</span>
        </p>
      </Modal>
    </div>
  );
};

export default RegisterModalScreen;
