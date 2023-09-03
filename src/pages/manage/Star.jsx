import { useState } from "react";
import styles from "./common.module.scss";
import QuestionCard from "../../components/QuestionCard";
import { useTitle } from "ahooks";
import { Typography, Empty } from "antd";

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
    isStar: true,
    answerCount: 4,
    createAt: "2023.01.11",
  },
];



export default function Star() {
  useTitle("小慕问卷-星标问卷");
  const [dataList, setDataList] = useState(rawData);
  const { Title } = Typography;

  return (
    <>
      <div className={styles.header}>
        <div className={styles.left}>
          <Title level={3}>星标问卷</Title>
        </div>
        <div className={styles.right}>（搜索）</div>
      </div>
      <div className={styles.content}>
        {!dataList.length && <Empty />}
        {dataList.length > 0 &&
          dataList.map((item) => {
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
