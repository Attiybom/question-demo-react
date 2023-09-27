import React, { useRef } from "react";
import {
  Button,
  Space,
  Typography,
  Tooltip,
  Input,
  message,
  Popover,
} from "antd";
import { CopyOutlined, QrcodeOutlined, LeftOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import QRCode from "qrcode.react";

import useGetPageInfo from "@/hooks/useGetPageInfo";
import styles from "./StatHeader.module.scss";

const { Title } = Typography;

const StatHeader = () => {
  const nav = useNavigate();
  const { id = "" } = useParams();

  const { title = "", isPublished = false } = useGetPageInfo();

  const urlRefInput = useRef(null);
  function copyUrl() {
    const Elem = urlRefInput.current;

    if (Elem == null) return;

    Elem.select(); // 选中 input的内容
    document.execCommand("Copy"); // 拷贝内容
    message.success("复制来凝结成功");

    //
  }

  // 生成h5 url和二维码
  function genUrlAndQRcode() {
    //  问卷未发布，什么都不生成
    if (!isPublished) return null;

    // 拼接url - 配合c端的参考
    const url = `http://localhost:3000/question/${id}`;

    // 二维码组件
    const QRCodeElem = (
      <div style={{ textAlign: "center" }}>
        <QRCode value={url} size={150} />
      </div>
    );

    return (
      <Space>
        <Input style={{ width: `300px` }} value={url} ref={urlRefInput}></Input>
        <Tooltip title="复制链接">
          <Button icon={<CopyOutlined />} onClick={copyUrl}></Button>
        </Tooltip>
        <Popover content={QRCodeElem}>
          <Button icon={<QrcodeOutlined />}></Button>
        </Popover>
      </Space>
    );
  }

  return (
    <div className={styles[`header-wrapper`]}>
      <div className={styles[`header`]}>
        <div className={styles.left}>
          <Space>
            <Button
              type="link"
              icon={<LeftOutlined></LeftOutlined>}
              onClick={() => nav(-1)}
            >
              返回
            </Button>
            <Title level={1} style={{ fontSize: "18px" }}>
              {title}
            </Title>
          </Space>
        </div>
        <div className={styles.main}>{genUrlAndQRcode()}</div>
        <div className={styles.right}>
          <Button type="primary" onClick={() => nav(`/question/edit/${id}`)}>
            编辑问卷
          </Button>
        </div>
      </div>
    </div>
  );
};

export default StatHeader;
