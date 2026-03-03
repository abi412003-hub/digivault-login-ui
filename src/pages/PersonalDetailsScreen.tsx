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

const stateOptions = ["Karnataka", "Tamil Nadu", "Kerala", "Andhra Pradesh", "Telangana", "Maharashtra", "Goa"];
const districtMap: Record<string, string[]> = {
  Karnataka: ["Bengaluru Urban", "Bengaluru Rural", "Mysuru", "Mangalore", "Hubli-Dharwad", "Tumkur"],
  "Tamil Nadu": ["Chennai", "Coimbatore", "Madurai", "Salem"],
  Kerala: ["Thiruvananthapuram", "Kochi", "Kozhikode"],
};
const talukMap: Record<string, string[]> = {
  "Bengaluru Urban": ["Bengaluru North", "Bengaluru South", "Bengaluru East", "Anekal"],
  "Bengaluru Rural": ["Devanahalli", "Doddaballapur", "Hosakote", "Nelamangala"],
  Mysuru: ["Mysuru", "Nanjangud", "T. Narasipura", "Hunsur"],
};

const PersonalDetailsScreen = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [sameAsPhone, setSameAsPhone] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: user?.phone?.replace("+91", "") || "",
    whatsapp: "",
    address: "",
    state: "",
    district: "",
    taluk: "",
    city: "",
    pincode: "",
    aadhaar: "",
    pan: "",
  });

  const set = (key: string) => (val: string) => {
    setForm((f) => ({ ...f, [key]: val }));
    setErrors((e) => ({ ...e, [key]: "" }));
  };

  const validate = (): boolean => {
    const e: Record<string, string> = {};
    if (!form.fullName || form.fullName.length < 3) e.fullName = "Name must be at least 3 characters";
    if (!/^[a-zA-Z\s]+$/.test(form.fullName)) e.fullName = "Only alphabets and spaces allowed";
    if (!form.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Enter valid email address";
    if (!form.phone || form.phone.length !== 10) e.phone = "Phone number must be 10 digits";
    if (!form.address || form.address.length < 10) e.address = "Address must be at least 10 characters";
    if (!form.state) e.state = "Please select state";
    if (!form.district) e.district = "Please select district";
    if (!form.pincode || !/^\d{6}$/.test(form.pincode)) e.pincode = "Pincode must be 6 digits";
    if (!form.aadhaar || form.aadhaar.replace(/\s/g, "").length !== 12) e.aadhaar = "Aadhaar must be 12 digits";
    if (!form.pan || !/^[A-Z]{5}[0-9]{4}[A-Z]$/.test(form.pan.toUpperCase())) e.pan = "Invalid PAN format";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleNext = async () => {
    if (!validate() || !user) return;
    setLoading(true);

    const userType = sessionStorage.getItem("dp_user_type") || "individual";

    // Upsert into users table
    const { error: userErr } = await supabase.from("users").upsert({
      id: user.id,
      role: "delivery_partner",
      type: userType,
      status: "pending_verification",
      full_name: form.fullName,
      mobile: form.phone,
      email: form.email,
      whatsapp_no: sameAsPhone ? form.phone : form.whatsapp,
      address: {
        line: form.address,
        state: form.state,
        district: form.district,
        taluk: form.taluk,
        city: form.city,
        pincode: form.pincode,
      },
    }, { onConflict: "id" });

    if (userErr) {
      setLoading(false);
      toast({ title: "Error", description: userErr.message, variant: "destructive" });
      return;
    }

    // Store in session for subsequent screens
    sessionStorage.setItem("dp_personal", JSON.stringify(form));
    setLoading(false);

    if (userType === "organization") {
      navigate("/company-details");
    } else {
      navigate("/work-experience");
    }
  };

  const handleSameAsPhone = (checked: boolean) => {
    setSameAsPhone(checked);
    if (checked) setForm((f) => ({ ...f, whatsapp: f.phone }));
  };

  return (
    <div className="min-h-screen bg-white flex justify-center">
      <div className="w-full max-w-[420px] px-5 pb-10">
        <ScreenHeader
          title="Welcome to e-DigiVault"
          subtitle="Secure Access to Documents"
          onBack={() => navigate("/select-type")}
        />

        <div className="mt-6">
          <h2 className="text-base font-medium text-gray-800">Personal Details</h2>
          <div className="border-b border-gray-200 mt-2" />
        </div>

        <div className="mt-5 flex flex-col gap-4">
          <FormField label="Full Name *" value={form.fullName} onChange={set("fullName")} placeholder="Enter full name" error={errors.fullName} />
          <FormField label="Email *" value={form.email} onChange={set("email")} placeholder="email@example.com" error={errors.email} />
          <FormField label="Phone No *" value={form.phone} onChange={set("phone")} placeholder="9812546586" error={errors.phone} />
          
          <div>
            <FormField label="WhatsApp No" value={sameAsPhone ? form.phone : form.whatsapp} onChange={set("whatsapp")} placeholder="WhatsApp number" disabled={sameAsPhone} />
            <label className="flex items-center gap-2 mt-1 cursor-pointer">
              <input type="checkbox" checked={sameAsPhone} onChange={(e) => handleSameAsPhone(e.target.checked)} className="w-4 h-4 rounded text-blue-700" />
              <span className="text-xs text-gray-500">Same as Phone Number</span>
            </label>
          </div>

          <TextAreaField label="Address *" value={form.address} onChange={set("address")} placeholder="Full address with landmarks" error={errors.address} />

          <SelectField label="State *" value={form.state} onChange={(v) => { set("state")(v); setForm(f => ({ ...f, district: "", taluk: "" })); }} options={stateOptions} error={errors.state} />
          <SelectField label="District *" value={form.district} onChange={(v) => { set("district")(v); setForm(f => ({ ...f, taluk: "" })); }} options={districtMap[form.state] || []} error={errors.district} />
          <SelectField label="Taluk" value={form.taluk} onChange={set("taluk")} options={talukMap[form.district] || []} />
          <SelectField label="City" value={form.city} onChange={set("city")} options={form.district ? [form.district.split(" ")[0]] : []} />
          <FormField label="Pincode *" value={form.pincode} onChange={set("pincode")} placeholder="560034" error={errors.pincode} />

          <div className="border-b border-gray-200 my-2" />

          <FormField label="Aadhaar No *" value={form.aadhaar} onChange={set("aadhaar")} placeholder="XXXX XXXX 1234" error={errors.aadhaar} />
          <FormField label="PAN No *" value={form.pan} onChange={(v) => set("pan")(v.toUpperCase())} placeholder="ABCDE1234F" error={errors.pan} />
        </div>

        <div className="flex justify-end mt-8">
          <PrimaryButton label={loading ? "Saving..." : "Next"} onClick={handleNext} disabled={loading} />
        </div>
      </div>
    </div>
  );
};

export default PersonalDetailsScreen;
