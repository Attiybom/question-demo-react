import React, { useEffect, useState } from "react";
import { Tabs } from "antd";
import { FileTextOutlined, SettingOutlined } from "@ant-design/icons";
import ComponentPropTab from "./ComponentPropTab";
import PageSetting from "./PageSetting";
import useGetComponentsInfo from "@/hooks/useGetComponentsInfo";

const RightPanel = () => {
  const [activeKey, setActiveKey] = useState("prop");

  const { selectedId } = useGetComponentsInfo();

  // 动态改变tab
  useEffect(() => {
    if (selectedId) {
      setActiveKey("prop");
    } else {
      setActiveKey("setting");
    }
  }, [selectedId]);

  function changeTab(key) {
    // console.log("key", key);
    setActiveKey(key);
  }

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
      children: <PageSetting />,
    },
  ];

  return (
    <Tabs activeKey={activeKey} items={tabsItems} onTabClick={changeTab} />
  );
};

export default RightPanel;
