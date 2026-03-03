import HeaderRowWithBack from "@/components/HeaderRowWithBack";
import SegmentedTabs4 from "@/components/SegmentedTabs4";
import RequestStatusCard from "@/components/RequestStatusCard";
import BottomTabBar from "@/components/BottomTabBar";

const requests = [
  { id: "MRA-450881", progress: 70, status: "Pending for Approval", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face" },
  { id: "CD-454401", progress: 70, status: "Pending for Approval", image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop&crop=face" },
  { id: "MRA-4501", progress: 85, status: "Pending for Approval", image: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=200&h=200&fit=crop&crop=face" },
];

const RequestPendingListScreen = () => (
  <div className="min-h-screen bg-gray-50 flex justify-center">
    <div className="w-full max-w-[420px] bg-white min-h-screen flex flex-col">
      <HeaderRowWithBack title="Request" onBack={() => console.log("Back")} />

      <div className="mt-3">
        <SegmentedTabs4 tabs={["Request", "Pending", "Approved", "Rejected"]} defaultTab="Pending" />
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4 pb-24">
        {requests.map((r, i) => (
          <RequestStatusCard key={i} {...r} />
        ))}
      </div>

      <BottomTabBar defaultTab="Transactions" />
    </div>
  </div>
);

export default RequestPendingListScreen;
