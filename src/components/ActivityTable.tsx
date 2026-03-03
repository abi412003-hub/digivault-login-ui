const activities = [
  { title: "Aadhar Verification", date: "08 Apr 2025", status: "Completed" },
  { title: "Income Certificate", date: "06 Apr 2025", status: "On Going" },
  { title: "Voter ID Update", date: "05 Apr 2025", status: "Pending" },
  { title: "Voter ID Update", date: "05 Apr 2025", status: "Pending" },
  { title: "Voter ID Update", date: "05 Apr 2025", status: "Pending" },
];

const statusStyles: Record<string, string> = {
  Completed: "bg-green-100 text-green-700",
  "On Going": "bg-blue-100 text-blue-700",
  Pending: "bg-yellow-100 text-orange-600",
};

const ActivityTable = () => (
  <div className="relative">
    <div className="grid grid-cols-[1fr_auto_auto] text-xs font-medium text-gray-600 bg-blue-50 px-3 py-2 rounded-t-md">
      <span>Document Title</span>
      <span className="w-24 text-center">Date</span>
      <span className="w-24 text-center">Status Badge</span>
    </div>
    <div className="max-h-[220px] overflow-y-auto">
      {activities.map((a, i) => (
        <div key={i} className="grid grid-cols-[1fr_auto_auto] items-center px-3 py-2.5 border-b border-gray-100 text-xs text-gray-700">
          <span>{a.title}</span>
          <span className="w-24 text-center text-gray-500">{a.date}</span>
          <span className="w-24 flex justify-center">
            <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusStyles[a.status]}`}>{a.status}</span>
          </span>
        </div>
      ))}
    </div>
  </div>
);

export default ActivityTable;
