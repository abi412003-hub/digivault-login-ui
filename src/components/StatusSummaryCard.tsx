import { LucideIcon } from "lucide-react";

interface StatusSummaryCardProps {
  icon: LucideIcon;
  label: string;
  count: number;
  variant: "verified" | "rejected" | "pending";
}

const styles = {
  verified: { bg: "bg-green-50", text: "text-green-600", iconBg: "bg-white" },
  rejected: { bg: "bg-red-50", text: "text-red-500", iconBg: "bg-white" },
  pending: { bg: "bg-yellow-50", text: "text-orange-500", iconBg: "bg-white" },
};

const StatusSummaryCard = ({ icon: Icon, label, count, variant }: StatusSummaryCardProps) => {
  const s = styles[variant];
  return (
    <div className={`${s.bg} rounded-xl p-3 flex items-center gap-3 flex-1`}>
      <div className={`w-9 h-9 rounded-full ${s.iconBg} shadow-sm flex items-center justify-center`}>
        <Icon size={18} className={s.text} />
      </div>
      <span className={`text-sm font-medium ${s.text}`}>{label}</span>
      <span className={`text-xl font-bold ${s.text} ml-auto`}>{count}</span>
    </div>
  );
};

export default StatusSummaryCard;
