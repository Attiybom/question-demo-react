import React from "react";
import styles from "./EditCanvas.module.scss";
import { Spin } from "antd";
// import QuestionTitle from "../../../components/QuestionComponents/QuestionTitle/component";
// import QuestionInput from "@/components/QuestionComponents/QuestionInput/component";
import useGetComponentsInfo from "@/hooks/useGetComponentsInfo";
import { getComponentConfigByType } from "@/components/QuestionComponents";
import { useDispatch } from "react-redux";
import { changeSelectedId } from "@/store/componentsReducer";
import classNames from "classnames";

// 获取单个组件的信息，以便循环渲染
function getComponent(componentInfo) {
  const { type, props } = componentInfo; //外边传进来store获取的服务端数据，解构出对应的组件类型和对应的组件属性，比如text，title等

  // 根据type获取到对应的组件配置信息
  const componentConfig = getComponentConfigByType(type);
  // console.log("componentConfig", componentConfig);

  if (componentConfig == null) return null;

  const { Component } = componentConfig;

  return <Component {...props}></Component>;
}

const EditCanvas = ({ loading = false }) => {
  // 这个hooks会从store中获取问卷列表数据，并返回
  const { componentList, selectedId } = useGetComponentsInfo();
  // console.log("componentList", componentList);

  const dispatch = useDispatch();

  const handleCpnClick = (event, id) => {
    event.stopPropagation(); //组织冒泡
    dispatch(changeSelectedId(id));
    // console.log("id", id);
  };

  if (loading) {
    return (
      <div style={{ textAlign: "center", marginTop: "24px" }}>
        <Spin></Spin>
      </div>
    );
  }

  return (
    <div className={styles.canvas}>
      {componentList.map((cpn) => {
        const { fe_id } = cpn;

        // 拼接 class name
        const wrapperDefaultClassName = styles[`component-wrapper`];
        const selectdClassName = styles.selected;
        const wrapperClassName = classNames({
          [wrapperDefaultClassName]: true,
          [selectdClassName]: selectedId === fe_id,
        });

        // 这里把问卷列表数据传到getComponent函数中，通过这个函数找到对应的组件，最后渲染出来
        return (
          <div
            className={wrapperClassName}
            key={fe_id}
            onClick={(e) => handleCpnClick(e, fe_id)}
          >
            <div className={styles.component}>{getComponent(cpn)}</div>
          </div>
        );
      })}

      {/* 暂时写死 */}
      {/* <div className={styles[`component-wrapper`]}>
        <div className={styles.component}>
          <QuestionTitle></QuestionTitle>
        </div>
      </div>
      <div className={styles[`component-wrapper`]}>
        <div className={styles.component}>
          <QuestionInput></QuestionInput>
        </div>
      </div> */}
    </div>
  );
};

export default EditCanvas;
