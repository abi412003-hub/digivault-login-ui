import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/lib/AuthContext";
import { supabase } from "@/lib/supabase";
import HeaderRowWithBack from "@/components/HeaderRowWithBack";
import BottomTabBar from "@/components/BottomTabBar";
import PrimaryButton from "@/components/PrimaryButton";
const toast = (opts: any) => { if (opts.variant === 'destructive') alert(opts.description || opts.title); };

const LeadAddOrganizationScreen = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [tab, setTab] = useState<"Personal" | "Organization" | "Service">("Organization");
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    orgName: "",
    address: "",
    dateOfEstablishment: "",
    orgType: "",
    ownerName: "",
    ownershipStatus: "",
    services: [] as string[],
  });

  const set = (key: string) => (val: string) => setForm((f) => ({ ...f, [key]: val }));

  const handleSave = async () => {
    if (!user) return;
    if (!form.name && !form.orgName) {
      toast({ title: "Required", description: "Enter name or organization name", variant: "destructive" });
      return;
    }

    setLoading(true);
    const { error } = await supabase.from("leads").insert({
      created_by: user.id,
      type: tab === "Personal" ? "individual" : "organization",
      name: form.name || form.orgName,
      phone: form.phone,
      email: form.email,
      services_interested: form.services.length > 0 ? form.services : ["General"],
      notes: JSON.stringify({
        org_name: form.orgName,
        address: form.address,
        date_of_establishment: form.dateOfEstablishment,
        org_type: form.orgType,
        owner_name: form.ownerName,
        ownership_status: form.ownershipStatus,
      }),
      status: "pending",
    });

    setLoading(false);
    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
      return;
    }

    toast({ title: "Lead Created", description: "New lead has been saved" });
    navigate("/lead-dashboard");
  };

  const inputClass = "w-full border border-gray-300 rounded-lg h-11 px-4 text-sm text-gray-800 placeholder-gray-400 focus:ring-2 focus:ring-blue-200 focus:border-blue-500 outline-none";

  return (
    <div className="min-h-screen bg-gray-50 flex justify-center">
      <div className="w-full max-w-[420px] bg-white min-h-screen flex flex-col">
        <HeaderRowWithBack title="Lead" onBack={() => navigate("/lead-dashboard")} />

        <div className="flex-1 overflow-y-auto px-5 py-4 pb-24">
          <p className="text-base font-semibold text-gray-800 text-center mb-4">Add New Lead</p>

          {/* Photo placeholder */}
          <div className="flex justify-center mb-4">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center text-gray-400 text-xs">
              Upload Photo
            </div>
          </div>

          {/* Tabs */}
          <div className="flex gap-2 mb-5">
            {(["Personal", "Organization", "Service"] as const).map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`flex-1 py-2 rounded-full text-xs font-medium ${
                  tab === t ? "bg-blue-700 text-white" : "bg-gray-100 text-gray-600"
                }`}
              >
                {t}
              </button>
            ))}
          </div>

          {tab === "Personal" && (
            <div className="flex flex-col gap-3">
              <div>
                <label className="text-xs text-gray-600 mb-1 block">Full Name *</label>
                <input className={inputClass} placeholder="Enter name" value={form.name} onChange={(e) => set("name")(e.target.value)} />
              </div>
              <div>
                <label className="text-xs text-gray-600 mb-1 block">Phone *</label>
                <input className={inputClass} placeholder="Phone number" value={form.phone} onChange={(e) => set("phone")(e.target.value)} />
              </div>
              <div>
                <label className="text-xs text-gray-600 mb-1 block">Email</label>
                <input className={inputClass} placeholder="Email address" value={form.email} onChange={(e) => set("email")(e.target.value)} />
              </div>
            </div>
          )}

          {tab === "Organization" && (
            <div className="flex flex-col gap-3">
              <p className="text-sm font-medium text-gray-700">Organization Details</p>
              <div>
                <label className="text-xs text-gray-600 mb-1 block">Organisation Name</label>
                <input className={inputClass} placeholder="Citrine Solutions Pvt. Ltd" value={form.orgName} onChange={(e) => set("orgName")(e.target.value)} />
              </div>
              <div>
                <label className="text-xs text-gray-600 mb-1 block">Registered Office Address</label>
                <input className={inputClass} placeholder="34, TechPark Lane..." value={form.address} onChange={(e) => set("address")(e.target.value)} />
              </div>
              <div>
                <label className="text-xs text-gray-600 mb-1 block">Date of Establishment</label>
                <input className={inputClass} placeholder="12 March 2017" value={form.dateOfEstablishment} onChange={(e) => set("dateOfEstablishment")(e.target.value)} />
              </div>
              <div>
                <label className="text-xs text-gray-600 mb-1 block">Type of Organisation</label>
                <input className={inputClass} placeholder="Private Limited Company" value={form.orgType} onChange={(e) => set("orgType")(e.target.value)} />
              </div>
              <div>
                <label className="text-xs text-gray-600 mb-1 block">Name of the Owner</label>
                <input className={inputClass} placeholder="Rajesh Kumar" value={form.ownerName} onChange={(e) => set("ownerName")(e.target.value)} />
              </div>
              <div>
                <label className="text-xs text-gray-600 mb-1 block">Ownership Status</label>
                <input className={inputClass} placeholder="Individual Business" value={form.ownershipStatus} onChange={(e) => set("ownershipStatus")(e.target.value)} />
              </div>
            </div>
          )}

          {tab === "Service" && (
            <div className="flex flex-col gap-3">
              <p className="text-sm font-medium text-gray-700">Required Services</p>
              {["Record Room", "Business Records", "Personal Records", "E-Khatha", "Khatha Extract", "Mutation"].map((s) => (
                <label key={s} className="flex items-center gap-3 py-2">
                  <input
                    type="checkbox"
                    checked={form.services.includes(s)}
                    onChange={(e) => {
                      if (e.target.checked) setForm((f) => ({ ...f, services: [...f.services, s] }));
                      else setForm((f) => ({ ...f, services: f.services.filter((x) => x !== s) }));
                    }}
                    className="w-4 h-4 rounded text-blue-700"
                  />
                  <span className="text-sm text-gray-700">{s}</span>
                </label>
              ))}
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-3 mt-8">
            <button onClick={() => navigate("/lead-dashboard")} className="flex-1 border border-red-400 text-red-500 rounded-lg py-3 text-sm font-medium">
              Skip
            </button>
            <div className="flex-1">
              <PrimaryButton label={loading ? "Saving..." : "Next"} onClick={handleSave} disabled={loading} />
            </div>
          </div>
        </div>

        <BottomTabBar defaultTab="Leads" />
      </div>
    </div>
  );
};

export default LeadAddOrganizationScreen;
