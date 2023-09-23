import React from "react";
import styles from "./EditCanvas.module.scss";
import { Spin } from "antd";
// import QuestionTitle from "../../../components/QuestionComponents/QuestionTitle/component";
// import QuestionInput from "@/components/QuestionComponents/QuestionInput/component";
import useGetComponentsInfo from "@/hooks/useGetComponentsInfo";
import { getComponentConfigByType } from "@/components/QuestionComponents";
import { useDispatch } from "react-redux";
import { changeSelectedId, moveComponent } from "@/store/componentsReducer";
import classNames from "classnames";
import SortableContainer from "@/components/DragSortable/SortableContainer";
import SortableItem from "@/components/DragSortable/SortableItem";

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
    // console.log("handleCpnClick——fe_id", id);
    event.stopPropagation(); //组织冒泡
    dispatch(changeSelectedId(id));
  };

  if (loading) {
    return (
      <div style={{ textAlign: "center", marginTop: "24px" }}>
        <Spin></Spin>
      </div>
    );
  }

  // 拖拽组件所需要的元素数组
  const componentListWithId = componentList.map((c) => {
    return {
      ...c,
      id: c.fe_id,
    };
  });

  // 拖拽函数
  function handleDragEnd(oldIndex, newIndex) {
    dispatch(moveComponent({ oldIndex, newIndex }));
  }

  return (
    <SortableContainer items={componentListWithId} onDragEnd={handleDragEnd}>
      <div className={styles.canvas}>
        {componentList
          .filter((c) => !c.isHidden)
          .map((cpn) => {
            const { fe_id, isLocked } = cpn;

            // 拼接 class name
            const wrapperDefaultClassName = styles[`component-wrapper`];
            const selectIdClassName = styles.selected;
            const lockedClassName = styles.locked;
            const wrapperClassName = classNames({
              [wrapperDefaultClassName]: true,
              [selectIdClassName]: selectedId === fe_id,
              [lockedClassName]: isLocked,
            });

            // 这里把问卷列表数据传到getComponent函数中，通过这个函数找到对应的组件，最后渲染出来
            return (
              <SortableItem key={fe_id} id={fe_id}>
                <div
                  className={wrapperClassName}
                  onClick={(e) => handleCpnClick(e, fe_id)}
                >
                  <div className={styles.component}>{getComponent(cpn)}</div>
                </div>
              </SortableItem>
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
    </SortableContainer>
  );
};

export default EditCanvas;
