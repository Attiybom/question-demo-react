import { Space, Typography } from "antd";
import { Link } from "react-router-dom";
import { FileOutlined } from "@ant-design/icons";
import styles from "./Logo.module.scss";

const { Title } = Typography;

export default function Logo() {
  return (
    <div className={styles.container}>
      <Link to="/">
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
