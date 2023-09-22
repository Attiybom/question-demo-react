import React from "react";
import useGetComponentsInfo from "@/hooks/useGetComponentsInfo";
import {
  EyeOutlined,
  LockOutlined,
  EyeInvisibleOutlined,
  UnlockOutlined,
} from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { Button } from "antd";
import {
  changeComponentHidden,
  toggleComponentLock,
} from "@/store/componentsReducer";
import classNames from "classnames";
import styles from "./LayoutTab.module.scss";

const LayoutTab = () => {
  const { componentList, selectedId } = useGetComponentsInfo();
  const dispatch = useDispatch();

  // console.log("componentList", componentList);

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
          const wrapperDefaultClassName = styles[`wrapper`];
          const selectIdClassName = styles.selected;
          const wrapperClassName = classNames({
            [wrapperDefaultClassName]: true,
            [selectIdClassName]: selectedId === fe_id,
          });

          return (
            <div key={fe_id} className={wrapperClassName}>
              <span>{title}</span>
              <div style={{ textAlign: "right" }}>
                <Button
                  icon={
                    isHidden ? (
                      <EyeInvisibleOutlined />
                    ) : (
                      <EyeOutlined></EyeOutlined>
                    )
                  }
                  onClick={() => handleClickHidden(fe_id, isHidden)}
                ></Button>
                <Button
                  icon={isLocked ? <LockOutlined /> : <UnlockOutlined />}
                  onClick={() => handleClickLock(fe_id)}
                ></Button>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default LayoutTab;
