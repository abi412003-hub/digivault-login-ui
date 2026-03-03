import { useState } from "react";
import HeaderRowWithBack from "@/components/HeaderRowWithBack";
import SearchInput from "@/components/SearchInput";
import SegmentedTabs from "@/components/SegmentedTabs";
import LeadCard from "@/components/LeadCard";
import BottomTabBar from "@/components/BottomTabBar";

const leads = [
  { leadId: "Lead-234556", phone: "89XXXXXX78", email: "Ali56783@gmail.com", date: "25-07-2030", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face" },
  { leadId: "Lead-234556", phone: "89XXXXXX79", email: "Rajeshd@gmail.com", date: "15-03-2026", image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop&crop=face" },
  { leadId: "Lead-234556", phone: "89XXXXXX80", email: "anj363.123@gmailcom", date: "20-04-2027", image: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=200&h=200&fit=crop&crop=face" },
];

const LeadStatusListScreen = () => {
  const [search, setSearch] = useState("");

  return (
    <div className="min-h-screen bg-gray-50 flex justify-center">
      <div className="w-full max-w-[420px] bg-white min-h-screen flex flex-col">
        <HeaderRowWithBack title="Lead Status" onBack={() => console.log("Back")} />

        <div className="px-4 mt-3">
          <SearchInput value={search} onChange={setSearch} />
        </div>

        <div className="mt-3">
          <SegmentedTabs tabs={["Approved", "Pending", "Rejected"]} defaultTab="Pending" />
        </div>

        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4 pb-24">
          {leads.map((l, i) => (
            <LeadCard key={i} {...l} />
          ))}
        </div>

        <BottomTabBar defaultTab="Leads" />
      </div>
    </div>
  );
};

export default LeadStatusListScreen;
