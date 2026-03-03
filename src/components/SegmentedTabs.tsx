import { useState } from "react";

interface SegmentedTabsProps {
  tabs: string[];
  defaultTab?: string;
}

const SegmentedTabs = ({ tabs, defaultTab }: SegmentedTabsProps) => {
  const [active, setActive] = useState(defaultTab || tabs[0]);

  return (
    <div className="flex bg-blue-600 rounded-full p-1 mx-auto w-fit">
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => { setActive(tab); console.log("segment:", tab); }}
          className={`px-5 py-2 rounded-full text-sm font-medium transition-colors ${
            active === tab ? "bg-white text-blue-700" : "text-white"
          }`}
        >
          {tab}
        </button>
      ))}
    </div>
  );
};

export default SegmentedTabs;
