import { Outlet, useNavigate, useLocation } from "react-router-dom";
import styles from "./ManageLayout.module.scss";
import { Button, Space, Divider, message } from "antd";
import {
  PlusOutlined,
  UnorderedListOutlined,
  StarOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
// import { useState } from "react";
import { createQuestionService } from "../services/question";
import { useRequest } from "ahooks";

export default function ManageLayout() {
  const nav = useNavigate();
  const { pathname } = useLocation();

  // const [loading, setLoading] = useState(false);

  // async function handleClickCreate() {
  //   setLoading(true);
  //   const data = await createQuestionService();
  //   const { id } = data || {};
  //   nav(`/question/edit/${id}`);
  //   message.success("创建问卷成功！");

  //   setLoading(false);
  // }

  const { loading, run: handleClickCreate } = useRequest(
    createQuestionService,
    {
      manual: true,
      onSuccess(res) {
        nav(`/question/edit/${res.id}`);
        message.success("创建问卷成功！");
      },
    }
  );

  // console.info("pathname", pathname);
  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <Space wrap>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={handleClickCreate}
            disabled={loading}
          >
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
