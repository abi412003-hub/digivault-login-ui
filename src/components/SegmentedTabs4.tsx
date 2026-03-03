import { useState } from "react";

interface SegmentedTabs4Props {
  tabs: string[];
  defaultTab?: string;
}

const SegmentedTabs4 = ({ tabs, defaultTab }: SegmentedTabs4Props) => {
  const [active, setActive] = useState(defaultTab || tabs[0]);

  return (
    <div className="flex bg-blue-600 rounded-full p-1 mx-4">
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => { setActive(tab); console.log("tab:", tab); }}
          className={`flex-1 py-2 rounded-full text-sm font-medium transition-colors ${
            active === tab ? "bg-white text-blue-700" : "text-white"
          }`}
        >
          {tab}
        </button>
      ))}
    </div>
  );
};

export default SegmentedTabs4;
