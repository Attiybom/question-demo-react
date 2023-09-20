import React from "react";
import { Button, Space, Tooltip } from "antd";
import { DeleteOutlined, EyeOutlined, LockOutlined } from "@ant-design/icons";
import {
  removeComponent,
  changeComponentHidden,
  toggleComponentLock,
} from "@/store/componentsReducer";
import { useDispatch } from "react-redux";
import useGetComponentsInfo from "@/hooks/useGetComponentsInfo";

const EditToolbar = () => {
  const dispatch = useDispatch();

  //
  const { selectedId, selectedComponent } = useGetComponentsInfo();

  //
  const { isLocked } = selectedComponent || {};

  // 删除组件
  const handleDeleteCpn = () => {
    dispatch(removeComponent());
  };

  // 隐藏组件
  const handleHiddenCpn = () => {
    dispatch(changeComponentHidden({ fe_id: selectedId, isHidden: true }));
  };

  const handleLockCpn = () => {
    dispatch(toggleComponentLock({ fe_id: selectedId }));
  };

  return (
    <Space>
      <Tooltip title="删除">
        <Button
          shape="circle"
          icon={<DeleteOutlined></DeleteOutlined>}
          onClick={handleDeleteCpn}
        ></Button>
      </Tooltip>
      <Tooltip title="隐藏">
        <Button
          shape="circle"
          icon={<EyeOutlined></EyeOutlined>}
          onClick={handleHiddenCpn}
        ></Button>
      </Tooltip>
      <Tooltip title="锁定">
        <Button
          shape="circle"
          icon={<LockOutlined></LockOutlined>}
          onClick={handleLockCpn}
          type={isLocked ? "primary" : "default"}
        ></Button>
      </Tooltip>
    </Space>
  );
};

export default EditToolbar;
