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
import { useState } from "react";
import { useRequest } from "ahooks";
import {
  updateQuestionListService,
  copyQuestionService,
} from "../services/question";

export default function QuestionCard(props) {
  const { id, title, isPublished, isStar, answerCount, createAt } = props;

  const nav = useNavigate();

  const { loading: copyLoading, run: handleCopy } = useRequest(
    async () => {
      const data = await copyQuestionService(id);
      return data;
    },
    {
      manual: true,
      onSuccess(res) {
        message.success("复制成功！");
        nav(`/question/edit/${res.id}`);
      },
    }
  );

  const [isDeletedState, setIsDeletedState] = useState(false);
  const { loading: delLoading, run: handleDel } = useRequest(
    async () =>
      await updateQuestionListService(id, {
        isDeleted: true,
      }),
    {
      manual: true,
      onSuccess() {
        message.success("删除成功！");
        setIsDeletedState(true);
      },
    }
  );

  // 标星功能交互
  const [isStarState, setIsStarState] = useState(isStar);
  const { loading: changeStarLoading, run: handleChangeStar } = useRequest(
    async () => {
      await updateQuestionListService(id, {
        isStar: !isStarState,
      });
    },
    {
      manual: true,
      onSuccess() {
        setIsStarState(!isStarState);
        message.success(isStarState ? "标星成功！" : "取消标星成功！");
      },
    }
  );

  // 这段必须放在最后，不然会报错 => 不再渲染卡片
  if (isDeletedState) return null;

  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <div className={styles.left}>
          <Link
            to={isPublished ? `/question/edit/${id}` : `/question/stat/${id}`}
          >
            <Space>
              {isStarState && (
                <StarOutlined style={{ color: "red" }}></StarOutlined>
              )}
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
            <Button
              icon={<StarOutlined />}
              type="text"
              size="small"
              onClick={handleChangeStar}
              disabled={changeStarLoading}
            >
              {isStarState ? "取消标星" : "标星"}
            </Button>
            <Popconfirm
              placement="top"
              title="是否确定复制？"
              okText="确定"
              cancelText="取消"
              onConfirm={() => handleCopy(id)}
              disabled={copyLoading}
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
              disabled={delLoading}
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
