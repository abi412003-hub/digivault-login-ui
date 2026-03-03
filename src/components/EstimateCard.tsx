interface EstimateCardProps {
  name: string;
  propertyId: string;
  service: string;
  date: string;
  status: string;
  statusColor: string;
  image: string;
}

const EstimateCard = ({ name, propertyId, service, date, status, statusColor, image }: EstimateCardProps) => (
  <div
    onClick={() => console.log("Open estimate", name)}
    className="flex gap-4 bg-white border border-gray-200 rounded-2xl p-4 shadow-sm cursor-pointer"
  >
    <div className="w-20 h-20 rounded-full border-4 border-amber-200 overflow-hidden flex-shrink-0">
      <img src={image} alt={name} className="w-full h-full object-cover" />
    </div>
    <div className="flex flex-col gap-0.5 text-sm text-gray-700 min-w-0">
      <h3 className="text-base font-semibold text-gray-900">{name}</h3>
      <p>Porperty ID : <span className="font-medium">{propertyId}</span></p>
      <p>Service: <span className="text-blue-600 font-medium">{service}</span></p>
      <p>Date: {date}</p>
      <p>Status: <span className={`font-medium ${statusColor}`}>{status}</span></p>
    </div>
  </div>
);

export default EstimateCard;
