interface DonutStatProps {
  value: number;
  total: number;
  label: string;
  color: string;
  trackColor: string;
}

const DonutStat = ({ value, total, label, color, trackColor }: DonutStatProps) => {
  const pct = (value / total) * 100;
  const radius = 28;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (pct / 100) * circumference;

  return (
    <div className="flex flex-col items-center gap-1">
      <svg width="68" height="68" viewBox="0 0 68 68">
        <circle cx="34" cy="34" r={radius} fill="none" stroke={trackColor} strokeWidth="6" />
        <circle
          cx="34" cy="34" r={radius} fill="none" stroke={color} strokeWidth="6"
          strokeDasharray={circumference} strokeDashoffset={offset}
          strokeLinecap="round" transform="rotate(-90 34 34)"
        />
      </svg>
      <span className="text-xs text-gray-700 font-medium">{value}/{total}</span>
      <span className="text-xs text-gray-500">{label}</span>
    </div>
  );
};

export default DonutStat;
