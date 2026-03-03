import InfoCard from "@/components/InfoCard";
import GearIllustration from "@/components/GearIllustration";

const rows = [
  { label: "Registration ID", value: "CD-56799" },
  { label: "Date of Registration", value: "12-06-2024" },
  { label: "Channel Delivery Name", value: "Kavya" },
  { label: "Company Name", value: "Citrine" },
  { label: "Contact Number", value: "9298485688" },
];

const RegistrationProcessingScreen = () => (
  <div className="min-h-screen bg-white flex justify-center">
    <div className="w-full max-w-[420px] px-5">
      <div className="text-center mt-10">
        <h1 className="text-lg font-semibold text-gray-900">You will be notified!</h1>
        <p className="text-sm text-gray-700 mt-1">Once our team verifies your details.</p>
      </div>

      <div className="mt-6">
        <InfoCard rows={rows} />
      </div>

      <GearIllustration />

      <p className="text-center text-sm text-gray-500 mt-5">Thank you for your patience</p>
    </div>
  </div>
);

export default RegistrationProcessingScreen;
