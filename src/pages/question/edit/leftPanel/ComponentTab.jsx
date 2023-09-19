import React from "react";
import { Typography } from "antd";
import { componentConfigGroup } from "@/components/QuestionComponents";
import styles from "./ComponentTab.module.scss";

const { Title } = Typography;

// 生成组件函数
function genComponent(componentConfig) {
  const { Component } = componentConfig;

  return (
    <div className={styles.wrapper}>
      <div className={styles.component}>
        <Component></Component>
      </div>
    </div>
  );
}

const ComponentTab = () => {
  return (
    <>
      {componentConfigGroup.map((group, index) => {
        const { groupName, groupId, components } = group;

        return (
          <div key={groupId}>
            <Title
              level={3}
              style={{
                fontSize: "16px",
                marginTop: index > 0 ? "16px" : "0px",
              }}
            >
              {groupName}
            </Title>
            <div>
              {components.map((componentConfig) =>
                genComponent(componentConfig)
              )}
            </div>
          </div>
        );
      })}
    </>
  );
};

export default ComponentTab;
