import React from "react";
import { Button, Space, Tooltip } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { removeComponent } from "@/store/componentsReducer";
import { useDispatch } from "react-redux";

const EditToolbar = () => {
  const dispatch = useDispatch();

  const handleDeleteCpn = () => {
    // console.log("");
    dispatch(removeComponent());
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
    </Space>
  );
};

export default EditToolbar;
