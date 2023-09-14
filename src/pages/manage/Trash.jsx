import { useState } from "react";
import styles from "./common.module.scss";
import { useTitle, useRequest } from "ahooks";
import {
  Typography,
  Empty,
  Table,
  Tag,
  Space,
  Button,
  message,
  Modal,
  Spin,
} from "antd";
import ListSearch from "../../components/ListSearch";
import useLoadQuestionListData from "../../hooks/useLoadQuestionListData";
import ListPagination from "../../components/ListPagination";
import {
  updateQuestionListService,
  deleteQuestionService,
} from "../../services/question";

const columns = [
  {
    title: "标题",
    dataIndex: "title",
    key: "id",
  },
  {
    title: "是否发布",
    dataIndex: "isPublished",
    key: "id",
    render: (isPublished) => (
      <>
        {isPublished ? <Tag color="processing">已发布</Tag> : <Tag>未发布</Tag>}
      </>
    ),
  },
  {
    title: "答卷",
    dataIndex: "answerCount",
    key: "id",
  },
  {
    title: "创建时间",
    dataIndex: "createAt",
    key: "id",
  },
];

export default function Trash() {
  useTitle("小慕问卷-回收站");
  const { Title } = Typography;

  const {
    data = {},
    loading,
    refresh,
  } = useLoadQuestionListData({ isDeleted: true });
  const { list = [], total = 0 } = data;

  // 选中的ids
  const [selectRows, setSelectRows] = useState([]);

  // 恢复按钮逻辑
  const { loading: restoreLoading, run: handleRestore } = useRequest(
    async () => {
      for await (let id of selectRows) {
        await updateQuestionListService(id, {
          isDeleted: false,
        });
      }
    },
    {
      manual: true,
      debounceWait: 500,
      onSuccess(res) {
        message.success("恢复成功！");
        refresh(); //重新加载数据
        setSelectRows([]);
      },
    }
  );

  // 删除逻辑

  const { run: deleteQuestion, loading: deleteLoading } = useRequest(
    async () => deleteQuestionService(selectRows),
    {
      manual: true,
      debounceWait: 500,
      onSuccess() {
        message.success("删除成功！");
      },
    }
  );

  const handleDel = () => {
    console.info("clickDel");
    Modal.warning({
      title: "是否确定删除该问卷？",
      content: "删除后无法恢复",
      onOk: () => {
        deleteQuestion();
        refresh();
        setSelectRows([]);
      },
    });
  };

  const TableEl = (
    <>
      <div style={{ marginBottom: "12px" }}>
        <Space>
          <Button
            type="primary"
            disabled={selectRows.length === 0 || restoreLoading}
            onClick={handleRestore}
          >
            恢复
          </Button>
          <Button
            onClick={handleDel}
            disabled={selectRows.length === 0 || deleteLoading}
            danger
          >
            彻底删除
          </Button>
        </Space>
      </div>

      <Table
        dataSource={list}
        columns={columns}
        rowKey={(q) => q.id}
        pagination={false}
        rowSelection={{
          type: "checkbox",
          onChange: (selectedRowKeys) => {
            // console.log(`selectedRowKeys: ${selectedRowKeys}`);
            setSelectRows(selectedRowKeys);
          },
        }}
      />
    </>
  );

  return (
    <>
      <div className={styles.header}>
        <div className={styles.left}>
          <Title level={3}>回收站</Title>
        </div>
        <div className={styles.right}>
          <ListSearch></ListSearch>
        </div>
      </div>
      {loading && (
        <div style={{ textAlign: "center" }}>
          <Spin></Spin>
        </div>
      )}
      <div className={styles.content}>
        {!loading && !list.length && <Empty />}
        {list.length > 0 && TableEl}
      </div>
      <div className={styles.footer}>
        <ListPagination total={total}></ListPagination>
      </div>
    </>
  );
}
