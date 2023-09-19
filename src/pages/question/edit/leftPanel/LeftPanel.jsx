import React from "react";
import { Tabs } from "antd";

import ComponentTab from "./ComponentTab";
import LayoutTab from "./LayoutTab";

const LeftPanel = () => {
  const tabsItems = [
    {
      key: "componentTab",
      label: "组件库",
      children: <ComponentTab />,
    },
    {
      key: "layoutTab",
      label: "图层",
      children: <LayoutTab></LayoutTab>,
    },
  ];

  function onChange() {}

  return (
    <Tabs
      defaultActiveKey="componentTab"
      items={tabsItems}
      onChange={onChange}
    />
  );
};

export default LeftPanel;
