import { useState } from "react";
import ScreenHeader from "@/components/ScreenHeader";
import FormField from "@/components/FormField";
import SelectField from "@/components/SelectField";
import TextAreaField from "@/components/TextAreaField";

const PersonalDetailsScreen = () => {
  const [form, setForm] = useState({
    fullName: "Kavya",
    email: "kavya123@gmail.com",
    phone: "9298486678",
    whatsapp: "9480258902",
    address: "34, Park Lane, Koramangala, Bangalore, Karnataka - 560034",
    state: "Karnataka",
    district: "Bengaluru Urban",
    taluk: "Bengaluru North",
    city: "Bengaluru",
    pincode: "560034",
    aadhar: "9400 8123 3432",
    pan: "OHAPS0023",
  });

  const set = (key: string) => (val: string) => setForm((f) => ({ ...f, [key]: val }));

  return (
    <div className="min-h-screen bg-white flex justify-center">
      <div className="w-full max-w-[420px] px-5 pb-10">
        <ScreenHeader title="Welcome to e-DigiVault" subtitle="Secure Access to Documents" onBack={() => console.log("Back")} />

        <div className="mt-6">
          <h2 className="text-base font-medium text-gray-800">Personal Details</h2>
          <div className="border-b border-gray-200 mt-2" />
        </div>

        <div className="mt-5 flex flex-col gap-5">
          <FormField label="Full Name" value={form.fullName} onChange={set("fullName")} placeholder="Kavya" />
          <FormField label="Email" value={form.email} onChange={set("email")} placeholder="kavya123@gmail.com" />
          <FormField label="Phone No" value={form.phone} onChange={set("phone")} placeholder="9298486678" />
          <FormField label="WhatsApp No" value={form.whatsapp} onChange={set("whatsapp")} placeholder="9480258902" />
          <TextAreaField label="Address" value={form.address} onChange={set("address")} placeholder="34, Park Lane, Koramangala, Bangalore, Karnataka - 560034" />
          <SelectField label="State" value={form.state} onChange={set("state")} options={["Karnataka", "Tamil Nadu", "Kerala", "Andhra Pradesh"]} />
          <SelectField label="District" value={form.district} onChange={set("district")} options={["Bengaluru Urban", "Bengaluru Rural", "Mysuru"]} />
          <SelectField label="Taluk" value={form.taluk} onChange={set("taluk")} options={["Bengaluru North", "Bengaluru South", "Bengaluru East"]} />
          <SelectField label="City" value={form.city} onChange={set("city")} options={["Bengaluru", "Mysuru", "Hubli"]} />
          <FormField label="Pincode" value={form.pincode} onChange={set("pincode")} placeholder="560034" />
          <FormField label="Aadhar No" value={form.aadhar} onChange={set("aadhar")} placeholder="9400 8123 3432" />
          <FormField label="Pan No" value={form.pan} onChange={set("pan")} placeholder="OHAPS0023" />
        </div>

        <div className="flex justify-end mt-8">
          <button
            onClick={() => console.log("Next")}
            className="bg-blue-700 text-white rounded-md px-8 py-3 font-medium shadow-sm hover:bg-blue-800 transition-colors"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default PersonalDetailsScreen;
