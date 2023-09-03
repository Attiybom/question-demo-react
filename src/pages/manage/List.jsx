import { useState } from "react";
import styles from "./common.module.scss";
import QuestionCard from "../../components/QuestionCard";
// import { useSearchParams } from "react-router-dom";
import { useTitle } from "ahooks";
import { Typography } from "antd";

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
    isStar: false,
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
  {
    id: "q4",
    title: "问卷4",
    isPublished: true,
    isStar: false,
    answerCount: 0,
    createAt: "2023.06.20",
  },
];

export default function List() {
  useTitle("小慕问卷-我的问卷");
  const [dataList, setDataList] = useState(rawData);
  const { Title } = Typography;
  // const [SearchParams] = useSearchParams();

  // const keyword = SearchParams.get("keyword");
  // console.info("keyword", keyword);

  return (
    <>
      <div className={styles.header}>
        <div className={styles.left}>
          <Title level={3}>我的问卷</Title>
        </div>
        <div className={styles.right}>（搜索）</div>
      </div>
      <div className={styles.content}>
        {dataList.length &&
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
      <div className={styles.footer}>leadMore</div>
    </>
  );
}
