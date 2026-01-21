import React from "react";
import type { tabProps } from "../../interfaces/tabProps";

const Tabs: React.FC<tabProps> = ({ tabItems, activeTab, setActiveTab }) => {
  return (
    <nav className=" py-2 list-none gap-2 flex flex-col justify-start items-end">
      {tabItems.map((item, index) => (
        <button
        key={index}
          className={`
                w-full border border-lightBorder dark:border-darkBorder text-lightText dark:text-darkText font-pixelify rounded cursor-pointer
                ${activeTab === index ? "bg-lightSecondary dark:bg-darkSecondary" : ""}`}
          onClick={() => setActiveTab(index)}
        >
          {item}{" "}
        </button>
      ))}
    </nav>
  );
};

export default Tabs;
