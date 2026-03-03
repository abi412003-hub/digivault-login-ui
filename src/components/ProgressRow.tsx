interface ProgressRowProps {
  label: string;
  value: number;
  total: number;
  color: string;
  trackColor: string;
}

const ProgressRow = ({ label, value, total, color, trackColor }: ProgressRowProps) => {
  const pct = (value / total) * 100;
  return (
    <div className="flex items-center gap-3">
      <span className="text-sm text-gray-700 w-20 shrink-0">{label}</span>
      <div className="flex-1 h-3 rounded-full" style={{ backgroundColor: trackColor }}>
        <div className="h-full rounded-full" style={{ width: `${pct}%`, backgroundColor: color }} />
      </div>
      <span className="text-sm text-gray-700 font-medium w-14 text-right">{value}/{total}</span>
    </div>
  );
};

export default ProgressRow;
