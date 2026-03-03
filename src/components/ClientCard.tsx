interface ClientCardProps {
  clientId: string;
  inCharge: string;
  progress: number;
  status: string;
  avatarIndex: number;
  onClick?: () => void;
}

const avatarUrls = [
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=160&h=160&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=160&h=160&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=160&h=160&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=160&h=160&fit=crop&crop=face",
];

const ClientCard = ({ clientId, inCharge, progress, status, avatarIndex, onClick }: ClientCardProps) => (
  <button onClick={onClick} className="w-full flex items-center gap-4 p-4 bg-white border border-gray-200 rounded-2xl shadow-sm text-left">
    <img
      src={avatarUrls[avatarIndex % avatarUrls.length]}
      alt="Client"
      className="w-20 h-20 rounded-full object-cover grayscale shrink-0"
    />
    <div className="space-y-1">
      <p className="text-sm text-gray-700"><span className="text-gray-500">Client ID :</span> {clientId}</p>
      <p className="text-sm text-gray-700"><span className="text-gray-500">In-Charge :</span> {inCharge}</p>
      <p className="text-sm text-gray-700">Progress: <span className="text-green-600 font-medium">{progress}%</span></p>
      <p className="text-sm text-gray-700">Status: <span className="ml-1 inline-block bg-purple-100 text-purple-700 rounded-full px-3 py-0.5 text-xs font-medium">{status}</span></p>
    </div>
  </button>
);

export default ClientCard;
