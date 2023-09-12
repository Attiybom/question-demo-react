import styles from "./common.module.scss";
import QuestionCard from "../../components/QuestionCard";
import { useTitle } from "ahooks";
import { Typography, Empty, Spin } from "antd";
import ListSearch from "../../components/ListSearch";
import useLoadQuestionListData from "../../hooks/useLoadQuestionListData";

export default function Star() {
  useTitle("小慕问卷-星标问卷");
  const { Title } = Typography;

  const { data = {}, loading } = useLoadQuestionListData({ isStar: true });
  const { list = [], total = 0 } = data;

  return (
    <>
      <div className={styles.header}>
        <div className={styles.left}>
          <Title level={3}>星标问卷</Title>
        </div>
        <div className={styles.right}>
          {" "}
          <ListSearch></ListSearch>
        </div>
      </div>
      <div className={styles.content}>
        {loading && (
          <div style={{ textAlign: "center" }}>
            <Spin></Spin>
          </div>
        )}

        {!loading && !list.length && <Empty />}
        {!loading &&
          list.length > 0 &&
          list.map((item) => {
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
      <div className={styles.footer}>分页</div>
    </>
  );
}
