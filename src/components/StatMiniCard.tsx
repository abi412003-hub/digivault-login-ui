import { LucideIcon } from "lucide-react";

interface StatMiniCardProps {
  icon: LucideIcon;
  count: number;
  label: string;
  variant: "completed" | "ongoing" | "pending";
}

const variantStyles = {
  completed: {
    bg: "bg-green-50",
    iconBg: "bg-green-100",
    iconColor: "text-green-600",
    labelColor: "text-green-600",
    countColor: "text-green-700",
  },
  ongoing: {
    bg: "bg-blue-50",
    iconBg: "bg-blue-100",
    iconColor: "text-blue-600",
    labelColor: "text-blue-600",
    countColor: "text-blue-700",
  },
  pending: {
    bg: "bg-yellow-50",
    iconBg: "bg-yellow-100",
    iconColor: "text-yellow-600",
    labelColor: "text-orange-500",
    countColor: "text-orange-600",
  },
};

const StatMiniCard = ({ icon: Icon, count, label, variant }: StatMiniCardProps) => {
  const s = variantStyles[variant];
  return (
    <div className={`flex-1 ${s.bg} rounded-xl p-3 flex items-center gap-2`}>
      <div className={`w-9 h-9 rounded-full ${s.iconBg} flex items-center justify-center`}>
        <Icon size={18} className={s.iconColor} />
      </div>
      <div>
        <span className={`text-xl font-bold ${s.countColor}`}>{count}</span>
        <p className={`text-[10px] font-medium ${s.labelColor}`}>{label}</p>
      </div>
    </div>
  );
};

export default StatMiniCard;
