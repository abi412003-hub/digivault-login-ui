interface RequestStatusCardProps {
  id: string;
  progress: number;
  status: string;
  image: string;
}

const RequestStatusCard = ({ id, progress, status, image }: RequestStatusCardProps) => (
  <div
    onClick={() => console.log("Open request", id)}
    className="flex gap-4 bg-white border border-gray-200 rounded-2xl p-4 shadow-sm cursor-pointer"
  >
    <div className="w-20 h-20 rounded-full overflow-hidden flex-shrink-0">
      <img src={image} alt={id} className="w-full h-full object-cover grayscale" />
    </div>
    <div className="flex flex-col gap-1 text-sm min-w-0 justify-center">
      <h3 className="text-base font-semibold text-gray-900">{id}</h3>
      <p className="text-gray-600">Progress: <span className="text-green-600 font-medium">{progress}%</span></p>
      <p className="text-gray-600">Status : <span className="text-orange-500 font-medium">{status}</span></p>
    </div>
  </div>
);

export default RequestStatusCard;
