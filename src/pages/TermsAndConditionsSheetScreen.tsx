import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/lib/AuthContext";
import { supabase } from "@/lib/supabase";
import AuthHeader from "@/components/AuthHeader";
import PrimaryButton from "@/components/PrimaryButton";

const TermsAndConditionsSheetScreen = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [accepted, setAccepted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleContinue = async () => {
    if (!accepted || !user) return;
    setLoading(true);
    setError("");

    const { error: dbError } = await supabase.from("tc_acceptances").insert({
      user_id: user.id,
      mobile: user.phone?.replace("+91", "") || "",
      accepted: true,
      user_agent: navigator.userAgent,
    });

    setLoading(false);
    if (dbError) {
      setError("Failed to save. Please try again.");
      return;
    }
    navigate("/select-type");
  };

  return (
    <div className="min-h-screen bg-white flex justify-center">
      <div className="w-full max-w-[420px] flex flex-col min-h-screen">
        <div className="px-5 pt-6">
          <AuthHeader />
        </div>

        <div className="flex-1 px-5 pb-6 flex flex-col">
          {/* T&C Content */}
          <div className="mt-6 bg-gray-50 rounded-xl p-4 flex-1 overflow-y-auto max-h-[50vh]">
            <h2 className="text-base font-semibold text-gray-800 mb-3">Terms & Conditions</h2>
            <div className="text-xs text-gray-600 space-y-2 leading-relaxed">
              <p>By registering as a Delivery Partner on e-DigiVault, you agree to the following terms and conditions governing your use of the platform.</p>
              <p><strong>1. Service Agreement:</strong> You agree to perform document collection, verification, and delivery services as assigned through the platform.</p>
              <p><strong>2. Data Privacy:</strong> All client information, documents, and transaction details accessed through the platform are strictly confidential.</p>
              <p><strong>3. Document Handling:</strong> You shall handle all property documents with utmost care and maintain chain of custody at all times.</p>
              <p><strong>4. Compliance:</strong> You agree to comply with all applicable laws and regulations of Karnataka state and India.</p>
              <p><strong>5. Code of Conduct:</strong> Professional behaviour is expected at all government offices including BBMP, Sub-Registrar, and RTC offices.</p>
              <p><strong>6. Financial Transparency:</strong> All expenses must be accurately reported through the platform's expenditure tracking system.</p>
              <p><strong>7. Account Security:</strong> You are responsible for maintaining the security of your account credentials.</p>
              <p><strong>8. Termination:</strong> Either party may terminate this agreement with written notice.</p>
            </div>
          </div>

          {/* Checkbox */}
          <label className="flex items-start gap-3 mt-5 cursor-pointer">
            <input
              type="checkbox"
              checked={accepted}
              onChange={(e) => setAccepted(e.target.checked)}
              className="mt-0.5 w-5 h-5 rounded border-gray-300 text-blue-700 focus:ring-blue-500"
            />
            <span className="text-xs text-gray-600 leading-relaxed">
              I agree to the{" "}
              <span className="text-blue-600 underline">Terms & Conditions</span> and{" "}
              <span className="text-blue-600 underline">Privacy Policy</span>
            </span>
          </label>

          <p className="text-[10px] text-gray-400 mt-2 px-8">
            By signing in, creating an account I am agreeing to DigiVault Terms of Service and to our Privacy Policy
          </p>

          {error && <p className="text-red-500 text-xs mt-2 text-center">{error}</p>}

          {/* Continue Button */}
          <div className="mt-5">
            <PrimaryButton
              label={loading ? "Saving..." : "Continue"}
              onClick={handleContinue}
              disabled={!accepted || loading}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsAndConditionsSheetScreen;
