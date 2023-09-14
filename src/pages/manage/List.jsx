import styles from "./common.module.scss";
import QuestionCard from "../../components/QuestionCard";
import { useTitle } from "ahooks";
import { Typography, Spin, Empty } from "antd";
import ListSearch from "../../components/ListSearch";
import { getQuestionListService } from "../../services/question";
import { useState, useEffect, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import { useDebounceFn, useRequest } from "ahooks";
import { LIST_PAGE_SIZE, LIST_SEARCH_PAPAM_KEY } from "../../constant/index";

export default function List() {
  useTitle("小慕问卷-我的问卷");
  // const [dataList, setDataList] = useState([]);
  const { Title } = Typography;
  const [searchParams] = useSearchParams();

  const [page, setPage] = useState(1);
  const [list, setList] = useState([]); //全部的列表数据
  const [total, setTotal] = useState(0);
  const haveMoreData = list.length > total; //是否还有未加载数据

  const keyword = searchParams.get(LIST_SEARCH_PAPAM_KEY) || "";

  // 加载更多数据
  const { run: loadMoreData, loading } = useRequest(
    async () => {
      const data = getQuestionListService({
        page,
        pageSize: LIST_PAGE_SIZE,
        keyword,
      });

      return data;
    },
    {
      manual: true,
      onSuccess(res) {
        console.info("loadMoreData");
        const { list: MoreData, total: dataTotal } = res;
        setList(list.concat(MoreData));
        setTotal(dataTotal);
        setPage(page + 1);
        // console.info("list", list);
      },
    }
  );

  // keyword变化时候，重新加载数据
  useEffect(() => {
    setPage(1);
    setList([]);
    setTotal(0);
  }, [keyword]);

  // 加载更多节点
  const containerRef = useRef(null);

  // 防抖 + 加载更多
  const { run: tryLoadMore } = useDebounceFn(
    () => {
      if (
        window.innerHeight + window.scrollY + 10 >=
        document.body.offsetHeight
      ) {
        console.info("滚动到了页面底部");
        // 执行相关操作，如加载更多数据
        loadMoreData();
      }
    },
    {
      wait: 500,
    }
  );

  // 组件渲染完成时，加载一次数据（即进入页面后）
  useEffect(() => {
    tryLoadMore();
  }, [searchParams]);

  // 用户搜索时，重新加载数据
  // 添加事件：页面滚动时候，要尝试加载数据
  useEffect(() => {
    // tryLoadMore()
    if (haveMoreData) {
      window.addEventListener("scroll", tryLoadMore);
    }

    window.addEventListener("scroll", tryLoadMore);

    // 组件销毁时，解绑事件
    return () => {
      window.removeEventListener("scroll", tryLoadMore);
    };
  }, [searchParams, haveMoreData]);

  // loadMoreElem
  const loadMoreContentElem = () => {
    if (loading) return <Spin></Spin>;
    if (total === 0) return <Empty description="暂无数据"></Empty>;
    if (!haveMoreData) return <span>开始加载下一页...</span>;
    return <span>全部数据加载完毕</span>;
  };

  return (
    <>
      <div className={styles.header}>
        <div className={styles.left}>
          <Title level={3}>我的问卷</Title>
        </div>
        <div className={styles.right}>
          <ListSearch></ListSearch>
        </div>
      </div>
      <div className={styles.content}>
        {list.map((item) => {
          const { id } = item;

          return (
            <QuestionCard
              className={styles["list-item"]}
              key={id}
              {...item}
            ></QuestionCard>
          );
        })}
      </div>
      <div className={styles.footer}>
        <div ref={containerRef}>{loadMoreContentElem()}</div>
      </div>
    </>
  );
}
