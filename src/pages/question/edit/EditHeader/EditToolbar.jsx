import React from "react";
import { Button, Space, Tooltip } from "antd";
import {
  DeleteOutlined,
  EyeOutlined,
  LockOutlined,
  CopyOutlined,
  BlockOutlined,
  UpOutlined,
  DownOutlined,
} from "@ant-design/icons";
import {
  removeComponent,
  changeComponentHidden,
  toggleComponentLock,
  copySelectedComponent,
  pasteCopiedComponent,
  moveComponent,
} from "@/store/componentsReducer";
import { useDispatch } from "react-redux";
import useGetComponentsInfo from "@/hooks/useGetComponentsInfo";
import useBindCanvasKeyPress from "@/hooks/useBindCanvasKeyPress";

const EditToolbar = () => {
  const dispatch = useDispatch();

  //
  const {
    selectedId,
    selectedComponent,
    copiedComponent = null,
    componentList = [],
  } = useGetComponentsInfo();

  // 当前选中组件的index
  const length = componentList.length;
  const targetIndex = componentList.findIndex((c) => c.fe_id === selectedId);
  const isFirstCpn = targetIndex <= 0; // 是否是第一个组件
  const isLastCpn = targetIndex + 1 >= length; //是否是最后一个组件

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

  // 锁定组件
  const handleLockCpn = () => {
    dispatch(toggleComponentLock({ fe_id: selectedId }));
  };

  // 复制组件
  const handleCopyCpn = () => {
    dispatch(copySelectedComponent());
  };
  // 粘贴组件
  const handlePasteCpn = () => {
    // 先判断store中是否存在已经拷贝的组件信息
    if (copiedComponent) {
      dispatch(pasteCopiedComponent());
    }
  };

  // 组件上移功能
  const handleMoveUpCpn = () => {
    if (isFirstCpn) return;
    dispatch(
      moveComponent({ oldIndex: targetIndex, newIndex: targetIndex - 1 })
    );
  };

  // 组件下移功能
  const handleMoveDownCpn = () => {
    if (isFirstCpn) return;
    dispatch(
      moveComponent({ oldIndex: targetIndex, newIndex: targetIndex + 1 })
    );
  };

  // 绑定功能快捷键
  useBindCanvasKeyPress();

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
      <Tooltip title="复制">
        <Button
          shape="circle"
          icon={<CopyOutlined></CopyOutlined>}
          onClick={handleCopyCpn}
        ></Button>
      </Tooltip>
      <Tooltip title="粘贴">
        <Button
          shape="circle"
          icon={<BlockOutlined></BlockOutlined>}
          onClick={handlePasteCpn}
          disabled={copiedComponent == null}
        ></Button>
      </Tooltip>
      <Tooltip title="上移">
        <Button
          shape="circle"
          icon={<UpOutlined></UpOutlined>}
          onClick={handleMoveUpCpn}
          disabled={isFirstCpn}
        ></Button>
      </Tooltip>
      <Tooltip title="下移">
        <Button
          shape="circle"
          icon={<DownOutlined></DownOutlined>}
          onClick={handleMoveDownCpn}
          disabled={isLastCpn}
        ></Button>
      </Tooltip>
    </Space>
  );
};

export default EditToolbar;
