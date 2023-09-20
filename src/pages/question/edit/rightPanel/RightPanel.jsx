import React from "react";
import { Tabs } from "antd";
import { FileTextOutlined, SettingOutlined } from "@ant-design/icons";
import ComponentPropTab from "./ComponentPropTab";

const RightPanel = () => {
  const onChange = () => {};

  const tabsItems = [
    {
      key: "prop",
      label: (
        <span>
          <FileTextOutlined></FileTextOutlined>
          属性
        </span>
      ),
      children: <ComponentPropTab></ComponentPropTab>,
    },
    {
      key: "setting",
      label: (
        <span>
          <SettingOutlined></SettingOutlined>
          页面设置
        </span>
      ),
      children: <div>页面设置</div>,
    },
  ];

  return <Tabs defaultActiveKey="prop" items={tabsItems} onChange={onChange} />;
};

export default RightPanel;
