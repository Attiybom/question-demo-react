import { Pagination } from "antd";
import {
  LIST_PAGE_PAPAM_KEY,
  LIST_PAGE_SIZE_PAPAM_KEY,
  LIST_PAGE_SIZE,
} from "../constant/index";
import { useSearchParams, useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

export default function ListPagination(props) {
  const { total } = props;

  const [current, setCurrent] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  // 一旦url参数发生变化，则从url中获取参数page + pageSize, 同步到Pagination组件中
  const [searchParams] = useSearchParams();
  useEffect(() => {
    const page = parseInt(searchParams.get(LIST_PAGE_PAPAM_KEY) || "") || 1;
    setCurrent(page);
    const pageSize =
      parseInt(searchParams.get(LIST_PAGE_SIZE_PAPAM_KEY) || "") ||
      LIST_PAGE_SIZE;
    setPageSize(pageSize);
  }, [searchParams]);

  //用户主动点击分页器跳转，实际上是通过改url的参数，然后被监听从而改变
  const nav = useNavigate();
  const { pathname } = useLocation();

  function handlePageChange(page, pageSize) {
    searchParams.set(LIST_PAGE_PAPAM_KEY, page);
    searchParams.set(LIST_PAGE_SIZE_PAPAM_KEY, pageSize);

    nav({
      pathname,
      search: searchParams.toString(),
    });
  }

  return (
    <>
      <Pagination
        current={current}
        total={total}
        pageSize={pageSize}
        onChange={handlePageChange}
      ></Pagination>
    </>
  );
}
