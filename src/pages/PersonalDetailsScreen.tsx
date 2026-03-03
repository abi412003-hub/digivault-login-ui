import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/lib/AuthContext";
import { supabase } from "@/lib/supabase";
import ScreenHeader from "@/components/ScreenHeader";
import FormField from "@/components/FormField";
import SelectField from "@/components/SelectField";
import TextAreaField from "@/components/TextAreaField";
import PrimaryButton from "@/components/PrimaryButton";

const stateOptions = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
  "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand",
  "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur",
  "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab",
  "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura",
  "Uttar Pradesh", "Uttarakhand", "West Bengal",
  "Delhi", "Jammu and Kashmir", "Ladakh", "Puducherry",
];

const districtMap: Record<string, string[]> = {
  "Karnataka": [
    "Bagalkote", "Ballari", "Belagavi", "Bengaluru Rural", "Bengaluru Urban",
    "Bidar", "Chamarajanagar", "Chikballapur", "Chikkamagaluru", "Chitradurga",
    "Dakshina Kannada", "Davanagere", "Dharwad", "Gadag", "Hassan",
    "Haveri", "Kalaburagi", "Kodagu", "Kolar", "Koppal",
    "Mandya", "Mysuru", "Raichur", "Ramanagara", "Shivamogga",
    "Tumakuru", "Udupi", "Uttara Kannada", "Vijayapura", "Yadgir",
  ],
  "Tamil Nadu": [
    "Ariyalur", "Chengalpattu", "Chennai", "Coimbatore", "Cuddalore",
    "Dharmapuri", "Dindigul", "Erode", "Kancheepuram", "Karur",
    "Krishnagiri", "Madurai", "Nagapattinam", "Namakkal", "Nilgiris",
    "Perambalur", "Salem", "Sivaganga", "Thanjavur", "Theni",
    "Tiruchirappalli", "Tirunelveli", "Tiruppur", "Tiruvallur", "Vellore",
    "Viluppuram", "Virudhunagar",
  ],
  "Kerala": [
    "Alappuzha", "Ernakulam", "Idukki", "Kannur", "Kasaragod",
    "Kollam", "Kottayam", "Kozhikode", "Malappuram", "Palakkad",
    "Pathanamthitta", "Thiruvananthapuram", "Thrissur", "Wayanad",
  ],
  "Andhra Pradesh": [
    "Anantapur", "Chittoor", "East Godavari", "Guntur", "Krishna",
    "Kurnool", "Nellore", "Prakasam", "Srikakulam", "Visakhapatnam",
    "Vizianagaram", "West Godavari", "YSR Kadapa",
  ],
  "Telangana": [
    "Adilabad", "Hyderabad", "Karimnagar", "Khammam", "Mahbubnagar",
    "Medak", "Nalgonda", "Nizamabad", "Rangareddy", "Sangareddy",
    "Siddipet", "Warangal",
  ],
  "Maharashtra": [
    "Ahmednagar", "Akola", "Amravati", "Aurangabad", "Kolhapur",
    "Latur", "Mumbai", "Nagpur", "Nanded", "Nashik",
    "Pune", "Raigad", "Ratnagiri", "Sangli", "Satara",
    "Solapur", "Thane",
  ],
  "Goa": ["North Goa", "South Goa"],
  "Gujarat": [
    "Ahmedabad", "Amreli", "Anand", "Banaskantha", "Bharuch",
    "Bhavnagar", "Gandhinagar", "Jamnagar", "Junagadh", "Kutch",
    "Mehsana", "Rajkot", "Surat", "Vadodara", "Valsad",
  ],
  "Delhi": ["Central Delhi", "East Delhi", "New Delhi", "North Delhi", "South Delhi", "West Delhi"],
  "Rajasthan": [
    "Ajmer", "Alwar", "Bikaner", "Jaipur", "Jaisalmer",
    "Jodhpur", "Kota", "Udaipur",
  ],
  "Punjab": ["Amritsar", "Bathinda", "Jalandhar", "Ludhiana", "Mohali", "Patiala"],
  "Haryana": ["Ambala", "Faridabad", "Gurugram", "Hisar", "Karnal", "Panipat", "Rohtak", "Sonipat"],
  "Uttar Pradesh": ["Agra", "Allahabad", "Bareilly", "Ghaziabad", "Kanpur", "Lucknow", "Meerut", "Noida", "Varanasi"],
  "West Bengal": ["Darjeeling", "Hooghly", "Howrah", "Kolkata", "Nadia", "North 24 Parganas", "South 24 Parganas"],
  "Bihar": ["Bhagalpur", "Gaya", "Muzaffarpur", "Patna"],
  "Odisha": ["Bhubaneswar", "Cuttack", "Ganjam", "Puri"],
};

