import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/lib/AuthContext";
import { supabase } from "@/lib/supabase";
import TopTitleBar from "@/components/TopTitleBar";
import FormField from "@/components/FormField";
import PrimaryButton from "@/components/PrimaryButton";
import { Upload, CheckCircle, X, Loader2 } from "lucide-react";
import { toast } from "@/components/ui/use-toast";

interface DocUpload {
  key: string;
  label: string;
  required: boolean;
  accept: string;
  file: File | null;
  status: "idle" | "uploading" | "done" | "error";
  url: string | null;
}

const initialDocs: DocUpload[] = [
  { key: "self_acknowledgement", label: "Self Acknowledgement", required: true, accept: ".pdf,.jpg,.png", file: null, status: "idle", url: null },
  { key: "pan_card", label: "Upload - Personal Pan Card", required: true, accept: ".jpg,.pdf", file: null, status: "idle", url: null },
  { key: "aadhaar_card", label: "Upload - Aadhar Card", required: true, accept: ".jpg,.pdf,.png", file: null, status: "idle", url: null },
  { key: "gst_document", label: "Upload - GST Document", required: false, accept: ".pdf,.jpg", file: null, status: "idle", url: null },
  { key: "passport_photo", label: "Upload - Passport size photo", required: true, accept: ".jpg,.png", file: null, status: "idle", url: null },
  { key: "firm_registration", label: "Upload - Firm Registration Details", required: false, accept: ".pdf,.jpg", file: null, status: "idle", url: null },
];

const WorkExperienceUploadScreen = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [experience, setExperience] = useState("");
  const [serviceAreas, setServiceAreas] = useState("");
  const [incorpNumber, setIncorpNumber] = useState("");
  const [docs, setDocs] = useState<DocUpload[]>(initialDocs);
  const [loading, setLoading] = useState(false);
  const fileRefs = useRef<Record<string, HTMLInputElement | null>>({});

  const handleFileSelect = (key: string, file: File | null) => {
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) {
      toast({ title: "File too large", description: "Max file size is 5MB", variant: "destructive" });
      return;
    }
    setDocs((prev) => prev.map((d) => d.key === key ? { ...d, file, status: "idle" } : d));
  };

  const uploadFile = async (doc: DocUpload): Promise<string | null> => {
    if (!doc.file || !user) return null;
    const ext = doc.file.name.split(".").pop();
    const path = `${user.id}/${doc.key}.${ext}`;

    setDocs((prev) => prev.map((d) => d.key === doc.key ? { ...d, status: "uploading" } : d));

    const { error } = await supabase.storage
      .from("dp-kyc")
      .upload(path, doc.file, { upsert: true });

    if (error) {
      setDocs((prev) => prev.map((d) => d.key === doc.key ? { ...d, status: "error" } : d));
      return null;
    }

    const { data: urlData } = supabase.storage.from("dp-kyc").getPublicUrl(path);
    setDocs((prev) => prev.map((d) => d.key === doc.key ? { ...d, status: "done", url: urlData.publicUrl } : d));
    return urlData.publicUrl;
  };

  const handleNext = async () => {
    if (!user) return;

    // Validate required fields
    if (!experience || parseInt(experience) < 0) {
      toast({ title: "Required", description: "Enter years of experience", variant: "destructive" });
      return;
    }
    if (!serviceAreas) {
      toast({ title: "Required", description: "Enter primary service areas", variant: "destructive" });
      return;
    }

    // Check required docs
    const missingDocs = docs.filter((d) => d.required && !d.file);
    if (missingDocs.length > 0) {
      toast({ title: "Missing documents", description: `Upload: ${missingDocs.map((d) => d.label).join(", ")}`, variant: "destructive" });
      return;
    }

    setLoading(true);

    // 1. Create DP profile
    const { error: profErr } = await supabase.from("delivery_partner_profiles").upsert({
      user_id: user.id,
      years_of_experience: parseInt(experience),
      primary_service_areas: serviceAreas.split(",").map((s) => s.trim()),
      incorporation_number: incorpNumber || null,
    }, { onConflict: "user_id" });

    if (profErr) {
      setLoading(false);
      toast({ title: "Error", description: profErr.message, variant: "destructive" });
      return;
    }

    // 2. Upload all files
    for (const doc of docs) {
      if (!doc.file) continue;
      const url = await uploadFile(doc);
      if (url) {
        await supabase.from("dp_kyc_documents").insert({
          user_id: user.id,
          doc_type: doc.key,
          file_url: url,
          file_name: doc.file.name,
          file_size: doc.file.size,
          file_type: doc.file.type,
        });
      }
    }

    setLoading(false);
    navigate("/registration-processing");
  };

  return (
    <div className="min-h-screen bg-white flex justify-center">
      <div className="w-full max-w-[420px] px-5 pb-10">
        <TopTitleBar title="Work Experience" onBack={() => navigate(-1)} />

        <div className="mt-5 flex flex-col gap-4">
          <FormField
            label="Years of Experience in Real Estate *"
            value={experience}
            onChange={setExperience}
            placeholder="6"
          />
          <FormField
            label="Primary Service Areas *"
            value={serviceAreas}
            onChange={setServiceAreas}
            placeholder="Bangalore, Mysore, Tumkur"
          />
          <FormField
            label="Incorporation Number"
            value={incorpNumber}
            onChange={(v) => setIncorpNumber(v.toUpperCase())}
            placeholder="U12345KA2020PTC123456"
          />
        </div>

        <div className="mt-6">
          <h3 className="text-sm font-medium text-gray-800">Upload Necessary Documents</h3>
          <div className="border-b border-gray-200 mt-2 mb-4" />

          <div className="flex flex-col gap-3">
            {docs.map((doc) => (
              <div key={doc.key}>
                <label className="text-xs font-medium text-gray-700">
                  {doc.label} {doc.required && "*"}
                </label>
                <div
                  onClick={() => fileRefs.current[doc.key]?.click()}
                  className={`mt-1 flex items-center justify-between border rounded-lg px-4 py-3 cursor-pointer transition-colors ${
                    doc.status === "done"
                      ? "border-green-300 bg-green-50"
                      : doc.status === "error"
                      ? "border-red-300 bg-red-50"
                      : "border-gray-300 hover:border-blue-300"
                  }`}
                >
                  <span className="text-sm text-gray-500 truncate max-w-[240px]">
                    {doc.file ? doc.file.name : "Upload File"}
                  </span>
                  {doc.status === "uploading" ? (
                    <Loader2 size={18} className="text-blue-600 animate-spin" />
                  ) : doc.status === "done" ? (
                    <CheckCircle size={18} className="text-green-600" />
                  ) : (
                    <Upload size={18} className="text-gray-400" />
                  )}
                </div>
                <input
                  ref={(el) => { fileRefs.current[doc.key] = el; }}
                  type="file"
                  accept={doc.accept}
                  className="hidden"
                  onChange={(e) => handleFileSelect(doc.key, e.target.files?.[0] || null)}
                />
                {doc.file && doc.status !== "done" && (
                  <button
                    onClick={() => setDocs((p) => p.map((d) => d.key === doc.key ? { ...d, file: null, status: "idle" } : d))}
                    className="text-xs text-red-500 mt-1 flex items-center gap-1"
                  >
                    <X size={12} /> Remove
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-end mt-8">
          <PrimaryButton label={loading ? "Uploading..." : "Next"} onClick={handleNext} disabled={loading} />
        </div>
      </div>
    </div>
  );
};

export default WorkExperienceUploadScreen;
