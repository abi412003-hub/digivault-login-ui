import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/lib/AuthContext";
import { supabase } from "@/lib/supabase";
import BottomTabBar from "@/components/BottomTabBar";
import { Camera, LogOut, ChevronRight, Shield, Bell, HelpCircle, FileText } from "lucide-react";
import { toast } from "@/components/ui/use-toast";

interface ProfileData {
  full_name: string;
  mobile: string;
  email: string | null;
  profile_photo_url: string | null;
  role: string;
  status: string;
  registration_id?: string;
  verification_status?: string;
  whatsapp_no?: string;
  address?: any;
}

const SettingsScreen = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const fileRef = useRef<HTMLInputElement>(null);

  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [uploading, setUploading] = useState(false);
  const [editing, setEditing] = useState(false);
  const [editForm, setEditForm] = useState({ full_name: "", email: "", whatsapp_no: "" });

  useEffect(() => {
    if (user) fetchProfile();
  }, [user]);

  async function fetchProfile() {
    setLoading(true);

    const { data: userData } = await supabase
      .from("users")
      .select("full_name, mobile, email, profile_photo_url, role, status, whatsapp_no, address")
      .eq("id", user!.id)
      .maybeSingle();

    const { data: dpData } = await supabase
      .from("delivery_partners")
      .select("registration_id, verification_status")
      .eq("user_id", user!.id)
      .maybeSingle();

    if (userData) {
      const merged = { ...userData, ...dpData } as ProfileData;
      setProfile(merged);
      setEditForm({
        full_name: merged.full_name || "",
        email: merged.email || "",
        whatsapp_no: merged.whatsapp_no || "",
      });
    }
    setLoading(false);
  }

  async function handlePhotoUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file || !user) return;

    if (file.size > 2 * 1024 * 1024) {
      toast({ title: "Error", description: "Photo must be under 2MB", variant: "destructive" });
      return;
    }

    setUploading(true);
    const ext = file.name.split(".").pop();
    const path = `${user.id}/profile.${ext}`;

    const { error: uploadErr } = await supabase.storage
      .from("dp-documents")
      .upload(path, file, { upsert: true });

    if (uploadErr) {
      toast({ title: "Upload Failed", description: uploadErr.message, variant: "destructive" });
      setUploading(false);
      return;
    }

    const { data: urlData } = supabase.storage.from("dp-documents").getPublicUrl(path);

    await supabase
      .from("users")
      .update({ profile_photo_url: urlData.publicUrl })
      .eq("id", user.id);

    setProfile((p) => p ? { ...p, profile_photo_url: urlData.publicUrl } : p);
    setUploading(false);
    toast({ title: "Updated", description: "Profile photo changed" });
  }

  async function handleSaveProfile() {
    if (!user) return;

    const { error } = await supabase
      .from("users")
      .update({
        full_name: editForm.full_name,
        email: editForm.email,
        whatsapp_no: editForm.whatsapp_no,
      })
      .eq("id", user.id);

    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      setProfile((p) => p ? { ...p, ...editForm } : p);
      setEditing(false);
      toast({ title: "Saved", description: "Profile updated" });
    }
  }

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  const verificationBadge = (status?: string) => {
    if (status === "approved") return { label: "Verified", cls: "bg-green-100 text-green-700" };
    if (status === "under_review") return { label: "Under Review", cls: "bg-yellow-100 text-orange-600" };
    if (status === "rejected") return { label: "Rejected", cls: "bg-red-100 text-red-600" };
    return { label: "Pending", cls: "bg-gray-100 text-gray-600" };
  };

  const badge = verificationBadge(profile?.verification_status);

  return (
    <div className="min-h-screen bg-gray-50 flex justify-center">
      <div className="w-full max-w-[420px] bg-white min-h-screen flex flex-col">
        {/* Header */}
        <div className="bg-blue-700 px-5 pt-8 pb-6 rounded-b-3xl">
          <h1 className="text-lg font-semibold text-white">Settings</h1>

          {loading ? (
            <div className="flex items-center justify-center h-20">
              <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
            </div>
          ) : (
            <div className="flex items-center gap-4 mt-5">
              {/* Avatar */}
              <div className="relative">
                <div className="w-16 h-16 rounded-full bg-blue-500 flex items-center justify-center overflow-hidden border-2 border-white/50">
                  {profile?.profile_photo_url ? (
                    <img src={profile.profile_photo_url} alt="" className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-white text-xl font-bold">
                      {profile?.full_name?.charAt(0)?.toUpperCase() || "D"}
                    </span>
                  )}
                </div>
                <button
                  onClick={() => fileRef.current?.click()}
                  disabled={uploading}
                  className="absolute -bottom-1 -right-1 w-7 h-7 bg-white rounded-full flex items-center justify-center shadow-md"
                >
                  <Camera size={14} className="text-blue-700" />
                </button>
                <input type="file" ref={fileRef} className="hidden" accept="image/*" onChange={handlePhotoUpload} />
              </div>

              <div className="flex-1">
                <h2 className="text-white font-semibold text-base">{profile?.full_name || "Delivery Partner"}</h2>
                <p className="text-blue-100 text-xs mt-0.5">+91 {profile?.mobile}</p>
                {profile?.registration_id && (
                  <p className="text-blue-200 text-xs mt-0.5">{profile.registration_id}</p>
                )}
              </div>

              <span className={`px-3 py-1 rounded-full text-[10px] font-medium ${badge.cls}`}>
                {badge.label}
              </span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto px-5 pb-24 mt-4">
          {/* Edit profile section */}
          {editing ? (
            <div className="bg-white rounded-xl border border-gray-200 p-4 space-y-3">
              <h3 className="text-sm font-medium text-gray-800">Edit Profile</h3>
              <div>
                <label className="text-xs text-gray-500">Full Name</label>
                <input
                  className="w-full border border-gray-200 rounded-lg h-10 px-3 text-sm mt-1"
                  value={editForm.full_name}
                  onChange={(e) => setEditForm((f) => ({ ...f, full_name: e.target.value }))}
                />
              </div>
              <div>
                <label className="text-xs text-gray-500">Email</label>
                <input
                  className="w-full border border-gray-200 rounded-lg h-10 px-3 text-sm mt-1"
                  value={editForm.email}
                  onChange={(e) => setEditForm((f) => ({ ...f, email: e.target.value }))}
                />
              </div>
              <div>
                <label className="text-xs text-gray-500">WhatsApp No</label>
                <input
                  className="w-full border border-gray-200 rounded-lg h-10 px-3 text-sm mt-1"
                  value={editForm.whatsapp_no}
                  onChange={(e) => setEditForm((f) => ({ ...f, whatsapp_no: e.target.value }))}
                />
              </div>
              <div className="flex gap-3 pt-2">
                <button onClick={() => setEditing(false)} className="flex-1 border border-gray-200 rounded-lg py-2.5 text-sm text-gray-600">Cancel</button>
                <button onClick={handleSaveProfile} className="flex-1 bg-blue-700 rounded-lg py-2.5 text-sm text-white font-medium">Save</button>
              </div>
            </div>
          ) : (
            <div className="space-y-2">
              {/* Profile row */}
              <button
                onClick={() => setEditing(true)}
                className="w-full flex items-center gap-3 bg-white rounded-xl border border-gray-100 p-4 shadow-sm"
              >
                <div className="w-9 h-9 rounded-full bg-blue-50 flex items-center justify-center">
                  <Shield size={18} className="text-blue-700" />
                </div>
                <div className="flex-1 text-left">
                  <p className="text-sm font-medium text-gray-800">Edit Profile</p>
                  <p className="text-xs text-gray-400">Name, email, WhatsApp</p>
                </div>
                <ChevronRight size={18} className="text-gray-300" />
              </button>

              {/* Notifications */}
              <button className="w-full flex items-center gap-3 bg-white rounded-xl border border-gray-100 p-4 shadow-sm">
                <div className="w-9 h-9 rounded-full bg-orange-50 flex items-center justify-center">
                  <Bell size={18} className="text-orange-600" />
                </div>
                <div className="flex-1 text-left">
                  <p className="text-sm font-medium text-gray-800">Notifications</p>
                  <p className="text-xs text-gray-400">Push & SMS preferences</p>
                </div>
                <ChevronRight size={18} className="text-gray-300" />
              </button>

              {/* Documents */}
              <button
                onClick={() => navigate("/work-experience")}
                className="w-full flex items-center gap-3 bg-white rounded-xl border border-gray-100 p-4 shadow-sm"
              >
                <div className="w-9 h-9 rounded-full bg-green-50 flex items-center justify-center">
                  <FileText size={18} className="text-green-600" />
                </div>
                <div className="flex-1 text-left">
                  <p className="text-sm font-medium text-gray-800">My Documents</p>
                  <p className="text-xs text-gray-400">KYC, PAN, Aadhaar uploads</p>
                </div>
                <ChevronRight size={18} className="text-gray-300" />
              </button>

              {/* Help */}
              <button className="w-full flex items-center gap-3 bg-white rounded-xl border border-gray-100 p-4 shadow-sm">
                <div className="w-9 h-9 rounded-full bg-purple-50 flex items-center justify-center">
                  <HelpCircle size={18} className="text-purple-600" />
                </div>
                <div className="flex-1 text-left">
                  <p className="text-sm font-medium text-gray-800">Help & Support</p>
                  <p className="text-xs text-gray-400">FAQs, contact admin</p>
                </div>
                <ChevronRight size={18} className="text-gray-300" />
              </button>
            </div>
          )}

          {/* App version + Logout */}
          <div className="mt-8 space-y-3">
            <p className="text-center text-xs text-gray-300">e-DigiVault DP App v1.0.0</p>
            <button
              onClick={handleLogout}
              className="w-full flex items-center justify-center gap-2 border border-red-200 rounded-xl py-3 text-red-500 text-sm font-medium hover:bg-red-50"
            >
              <LogOut size={16} /> Sign Out
            </button>
          </div>
        </div>

        <BottomTabBar defaultTab="Settings" />
      </div>
    </div>
  );
};

export default SettingsScreen;
