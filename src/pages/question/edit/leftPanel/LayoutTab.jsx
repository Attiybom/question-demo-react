import React, { useState } from "react";
import useGetComponentsInfo from "@/hooks/useGetComponentsInfo";
import {
  EyeOutlined,
  LockOutlined,
  EyeInvisibleOutlined,
  UnlockOutlined,
} from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { Button, Input, Space, message } from "antd";
import {
  changeComponentHidden,
  toggleComponentLock,
  changeSelectedId,
  changeComponentTitle,
} from "@/store/componentsReducer";
import classNames from "classnames";
import styles from "./LayoutTab.module.scss";

const LayoutTab = () => {
  const { componentList, selectedId } = useGetComponentsInfo();
  const dispatch = useDispatch();

  // 修改正在选中的组件的标题
  const [changingTitleId, setChangingTitleId] = useState("");

  // 点击选中组件
  function handleTitleClick(fe_id) {
    const curComp = componentList.find((c) => c.fe_id === fe_id);
    if (curComp && curComp.isHidden) {
      message.info("不能选中隐藏的组件");
      return;
    }
    if (fe_id !== selectedId) {
      // 当前组件未被选中，执行选中
      dispatch(changeSelectedId(fe_id));
      setChangingTitleId(""); //重置正在选中的标题
      return;
    }

    // 将之前选中的标题变成正在选中修改标题
    setChangingTitleId(fe_id);
  }

  // 修改标题
  function handleChangeTitle(e) {
    const newTitle = e.target.value.trim();
    if (!newTitle) return;
    if (!selectedId) return;
    dispatch(changeComponentTitle({ fe_id: selectedId, title: newTitle }));
  }

  // 控制隐藏与显示
  const handleClickHidden = (fe_id, state) => {
    const isHidden = !state;
    dispatch(changeComponentHidden({ fe_id, isHidden }));
  };
  // 控制隐藏与显示
  const handleClickLock = (fe_id) => {
    dispatch(toggleComponentLock({ fe_id }));
  };

  return (
    <>
      <div>
        {componentList.map((cpn) => {
          const { fe_id, title, isLocked, isHidden } = cpn;

          // 拼接 class name
          const titleDefaultClassName = styles[`title`];
          const selectIdClassName = styles.selected;
          const titleClassName = classNames({
            [titleDefaultClassName]: true,
            [selectIdClassName]: selectedId === fe_id,
          });

          return (
            <div key={fe_id} className={styles[`wrapper`]}>
              <div
                className={titleClassName}
                onClick={() => handleTitleClick(fe_id)}
              >
                {fe_id === changingTitleId && (
                  <Input
                    value={title}
                    // 回车和失焦的时候也重置
                    onPressEnter={() => setChangingTitleId("")}
                    onBlur={() => setChangingTitleId("")}
                    // 修改标题
                    onChange={(e) => handleChangeTitle(e)}
                  />
                )}
                {!(fe_id === changingTitleId) && title}
              </div>
              <div className={styles[`handler`]}>
                <Space>
                  <Button
                    icon={
                      !isHidden ? <EyeOutlined /> : <EyeInvisibleOutlined />
                    }
                    size="small"
                    shape="circle"
                    type={isHidden ? "primary" : "text"}
                    className={!isHidden ? styles.btn : ""}
                    onClick={() => handleClickHidden(fe_id, isHidden)}
                  ></Button>
                  <Button
                    icon={isLocked ? <LockOutlined /> : <UnlockOutlined />}
                    size="small"
                    shape="circle"
                    type={isLocked ? "primary" : "text"}
                    className={!isLocked ? styles.btn : ""}
                    onClick={() => handleClickLock(fe_id)}
                  ></Button>
                </Space>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default LayoutTab;
