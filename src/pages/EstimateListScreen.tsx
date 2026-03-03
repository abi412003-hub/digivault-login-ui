import { useState } from "react";
import HeaderRowWithBack from "@/components/HeaderRowWithBack";
import SearchInput from "@/components/SearchInput";
import SegmentedTabs from "@/components/SegmentedTabs";
import EstimateCard from "@/components/EstimateCard";
import BottomTabBar from "@/components/BottomTabBar";

const estimates = [
  {
    name: "Orchid Villa",
    propertyId: "JB-176754",
    service: "E-Katha",
    date: "15-03-2026",
    status: "Not Started",
    statusColor: "text-red-500",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=200&h=200&fit=crop",
  },
  {
    name: "Sunshine Apartment",
    propertyId: "JB-176754",
    service: "Khatha Extract",
    date: "25-07-2030",
    status: "Pending For Approval",
    statusColor: "text-orange-500",
    image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=200&h=200&fit=crop",
  },
  {
    name: "Willow Paradise",
    propertyId: "JB-176754",
    service: "Mutation Certificate",
    date: "20-04-2027",
    status: "Not Started",
    statusColor: "text-red-500",
    image: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=200&h=200&fit=crop",
  },
];

const EstimateListScreen = () => {
  const [search, setSearch] = useState("");

  return (
    <div className="min-h-screen bg-gray-50 flex justify-center">
      <div className="w-full max-w-[420px] bg-white min-h-screen flex flex-col">
        <HeaderRowWithBack title="Estimate" onBack={() => console.log("Back")} />

        <div className="px-4 mt-3">
          <SearchInput value={search} onChange={setSearch} />
        </div>

        <div className="mt-3">
          <SegmentedTabs tabs={["Approved", "Assigned", "Rejected"]} />
        </div>

        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4 pb-24">
          {estimates.map((e, i) => (
            <EstimateCard key={i} {...e} />
          ))}
        </div>

        <BottomTabBar defaultTab="Client" />
      </div>
    </div>
  );
};

export default EstimateListScreen;
