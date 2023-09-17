// import { useParams } from "react-router-dom";
// import { useEffect, useState } from "react";
// import { getQuestionService } from "../../../services/question";
import useLoadQuestionData from "../../../hooks/useLoadQuestionData";
import styles from "./index.module.scss";
import EditCanvas from "./EditCanvas";

export default function Index() {
  // const { id = "" } = useParams();

  // const [loading, setLoading] = useState(true);
  // const [questionData, setQuestionData] = useState({});

  // // useEffect 无法直接执行async
  // useEffect(() => {
  //   async function fn() {
  //     const data = await getQuestionService(id);
  //     // console.info("getQuestion", data);
  //     setQuestionData(data);
  //     setLoading(false);
  //   }
  //   fn();
  // }, []);

  // const { loading, data } = useLoadQuestionData();

  return (
    <div className={styles.container}>
      <div style={{ backgroundColor: "#fff", height: `40px` }}>header</div>
      {/* <div>{!waitingUserData && <Outlet></Outlet>}</div> */}
      <div className={styles[`content-wrapper`]}>
        <div className={styles.content}>
          <div className={styles.left}>left</div>
          <div className={styles.main}>
            <div className={styles[`canvas-wrapper`]}>
              <div style={{ height: `900px` }}>
                <EditCanvas></EditCanvas>
              </div>
            </div>
          </div>
          <div className={styles.right}>right</div>
        </div>
      </div>
    </div>
  );
}
