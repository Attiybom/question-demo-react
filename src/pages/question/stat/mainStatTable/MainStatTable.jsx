import React, { useState } from "react";
import { Typography, Table, Spin, Pagination } from "antd";
import { useRequest } from "ahooks";
import { useParams } from "react-router-dom";
import { getQuestionStatListService } from "@/services/stat";
import useGetComponentsInfo from "@/hooks/useGetComponentsInfo";
import { STAT_PAGE_SIZE } from "@/constant";

const { Title } = Typography;

const MainStatTable = (props) => {
  const { selectComponentId, setSelectComponentId, setSelectComponentType } =
    props;

  const { id = "" } = useParams();
  // 表头列表
  const [list, setList] = useState([]);
  const [total, setTotal] = useState(0);

  // 分页相关
  const [page, setPage] = useState(STAT_PAGE_SIZE);
  const [pageSize, setPageSize] = useState(10);

  const { loading } = useRequest(
    async () => await getQuestionStatListService(id, { page, pageSize }),
    {
      onSuccess(res) {
        const { list, total } = res;
        setList(list);
        setTotal(total);
      },
      refreshDeps: [page, pageSize, id], //依赖项， 如果依赖项发送变化则重新发送请求
    }
  );

  const { componentList = [] } = useGetComponentsInfo();
  // 生成表头列表
  const columnsList = componentList.map((c) => {
    const { fe_id, props = [], title, type } = c;

    const newTitle = props.title || title;

    return {
      title: (
        <div
          style={{ cursor: "pointer" }}
          onClick={() => {
            setSelectComponentId(fe_id);
            setSelectComponentType(type);
          }}
        >
          <span style={{ color: fe_id === selectComponentId ? "#1890ff" : "" }}>
            {newTitle}
          </span>
        </div>
      ),
      dataIndex: fe_id,
    };
  });

  // 生成表格key

  const TableElem = (
    <>
      <Table
        dataSource={list}
        columns={columnsList}
        rowKey={(q) => q._id}
        pagination={false}
      />
      <div style={{ textAlign: "center", marginTop: `18px` }}>
        <Pagination
          total={total}
          pageSize={pageSize}
          current={page}
          onChange={(page) => setPage(page)}
          onShowSizeChange={(page, pageSize) => {
            setPage(page);
            setPageSize(pageSize);
          }}
        ></Pagination>
      </div>
    </>
  );

  return (
    <div>
      <Title level={3}>答卷数量: {!loading && total}</Title>
      {loading && (
        <div style={{ textAlign: "center" }}>
          <Spin />
        </div>
      )}
      {!loading && TableElem}
    </div>
  );
};

export default MainStatTable;
