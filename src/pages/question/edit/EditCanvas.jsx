import React from "react";
import styles from "./EditCanvas.module.scss";

import QuestionTitle from "../../../components/QuestionComponents/QuestionTitle/component";
import QuestionInput from "@/components/QuestionComponents/QuestionInput/component";

const EditCanvas = () => {
  return (
    <div className={styles.canvas}>
      <div className={styles[`component-wrapper`]}>
        <div className={styles.component}>
          <QuestionTitle></QuestionTitle>
        </div>
      </div>
      <div className={styles[`component-wrapper`]}>
        <div className={styles.component}>
          <QuestionInput></QuestionInput>
        </div>
      </div>
    </div>
  );
};

export default EditCanvas;