const talukMap: Record<string, string[]> = {
  "Bengaluru Urban": ["Bengaluru North", "Bengaluru South", "Bengaluru East", "Anekal"],
  "Bengaluru Rural": ["Devanahalli", "Doddaballapur", "Hosakote", "Nelamangala"],
  "Mysuru": ["Mysuru", "Nanjangud", "T. Narasipura", "Hunsur", "Periyapatna", "H.D. Kote"],
  "Belagavi": ["Belagavi", "Athani", "Bailhongal", "Chikkodi", "Gokak", "Hukkeri", "Khanapur"],
  "Ballari": ["Ballari", "Hospet", "Sandur", "Siruguppa", "Kudligi"],
  "Hassan": ["Hassan", "Belur", "Channarayapatna", "Arsikere", "Sakleshpur", "Alur"],
  "Mandya": ["Mandya", "Maddur", "Malavalli", "Nagamangala", "Srirangapatna"],
  "Tumakuru": ["Tumakuru", "Tiptur", "Kunigal", "Gubbi", "Sira", "Pavagada", "Madhugiri"],
  "Ramanagara": ["Ramanagara", "Channapatna", "Kanakapura", "Magadi"],
  "Kolar": ["Kolar", "KGF", "Bangarpet", "Malur", "Mulbagal"],
  "Chikballapur": ["Chikballapur", "Chintamani", "Gauribidanur", "Bagepalli", "Sidlaghatta"],
  "Dakshina Kannada": ["Mangaluru", "Bantwal", "Belthangady", "Puttur", "Sullia"],
  "Udupi": ["Udupi", "Kundapura", "Karkala"],
  "Shivamogga": ["Shivamogga", "Bhadravati", "Sagar", "Shikaripura", "Tirthahalli"],
  "Davanagere": ["Davanagere", "Harihara", "Jagaluru", "Honnali", "Channagiri"],
  "Dharwad": ["Dharwad", "Hubli", "Navalgund", "Kundgol"],
  "Chitradurga": ["Chitradurga", "Hiriyur", "Holalkere", "Hosadurga", "Molakalmuru"],
  "Haveri": ["Haveri", "Ranebennur", "Byadagi", "Savanur", "Shiggaon", "Hanagal"],
  "Kodagu": ["Madikeri", "Somwarpet", "Virajpet"],
  "Gadag": ["Gadag", "Nargund", "Ron", "Mundargi"],
  "Bagalkote": ["Bagalkote", "Badami", "Bilgi", "Hungund", "Jamkhandi", "Mudhol"],
  "Vijayapura": ["Vijayapura", "Muddebihal", "Sindagi", "Indi"],
  "Chamarajanagar": ["Chamarajanagar", "Gundlupet", "Kollegal", "Yelandur"],
  "Chikkamagaluru": ["Chikkamagaluru", "Kadur", "Koppa", "Mudigere", "Sringeri", "Tarikere"],
  "Koppal": ["Koppal", "Gangavathi", "Kushtagi", "Yelburga"],
  "Raichur": ["Raichur", "Devadurga", "Lingasugur", "Manvi", "Sindhanur"],
  "Kalaburagi": ["Kalaburagi", "Aland", "Afzalpur", "Chincholi", "Chittapur", "Sedam"],
  "Bidar": ["Bidar", "Aurad", "Basavakalyan", "Bhalki", "Humnabad"],
  "Yadgir": ["Yadgir", "Shahpur", "Shorapur"],
  "Uttara Kannada": ["Karwar", "Sirsi", "Honnavar", "Kumta", "Ankola", "Dandeli"],
  "Chennai": ["Chennai North", "Chennai South", "Chennai Central"],
  "Coimbatore": ["Coimbatore North", "Coimbatore South", "Mettupalayam", "Pollachi"],
  "Madurai": ["Madurai North", "Madurai South", "Melur", "Thirumangalam"],
  "Hyderabad": ["Amberpet", "Charminar", "Golconda", "Khairatabad", "Secunderabad"],
  "Pune": ["Pune City", "Haveli", "Baramati", "Junnar", "Khed", "Maval"],
};

