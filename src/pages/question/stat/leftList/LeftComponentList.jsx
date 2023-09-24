import React from "react";
import useGetComponentsInfo from "@/hooks/useGetComponentsInfo";
import { getComponentConfigByType } from "@/components/QuestionComponents";
import classNames from "classnames";
import styles from "./LeftComponentList.module.scss";

export default function LeftComponentList(props) {
  const { componentList = [] } = useGetComponentsInfo();

  const { selectComponentId, setSelectComponentId, setSelectComponentType } =
    props;

  return (
    <div className={styles.container}>
      {componentList
        .filter((c) => !c.isHidden)
        .map((c) => {
          const { fe_id, type, props } = c;

          const ComponentConfig = getComponentConfigByType(type);
          if (ComponentConfig == null) return null;

          const { Component } = ComponentConfig;

          // 拼接class
          const wrapperDefaultClassName = styles[`component-wrapper`];
          const selectedClassName = styles.selected;
          const wrapperClassName = classNames({
            [wrapperDefaultClassName]: true,
            [selectedClassName]: fe_id === selectComponentId,
          });

          return (
            <div
              className={wrapperClassName}
              key={fe_id}
              onClick={() => {
                setSelectComponentId(fe_id);
                setSelectComponentType(type);
              }}
            >
              <div className={styles.Component}>
                <Component {...props}></Component>
              </div>
            </div>
          );
        })}
    </div>
  );
}
