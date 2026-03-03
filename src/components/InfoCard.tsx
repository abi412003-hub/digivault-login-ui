interface InfoCardProps {
  rows: { label: string; value: string }[];
}

const InfoCard = ({ rows }: InfoCardProps) => (
  <div className="rounded-lg shadow-md border border-gray-200 p-5 mx-auto max-w-[360px]">
    <div className="grid grid-cols-[auto_auto_1fr] gap-y-3 gap-x-2">
      {rows.map((row) => (
        <>
          <span key={`l-${row.label}`} className="text-sm font-medium text-blue-700">{row.label}</span>
          <span className="text-sm text-gray-900">:</span>
          <span className="text-sm text-gray-900">{row.value}</span>
        </>
      ))}
    </div>
  </div>
);

export default InfoCard;
