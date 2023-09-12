import styles from "./common.module.scss";
import QuestionCard from "../../components/QuestionCard";
import { useTitle } from "ahooks";
import { Typography, Spin } from "antd";
import ListSearch from "../../components/ListSearch";
// import { getQuestionListService } from "../../services/question";
import useLoadQuestionListData from "../../hooks/useLoadQuestionListData";

export default function List() {
  useTitle("小慕问卷-我的问卷");
  // const [dataList, setDataList] = useState([]);
  const { Title } = Typography;

  const { data = {}, loading } = useLoadQuestionListData();
  const { list = [], total = 0 } = data;

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
        {loading && (
          <div style={{ textAlign: "center" }}>
            <Spin></Spin>
          </div>
        )}

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
      <div className={styles.footer}>leadMore</div>
    </>
  );
}
