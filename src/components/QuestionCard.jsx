import styles from "./QuestionCard.module.scss";
import { Button, Space, Divider, Tag, Popconfirm, message } from "antd";
import {
  StarOutlined,
  CopyOutlined,
  DeleteOutlined,
  LineChartOutlined,
  EditOutlined,
} from "@ant-design/icons";
import { useNavigate, Link } from "react-router-dom";

export default function QuestionCard(props) {
  const { id, title, isPublished, isStar, answerCount, createAt } = props;

  const nav = useNavigate();

  function handleCopy() {
    message.success("复制成功！");
  }
  function handleDel() {
    message.success("删除成功！");
  }

  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <div className={styles.left}>
          <Link
            to={isPublished ? `/question/edit/${id}` : `/question/stat/${id}`}
          >
            <Space>
              {isStar && <StarOutlined style={{ color: "red" }}></StarOutlined>}
              {title}
            </Space>
          </Link>
        </div>
        <div className={styles.right}>
          <Space>
            {isPublished ? (
              <Tag color="processing">已发布</Tag>
            ) : (
              <Tag>未发布</Tag>
            )}
            <span>问卷：{answerCount}</span>
            <span>创建时间： {createAt}</span>
          </Space>
        </div>
      </div>
      <Divider style={{ margin: `12px 0` }}></Divider>
      <div className={styles.bottom}>
        <div className={styles.left}>
          <Space>
            <Button
              icon={<EditOutlined />}
              type="text"
              size="small"
              onClick={() => nav(`/question/edit/${id}`)}
            >
              编辑问卷
            </Button>
            <Button
              icon={<LineChartOutlined />}
              type="text"
              size="small"
              onClick={() => nav(`/question/stat/${id}`)}
              disabled={!isPublished}
            >
              数据统计
            </Button>
          </Space>
        </div>
        <div className={styles.right}>
          <Space>
            <Button icon={<StarOutlined />} type="text" size="small">
              {isStar ? "取消标星" : "标星"}
            </Button>
            <Popconfirm
              placement="top"
              title="是否确定复制？"
              okText="确定"
              cancelText="取消"
              onConfirm={handleCopy}
            >
              <Button icon={<CopyOutlined />} type="text" size="small">
                复制
              </Button>
            </Popconfirm>
            <Popconfirm
              placement="top"
              title="是否确定删除？"
              okText="确定"
              cancelText="取消"
              onConfirm={handleDel}
            >
              <Button icon={<DeleteOutlined />} type="text" size="small">
                删除
              </Button>
            </Popconfirm>
          </Space>
        </div>
      </div>
    </div>
  );
}
