import { useState } from "react";
import styles from "./common.module.scss";
import { useTitle } from "ahooks";
import {
  Typography,
  Empty,
  Table,
  Tag,
  Space,
  Button,
  message,
  Popconfirm,
  Modal,
} from "antd";

const rawData = [
  {
    id: "q1",
    title: "问卷1",
    isPublished: false,
    isStar: true,
    answerCount: 2,
    createAt: "2023.04.10",
  },
  {
    id: "q2",
    title: "问卷2",
    isPublished: true,
    isStar: true,
    answerCount: 3,
    createAt: "2023.05.10",
  },
  {
    id: "q3",
    title: "问卷3",
    isPublished: false,
    isStar: false,
    answerCount: 4,
    createAt: "2023.01.11",
  },
];

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
  const [dataList, setDataList] = useState(rawData);
  const { Title } = Typography;
  const [selectRows, setSelectRows] = useState([]);

  const handleDel = () => {
    console.info("clickDel");
    Modal.warning({
      title: "是否确定删除该问卷？",
      content: "删除后无法恢复",
      onOk: () => message.success("删除成功！"),
    });
  };

  const TableEl = (
    <>
      <div style={{ marginBottom: "12px" }}>
        <Space>
          <Button
            onClick={() => console.info("selectRows", selectRows)}
            type="primary"
            disabled={selectRows.length === 0}
          >
            恢复
          </Button>
          <Button onClick={handleDel} disabled={selectRows.length === 0} danger>
            彻底删除
          </Button>
        </Space>
      </div>

      <Table
        dataSource={dataList}
        columns={columns}
        rowKey={(q) => q.id}
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
        <div className={styles.right}>（搜索）</div>
      </div>
      <div className={styles.content}>
        {!dataList.length && <Empty />}
        {dataList.length > 0 && TableEl}
      </div>
    </>
  );
}
