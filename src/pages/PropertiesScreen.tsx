import { useState } from "react";
import HeaderRowWithBack from "@/components/HeaderRowWithBack";
import SearchInput from "@/components/SearchInput";
import CountRow from "@/components/CountRow";
import PropertyCard from "@/components/PropertyCard";
import BottomTabBar from "@/components/BottomTabBar";

const properties = [
  { name: "Orchid Villa", projectId: "57643A3" },
  { name: "Sunshine Apartment", projectId: "57643A3" },
  { name: "Willow Court", projectId: "57643A3" },
  { name: "Summit One", projectId: "57643A3" },
];

const PropertiesScreen = () => {
  const [search, setSearch] = useState("");

  return (
    <div className="min-h-screen bg-gray-50 flex justify-center">
      <div className="w-full max-w-[420px] bg-white min-h-screen flex flex-col">
        <HeaderRowWithBack title="Properties" onBack={() => console.log("Back")} />

        <div className="px-4 mt-3">
          <SearchInput value={search} onChange={setSearch} />
        </div>

        <div className="px-4 mt-2">
          <CountRow count={properties.length} label="Properties" />
        </div>

        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-5 pb-24">
          {properties.map((p, i) => (
            <PropertyCard key={i} name={p.name} projectId={p.projectId} />
          ))}
        </div>

        <BottomTabBar defaultTab="Client" />
      </div>
    </div>
  );
};

export default PropertiesScreen;
