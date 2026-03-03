import { useState } from "react";
import { Home, User, Users, CircleDollarSign, Settings } from "lucide-react";

const tabs = [
  { label: "Home", icon: Home },
  { label: "Client", icon: User },
  { label: "Leads", icon: Users },
  { label: "Transactions", icon: CircleDollarSign },
  { label: "Settings", icon: Settings },
];

const BottomTabBar = ({ defaultTab = "Home" }: { defaultTab?: string }) => {
  const [active, setActive] = useState(defaultTab);

  return (
    <div className="sticky bottom-0 bg-white border-t border-gray-200 shadow-[0_-2px_10px_rgba(0,0,0,0.05)] rounded-t-2xl">
      <div className="flex justify-around py-2 pb-4">
        {tabs.map(({ label, icon: Icon }) => (
          <button
            key={label}
            onClick={() => { setActive(label); console.log(`Tab: ${label}`); }}
            className={`flex flex-col items-center gap-0.5 text-[10px] ${active === label ? "text-blue-700 font-medium" : "text-gray-400"}`}
          >
            <Icon size={20} />
            {label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default BottomTabBar;
