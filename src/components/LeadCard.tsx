interface LeadCardProps {
  leadId: string;
  phone: string;
  email: string;
  date: string;
  image: string;
}

const LeadCard = ({ leadId, phone, email, date, image }: LeadCardProps) => (
  <div
    onClick={() => console.log("Open lead", leadId)}
    className="flex gap-4 bg-white border border-gray-200 rounded-2xl p-4 shadow-sm cursor-pointer"
  >
    <div className="w-20 h-20 rounded-full overflow-hidden flex-shrink-0">
      <img src={image} alt={leadId} className="w-full h-full object-cover grayscale" />
    </div>
    <div className="flex flex-col gap-1 text-sm text-gray-800 min-w-0">
      <h3 className="text-base font-semibold text-gray-900">{leadId}</h3>
      <p>Phone No: <span className="font-medium">{phone}</span></p>
      <p>Email: <span className="text-blue-600 font-medium">{email}</span></p>
      <p className="text-gray-600">Date: {date}</p>
    </div>
  </div>
);

export default LeadCard;
