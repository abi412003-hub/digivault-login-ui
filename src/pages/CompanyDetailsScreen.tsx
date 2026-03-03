import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/lib/AuthContext";
import { supabase } from "@/lib/supabase";
import ScreenHeader from "@/components/ScreenHeader";
import FormField from "@/components/FormField";
import SelectField from "@/components/SelectField";
import TextAreaField from "@/components/TextAreaField";
import PrimaryButton from "@/components/PrimaryButton";
const toast = (opts: any) => { if (opts.variant === 'destructive') alert(opts.description || opts.title); };

const companyTypes = ["Pvt Ltd", "LLP", "Proprietorship", "Partnership", "OPC", "Others"];
const revenueRanges = ["Below 10L", "10L – 50L", "50L – 1Cr", "1Cr – 5Cr", "5Cr+"];
const stateOptions = ["Karnataka", "Tamil Nadu", "Kerala", "Andhra Pradesh", "Telangana", "Maharashtra"];

const CompanyDetailsScreen = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [form, setForm] = useState({
    companyName: "",
    companyType: "",
    gstinPan: "",
    businessRegNumber: "",
    natureOfBusiness: "",
    officeAddress: "",
    state: "",
    district: "",
    taluk: "",
    city: "",
    pincode: "",
    companyWebsite: "",
    numEmployees: "",
    annualRevenue: "",
  });

  const set = (key: string) => (val: string) => {
    setForm((f) => ({ ...f, [key]: val }));
    setErrors((e) => ({ ...e, [key]: "" }));
  };

  const validate = (): boolean => {
    const e: Record<string, string> = {};
    if (!form.companyName || form.companyName.length < 3) e.companyName = "Company name required (min 3 chars)";
    if (!form.companyType) e.companyType = "Select company type";
    if (!form.gstinPan) e.gstinPan = "GST or PAN required";
    if (!form.natureOfBusiness) e.natureOfBusiness = "Nature of business required";
    if (!form.officeAddress || form.officeAddress.length < 10) e.officeAddress = "Address min 10 characters";
    if (!form.state) e.state = "Select state";
    if (!form.pincode || !/^\d{6}$/.test(form.pincode)) e.pincode = "Pincode must be 6 digits";
    if (form.companyWebsite && !/^https?:\/\//.test(form.companyWebsite)) e.companyWebsite = "Enter valid URL (https://)";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleNext = async () => {
    if (!validate() || !user) return;
    setLoading(true);

    const { error: orgErr } = await supabase.from("organisations").insert({
      representative_id: user.id,
      org_name: form.companyName,
      company_type: form.companyType,
      gstin_no: form.gstinPan.length === 15 ? form.gstinPan : null,
      org_pan_no: form.gstinPan.length === 10 ? form.gstinPan : null,
      business_registration_number: form.businessRegNumber || null,
      nature_of_business: form.natureOfBusiness,
      registered_office_address: form.officeAddress,
      state: form.state,
      district: form.district,
      taluk: form.taluk,
      city: form.city,
      pincode: form.pincode,
      company_website: form.companyWebsite || null,
      number_of_employees: form.numEmployees ? parseInt(form.numEmployees) : null,
      annual_revenue_range: form.annualRevenue || null,
    });

    setLoading(false);
    if (orgErr) {
      toast({ title: "Error", description: orgErr.message, variant: "destructive" });
      return;
    }

    sessionStorage.setItem("dp_company", JSON.stringify(form));
    navigate("/work-experience");
  };

  return (
    <div className="min-h-screen bg-white flex justify-center">
      <div className="w-full max-w-[420px] px-5 pb-10">
        <ScreenHeader
          title="Welcome to e-DigiVault"
          subtitle="Secure Access to Documents"
          onBack={() => navigate("/personal-details")}
        />

        <div className="mt-6">
          <h2 className="text-base font-medium text-gray-800">Company Details</h2>
          <div className="border-b border-gray-200 mt-2" />
        </div>

        <div className="mt-5 flex flex-col gap-4">
          <FormField label="Company Name *" value={form.companyName} onChange={set("companyName")} placeholder="Citrine Solutions Pvt. Ltd" error={errors.companyName} />
          <SelectField label="Company Type *" value={form.companyType} onChange={set("companyType")} options={companyTypes} error={errors.companyType} />
          <FormField label="GSTIN / PAN *" value={form.gstinPan} onChange={(v) => set("gstinPan")(v.toUpperCase())} placeholder="29AACCC1234F1Z5" error={errors.gstinPan} />
          <FormField label="Business Registration Number" value={form.businessRegNumber} onChange={set("businessRegNumber")} placeholder="CIN / UDYAM No" />
          <FormField label="Nature of Business *" value={form.natureOfBusiness} onChange={set("natureOfBusiness")} placeholder="Construction, Real Estate, IT..." error={errors.natureOfBusiness} />
          
          <TextAreaField label="Office Address *" value={form.officeAddress} onChange={set("officeAddress")} placeholder="34, TechPark Lane, Koramangala..." error={errors.officeAddress} />

          <SelectField label="State *" value={form.state} onChange={set("state")} options={stateOptions} error={errors.state} />
          <FormField label="District" value={form.district} onChange={set("district")} placeholder="Bengaluru Urban" />
          <FormField label="Taluk" value={form.taluk} onChange={set("taluk")} placeholder="Bengaluru North" />
          <FormField label="City" value={form.city} onChange={set("city")} placeholder="Bengaluru" />
          <FormField label="Pincode *" value={form.pincode} onChange={set("pincode")} placeholder="560034" error={errors.pincode} />

          <div className="border-b border-gray-200 my-2" />

          <FormField label="Company Website" value={form.companyWebsite} onChange={set("companyWebsite")} placeholder="https://example.com" error={errors.companyWebsite} />
          <FormField label="Number of Employees" value={form.numEmployees} onChange={set("numEmployees")} placeholder="45" />
          <SelectField label="Annual Revenue Range" value={form.annualRevenue} onChange={set("annualRevenue")} options={revenueRanges} />
        </div>

        <div className="flex justify-end mt-8">
          <PrimaryButton label={loading ? "Saving..." : "Next"} onClick={handleNext} disabled={loading} />
        </div>
      </div>
    </div>
  );
};

export default CompanyDetailsScreen;
