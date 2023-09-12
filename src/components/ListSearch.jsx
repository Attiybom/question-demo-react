import { Input } from "antd";
import { useState, useEffect } from "react";
import { LIST_SEARCH_PAPAM_KEY } from "../constant/index";
import { useNavigate, useLocation, useSearchParams } from "react-router-dom";

const { Search } = Input;

export default function ListSearch() {
  const nav = useNavigate();

  const { pathname } = useLocation();

  const [keyword, setKeyword] = useState("");

  const [searchParams] = useSearchParams();

  useEffect(() => {
    const newVal = searchParams.get(LIST_SEARCH_PAPAM_KEY) || "";
    setKeyword(newVal);
  }, [searchParams]);

  const handleChange = (e) => {
    const value = e.target.value;
    setKeyword(value);
    // console.info("e", value);
  };

  const onSearch = (value) => {
    // console.info("clickSearch");
    nav({
      pathname,
      search: `${LIST_SEARCH_PAPAM_KEY}=${value}`,
    });
  };

  return (
    <>
      <Search
        placeholder="请输入关键字"
        allowClear
        size="large"
        style={{ width: "260px" }}
        value={keyword}
        onChange={handleChange}
        onSearch={onSearch}
      />
    </>
  );
}