const cityMap: Record<string, string[]> = {
  "Bengaluru Urban": ["Bengaluru", "Whitefield", "Electronic City", "Yelahanka", "Marathahalli", "Koramangala", "Jayanagar", "HSR Layout", "Sarjapur"],
  "Bengaluru Rural": ["Devanahalli", "Doddaballapur", "Hosakote", "Nelamangala"],
  "Mysuru": ["Mysuru", "Nanjangud", "Hunsur"],
  "Belagavi": ["Belagavi", "Gokak", "Chikkodi", "Athani"],
  "Ballari": ["Ballari", "Hospet"],
  "Hassan": ["Hassan", "Belur", "Sakleshpur"],
  "Mandya": ["Mandya", "Maddur", "Srirangapatna"],
  "Tumakuru": ["Tumakuru", "Tiptur", "Sira"],
  "Dakshina Kannada": ["Mangaluru", "Puttur", "Bantwal", "Sullia"],
  "Udupi": ["Udupi", "Manipal", "Kundapura"],
  "Shivamogga": ["Shivamogga", "Bhadravati", "Sagar"],
  "Dharwad": ["Hubli", "Dharwad"],
  "Kolar": ["Kolar", "KGF", "Bangarpet", "Malur"],
  "Ramanagara": ["Ramanagara", "Channapatna", "Kanakapura"],
  "Kodagu": ["Madikeri", "Virajpet"],
  "Davanagere": ["Davanagere", "Harihara"],
  "Chitradurga": ["Chitradurga", "Hiriyur"],
  "Haveri": ["Haveri", "Ranebennur"],
  "Chennai": ["Chennai", "Tambaram", "Avadi", "Ambattur"],
  "Coimbatore": ["Coimbatore", "Pollachi", "Mettupalayam"],
  "Madurai": ["Madurai", "Melur"],
  "Hyderabad": ["Hyderabad", "Secunderabad", "Kukatpally", "Gachibowli", "Madhapur"],
  "Rangareddy": ["Shamshabad", "Ibrahimpatnam", "Chevella"],
  "Pune": ["Pune", "Pimpri-Chinchwad", "Hinjewadi", "Kothrud"],
  "Mumbai": ["Mumbai", "Andheri", "Borivali", "Malad", "Bandra", "Dadar"],
  "Thane": ["Thane", "Navi Mumbai", "Kalyan", "Dombivli"],
  "Nagpur": ["Nagpur"],
  "Jaipur": ["Jaipur"],
  "Ahmedabad": ["Ahmedabad"],
  "Surat": ["Surat"],
  "Lucknow": ["Lucknow"],
  "Kolkata": ["Kolkata"],
  "Patna": ["Patna"],
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
      alert(userErr.message);
      return;
    }

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

  const districts = districtMap[form.state] || [];
  const taluks = talukMap[form.district] || [];
  const cities = cityMap[form.district] || (form.district ? [form.district] : []);

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

          <SelectField label="State *" value={form.state} onChange={(v) => { set("state")(v); setForm(f => ({ ...f, district: "", taluk: "", city: "" })); }} options={stateOptions} error={errors.state} />
          <SelectField label="District *" value={form.district} onChange={(v) => { set("district")(v); setForm(f => ({ ...f, taluk: "", city: "" })); }} options={districts} error={errors.district} />
          <SelectField label="Taluk" value={form.taluk} onChange={set("taluk")} options={taluks} />
          <SelectField label="City" value={form.city} onChange={set("city")} options={cities} />
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
