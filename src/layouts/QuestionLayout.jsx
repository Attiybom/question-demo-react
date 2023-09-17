// import { Outlet } from "react-router-dom";
import useLoadUserData from "../hooks/useLoadUserData";
import useNavPage from "../hooks/useNavPage";
import styles from "./Question.module.scss";

export default function QuestionLayout() {
  const waitingUserData = useLoadUserData();

  useNavPage(waitingUserData);

  return (
    <div className={styles.container}>
      <div style={{ backgroundColor: "#fff", height: `40px` }}>header</div>
      {/* <div>{!waitingUserData && <Outlet></Outlet>}</div> */}
      <div className={styles[`content-wrapper`]}>
        <div className={styles.content}>
          <div className={styles.left}>left</div>
          <div className={styles.main}>
            <div className={styles[`canvas-wrapper`]}>
              <div style={{ height: `900px` }}>画布-测试滚动</div>
            </div>
          </div>
          <div className={styles.right}>right</div>
        </div>
      </div>
    </div>
  );
}
