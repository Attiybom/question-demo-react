import useLoadQuestionData from "../../../hooks/useLoadQuestionData";
import useGetPageInfo from "@/hooks/useGetPageInfo";
import { Button, Result, Spin } from "antd";
import { useNavigate } from "react-router-dom";
import { useTitle } from "ahooks";
import StatHeader from "./statHeader/StatHeader";
import styles from "./index.module.scss";

export default function Index() {
  const nav = useNavigate();
  const { loading } = useLoadQuestionData();
  const { title, isPublished } = useGetPageInfo();

  // 修改标题
  useTitle(`问卷统计 - ${title}`);

  const LoadingElem = (
    <div style={{ textAlign: "center", marginTop: "60px" }}>
      <Spin></Spin>
    </div>
  );

  // if (loading) {
  //   return (
  //     <div style={{ textAlign: "center", marginTop: "60px" }}>
  //       <Spin></Spin>
  //     </div>
  //   );
  // }

  // if (!isPublished) {
  //   return (
  //     <Result
  //       status="warning"
  //       title="问卷暂未发布"
  //       extra={
  //         <Button type="primary" onClick={() => nav(-1)}>
  //           返回首页
  //         </Button>
  //       }
  //     />
  //   );
  // }

  function genContentElem() {
    if (typeof isPublished === "boolean" && !isPublished) {
      return (
        <Result
          status="warning"
          title="问卷暂未发布"
          extra={
            <Button type="primary" onClick={() => nav(-1)}>
              返回首页
            </Button>
          }
        />
      );
    } else {
      return (
        <>
          <div className={styles.left}>left</div>
          <div className={styles.main}>main</div>
          <div className={styles.right}>right</div>
        </>
      );
    }
  }

  return (
    <div className={styles.container}>
      <StatHeader></StatHeader>
      <div className={styles[`content-wrapper`]}>
        {loading && LoadingElem}
        {!loading && (
          <div className={styles["content"]}>{genContentElem()}</div>
        )}
      </div>
    </div>
  );
}
