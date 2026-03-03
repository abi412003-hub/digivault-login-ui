import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/lib/AuthContext";
import { supabase } from "@/lib/supabase";
import InfoCard from "@/components/InfoCard";
import GearIllustration from "@/components/GearIllustration";
import PrimaryButton from "@/components/PrimaryButton";

const RegistrationProcessingScreen = () => {
  const navigate = useNavigate();
  const { user, profile, refreshProfile } = useAuth();
  const [regData, setRegData] = useState({
    registrationId: "—",
    date: new Date().toLocaleDateString("en-IN"),
    name: "—",
    company: "—",
    contact: "—",
  });

  useEffect(() => {
    const loadData = async () => {
      if (!user) return;
      await refreshProfile();

      // Fetch DP profile for registration ID
      const { data: dp } = await supabase
        .from("delivery_partner_profiles")
        .select("registration_id")
        .eq("user_id", user.id)
        .maybeSingle();

      // Fetch user data
      const { data: u } = await supabase
        .from("users")
        .select("full_name, mobile")
        .eq("id", user.id)
        .maybeSingle();

      // Fetch org if exists
      const { data: org } = await supabase
        .from("organisations")
        .select("org_name")
        .eq("representative_id", user.id)
        .maybeSingle();

      setRegData({
        registrationId: dp?.registration_id || "CD-XXXXX",
        date: new Date().toLocaleDateString("en-IN"),
        name: u?.full_name || "—",
        company: org?.org_name || "N/A",
        contact: u?.mobile || "—",
      });
    };
    loadData();
  }, [user]);

  const rows = [
    { label: "Registration ID", value: regData.registrationId },
    { label: "Date of Registration", value: regData.date },
    { label: "Channel Delivery Name", value: regData.name },
    { label: "Company Name", value: regData.company },
    { label: "Contact Number", value: regData.contact },
  ];

  return (
    <div className="min-h-screen bg-white flex justify-center">
      <div className="w-full max-w-[420px] px-5 flex flex-col items-center pt-12 pb-10">
        <h2 className="text-lg font-bold text-gray-800 text-center">You will be notified!</h2>
        <p className="text-sm text-gray-500 text-center mt-1">
          Once our team verifies your details.
        </p>

        <div className="w-full mt-6">
          <InfoCard rows={rows} />
        </div>

        <div className="mt-8">
          <GearIllustration />
        </div>

        <p className="text-sm text-gray-500 mt-4 text-center">
          Thank you for your patience
        </p>

        <div className="w-full mt-8 flex flex-col gap-3">
          <PrimaryButton label="Back to Login" onClick={() => navigate("/login")} />
          <button
            onClick={() => window.open("https://wa.me/919876543210", "_blank")}
            className="text-sm text-blue-600 underline text-center"
          >
            Contact Support (WhatsApp)
          </button>
        </div>
      </div>
    </div>
  );
};

export default RegistrationProcessingScreen;
