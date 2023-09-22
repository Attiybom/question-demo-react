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
} from "@/store/componentsReducer";
import classNames from "classnames";
import styles from "./LayoutTab.module.scss";

const LayoutTab = () => {
  const { componentList, selectedId } = useGetComponentsInfo();
  const dispatch = useDispatch();

  // 修改正在选中的组件的标题
  const [changingTitleId, setChangingTitleId] = useState(selectedId);

  // 点击选中组件
  function handleTitleClick(fe_id) {
    const curComp = componentList.find((c) => c.fe_id === fe_id);
    if (curComp && curComp.isHidden) {
      message.info("不能选中隐藏的组件");
      return;
    }
    if (fe_id !== changingTitleId) {
      // 当前组件未被选中，执行选中
      dispatch(changeSelectedId(fe_id));
      setChangingTitleId("");
      return;
    }

    // 点击修改标题
    setChangingTitleId(fe_id);
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
                <Input value={title} />
              </div>
              <div className={styles[`handler`]}>
                <Space>
                  <Button
                    icon={isHidden ? <EyeOutlined /> : <EyeInvisibleOutlined />}
                    size="small"
                    shape="circle"
                    onClick={() => handleClickHidden(fe_id, isHidden)}
                  ></Button>
                  <Button
                    icon={isLocked ? <LockOutlined /> : <UnlockOutlined />}
                    size="small"
                    shape="circle"
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
