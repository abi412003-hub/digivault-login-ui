import { useState } from "react";
import HeaderRowWithBack from "@/components/HeaderRowWithBack";
import SearchInput from "@/components/SearchInput";
import ClientCard from "@/components/ClientCard";
import BottomTabBar from "@/components/BottomTabBar";

const clients = Array.from({ length: 4 }, (_, i) => ({
  id: i,
  clientId: "CI457158",
  inCharge: "IN458215",
  progress: 70,
  status: "Active",
}));

const ClientsListScreen = () => {
  const [search, setSearch] = useState("");

  return (
    <div className="min-h-screen bg-gray-50 flex justify-center">
      <div className="w-full max-w-[420px] bg-white min-h-screen flex flex-col">
        <HeaderRowWithBack title="Clients" onBack={() => console.log("Back")} />

        <div className="px-4 mt-3">
          <SearchInput value={search} onChange={setSearch} />
        </div>

        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4 pb-24">
          {clients.map((c) => (
            <ClientCard
              key={c.id}
              clientId={c.clientId}
              inCharge={c.inCharge}
              progress={c.progress}
              status={c.status}
              avatarIndex={c.id}
              onClick={() => console.log("Open client", c.clientId)}
            />
          ))}
        </div>

        <BottomTabBar defaultTab="Client" />
      </div>
    </div>
  );
};

export default ClientsListScreen;
