import { Outlet, useNavigate, useLocation } from "react-router-dom";
import styles from "./ManageLayout.module.scss";
import { Button, Space, Divider } from "antd";
import {
  PlusOutlined,
  UnorderedListOutlined,
  StarOutlined,
  DeleteOutlined,
} from "@ant-design/icons";

export default function ManageLayout() {
  const nav = useNavigate();
  const { pathname } = useLocation();

  // console.info("pathname", pathname);
  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <Space wrap>
          <Button type="primary" icon={<PlusOutlined />}>
            创建问卷
          </Button>
          <Divider />
          <Button
            type={pathname.endsWith("list") ? "default" : "text"}
            icon={<UnorderedListOutlined />}
            onClick={() => nav("/manage/list")}
          >
            我的问卷
          </Button>
          <Button
            type={pathname.endsWith("star") ? "default" : "text"}
            icon={<StarOutlined />}
            onClick={() => nav("/manage/star")}
          >
            星标问卷
          </Button>
          <Button
            type={pathname.endsWith("trash") ? "default" : "text"}
            icon={<DeleteOutlined />}
            onClick={() => nav("/manage/trash")}
          >
            回收站
          </Button>
        </Space>
      </div>
      <div className={styles.right}>
        <Outlet></Outlet>
      </div>
    </div>
  );
}
