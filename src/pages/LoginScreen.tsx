import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/lib/AuthContext";
import InputField from "@/components/InputField";
import PrimaryButton from "@/components/PrimaryButton";

const LoginScreen = () => {
  const navigate = useNavigate();
  const { sendOtp, verifyOtp } = useAuth();
  const [mobile, setMobile] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState<"phone" | "otp">("phone");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSendOtp = async () => {
    if (mobile.length !== 10) {
      setError("Phone number must be 10 digits");
      return;
    }
    setLoading(true);
    setError("");
    const result = await sendOtp(mobile);
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
    const result = await verifyOtp(mobile, otp);
    setLoading(false);
    if (result.success) {
      if (result.isNew) {
        navigate("/terms");
      } else {
        navigate("/dashboard");
      }
    } else {
      setError(result.error || "Invalid OTP");
    }
  };

  const handleResend = async () => {
    setError("");
    setLoading(true);
    const result = await sendOtp(mobile);
    setLoading(false);
    if (!result.success) setError(result.error || "Failed to resend");
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6 bg-gray-100">
      <div className="w-full max-w-[420px]">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-xl font-semibold text-gray-800">Welcome to e-DigiVault</h1>
          <p className="text-sm text-gray-500 mt-1">Secure Access to Documents</p>
        </div>

        {step === "phone" ? (
          <>
            <div className="mt-8">
              <label className="block text-sm text-gray-700 mb-2">Enter Your Mobile Number</label>
              <InputField
                value={mobile}
                onChange={setMobile}
                placeholder="9812546586"
              />
            </div>
            {error && <p className="text-red-500 text-xs mt-2">{error}</p>}
            <div className="mt-6">
              <PrimaryButton
                label={loading ? "Sending OTP..." : "Login"}
                onClick={handleSendOtp}
              />
            </div>
            <p className="text-center text-sm text-gray-500 mt-6">
              Don't have an account?{" "}
              <span
                className="text-blue-600 font-medium underline cursor-pointer"
                onClick={() => navigate("/register")}
              >
                Register
              </span>
            </p>
          </>
        ) : (
          <>
            <div className="mt-8">
              <label className="block text-sm text-gray-700 mb-2">Enter OTP</label>
              <p className="text-xs text-gray-400 mb-2">
                Verification code sent to +91 {mobile}
              </p>
              <InputField
                value={otp}
                onChange={setOtp}
                placeholder="Enter 6-digit OTP"
              />
            </div>
            {error && <p className="text-red-500 text-xs mt-2">{error}</p>}
            <div className="flex justify-end mt-2">
              <button
                onClick={handleResend}
                className="text-blue-600 text-xs font-medium"
                disabled={loading}
              >
                Resend Code
              </button>
            </div>
            <div className="mt-4">
              <PrimaryButton
                label={loading ? "Verifying..." : "Verify & Continue"}
                onClick={handleVerifyOtp}
              />
            </div>
            <button
              onClick={() => { setStep("phone"); setOtp(""); setError(""); }}
              className="block mx-auto mt-4 text-sm text-gray-500 underline"
            >
              Change number
            </button>
          </>
        )}

        <p className="text-center text-xs text-gray-400 mt-8">
          Don't have an account? Contact Administrator
        </p>
      </div>
    </div>
  );
};

export default LoginScreen;
