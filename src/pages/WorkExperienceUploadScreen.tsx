import { useState } from "react";
import TopTitleBar from "@/components/TopTitleBar";
import FormField from "@/components/FormField";
import UploadField from "@/components/UploadField";

const uploads = [
  "Self Acknowledgement",
  "Upload - Personal Pan Card",
  "Upload - Adhar Card",
  "Upload - GST Document",
  "Upload - Passport size photo",
  "Upload - Firm Registration Details",
];

const WorkExperienceUploadScreen = () => {
  const [form, setForm] = useState({
    experience: "6",
    serviceAreas: "Banglore",
    incorporation: "U12345KA2020PTC123456",
  });

  const set = (key: string) => (val: string) => setForm((f) => ({ ...f, [key]: val }));

  return (
    <div className="min-h-screen bg-white flex justify-center">
      <div className="w-full max-w-[420px] px-5 pb-10">
        <TopTitleBar title="Work Experience" onBack={() => console.log("Back")} />

        <div className="mt-5 flex flex-col gap-5">
          <FormField label="Years of Experience in Real Estate" value={form.experience} onChange={set("experience")} />
          <FormField label="Primary Service Areas" value={form.serviceAreas} onChange={set("serviceAreas")} />
          <FormField label="Incorporation Number" value={form.incorporation} onChange={set("incorporation")} />
        </div>

        <p className="text-sm font-medium text-gray-700 mt-6 mb-4">Upload Necessary Documents</p>

        <div className="flex flex-col gap-4">
          {uploads.map((name) => (
            <UploadField key={name} label={name} onClick={() => console.log(`Upload clicked: ${name}`)} />
          ))}
        </div>

        <div className="flex justify-end mt-8">
          <button onClick={() => console.log("Next")} className="bg-blue-700 text-white rounded-md px-8 py-3 font-medium shadow-sm hover:bg-blue-800 transition-colors">
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default WorkExperienceUploadScreen;
