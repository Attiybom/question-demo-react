import React from "react";
import { useDispatch } from "react-redux";
import { Typography } from "antd";
import { componentConfigGroup } from "@/components/QuestionComponents";
import styles from "./ComponentTab.module.scss";
import { addComponent } from "@/store/componentsReducer";
import { nanoid } from "@reduxjs/toolkit";

const { Title } = Typography;

const ComponentTab = () => {
  const dispatch = useDispatch();

  // 生成组件函数
  function genComponent(componentConfig) {
    const { Component, title, type } = componentConfig;

    // 用户点击组件，把选中的组件添加到画布
    function handleClick() {
      dispatch(
        addComponent({
          fe_id: nanoid(5),
          title,
          type,
        })
      );
    }

    return (
      <div key={type} className={styles.wrapper} onClick={handleClick}>
        <div className={styles.component}>
          <Component></Component>
        </div>
      </div>
    );
  }

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
