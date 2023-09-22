import { useSelector } from "react-redux";

export default function useGetPageInfo() {
  const pageInfo = useSelector((state) => state.pageInfo);

  return pageInfo;
}
