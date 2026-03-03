import { useState } from "react";
import ScreenHeader from "@/components/ScreenHeader";
import FormField from "@/components/FormField";
import SelectField from "@/components/SelectField";
import TextAreaField from "@/components/TextAreaField";

const CompanyDetailsScreen = () => {
  const [form, setForm] = useState({
    companyName: "Citrine Solutions Pvt. Ltd",
    companyType: "Pvt.Ltd",
    gstin: "29AACCC1234F1Z5",
    regNumber: "+91 8544 8138 02",
    nature: "Construction",
    officeAddress: "34, TechPark Lane, Koramangala, Bangalore, Karnataka - 560034",
    state: "Karnataka",
    district: "Bengaluru Urban",
    taluk: "Bengaluru North",
    city: "Bengaluru",
    pincode: "560034",
    website: "citrineconstruction.com",
    employees: "45",
    revenue: "1Cr - 1.5Cr",
  });

  const set = (key: string) => (val: string) => setForm((f) => ({ ...f, [key]: val }));

  return (
    <div className="min-h-screen bg-white flex justify-center">
      <div className="w-full max-w-[420px] px-5 pb-10">
        <ScreenHeader title="Welcome to e-DigiVault" subtitle="Secure Access to Documents" onBack={() => console.log("Back")} />

        <div className="mt-6">
          <h2 className="text-base font-medium text-gray-800">Company Details</h2>
          <div className="border-b border-gray-200 mt-2" />
        </div>

        <div className="mt-5 flex flex-col gap-5">
          <FormField label="Company Name" value={form.companyName} onChange={set("companyName")} />
          <FormField label="Company Type" value={form.companyType} onChange={set("companyType")} />
          <FormField label="GSTIN / PAN" value={form.gstin} onChange={set("gstin")} />
          <FormField label="Business Registration Number" value={form.regNumber} onChange={set("regNumber")} />
          <FormField label="Nature of Business" value={form.nature} onChange={set("nature")} />
          <TextAreaField label="Office Address" value={form.officeAddress} onChange={set("officeAddress")} />

          <div>
            <p className="text-sm text-gray-700 font-medium">Office Address</p>
          </div>

          <SelectField label="State" value={form.state} onChange={set("state")} options={["Karnataka", "Tamil Nadu", "Kerala", "Andhra Pradesh"]} />
          <SelectField label="District" value={form.district} onChange={set("district")} options={["Bengaluru Urban", "Bengaluru Rural", "Mysuru"]} />
          <SelectField label="Taluk" value={form.taluk} onChange={set("taluk")} options={["Bengaluru North", "Bengaluru South", "Bengaluru East"]} />
          <SelectField label="City" value={form.city} onChange={set("city")} options={["Bengaluru", "Mysuru", "Hubli"]} />
          <FormField label="Pincode" value={form.pincode} onChange={set("pincode")} />
          <FormField label="Company Website" value={form.website} onChange={set("website")} />
          <FormField label="Number of Employess" value={form.employees} onChange={set("employees")} />
          <FormField label="Annual Revenue Range" value={form.revenue} onChange={set("revenue")} />
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

export default CompanyDetailsScreen;
