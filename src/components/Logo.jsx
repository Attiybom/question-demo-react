import { Space, Typography } from "antd";
import { Link } from "react-router-dom";
import { FileOutlined } from "@ant-design/icons";
import styles from "./Logo.module.scss";
import { useEffect, useState } from "react";
import useGetUserInfo from "../hooks/useGetUserInfo";

const { Title } = Typography;

export default function Logo() {
  const [pathname, setPathname] = useState("/");

  const { username } = useGetUserInfo() || {};
  useEffect(() => {
    if (username) {
      setPathname("/manage/list");
    }
  }, [username]);

  return (
    <div className={styles.container}>
      <Link to={pathname}>
        <Space>
          <Title level={1}>
            <FileOutlined />
          </Title>
          <Title>小慕问卷</Title>
        </Space>
      </Link>
    </div>
  );
}
