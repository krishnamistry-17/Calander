import React, { useState } from "react";
import { Tabs, TabList, Tab } from "react-tabs";

const Header = ({ activeView = "month", onChangeView = () => {} }) => {
  const [activeTab, setActiveTab] = useState(activeView);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    onChangeView(tab);
  };

  return (
    <div>
      <Tabs className="w-full h-full">
        <TabList className="flex justify-center items-center ">
          <Tab
            className="px-4 py-2 rounded-md bg-white text-black cursor-pointer focus:outline-none focus:ring-0"
            onClick={() => handleTabChange("day")}
            selected={activeTab === "day"}
          >
            Day
          </Tab>
          <Tab
            className="px-4 py-2 rounded-md bg-white text-black cursor-pointer focus:outline-none focus:ring-0"
            onClick={() => handleTabChange("week")}
            selected={activeTab === "week"}
          >
            Week
          </Tab>
          <Tab
            className="px-4 py-2 rounded-md bg-white text-black cursor-pointer focus:outline-none focus:ring-0"
            onClick={() => handleTabChange("month")}
            selected={activeTab === "month"}
          >
            Month
          </Tab>
          <Tab
            className="px-4 py-2 rounded-md bg-white text-black cursor-pointer focus:outline-none focus:ring-0"
            onClick={() => handleTabChange("year")}
            selected={activeTab === "year"}
          >
            Year
          </Tab>
        </TabList>
      </Tabs>
    </div>
  );
};

export default Header;
