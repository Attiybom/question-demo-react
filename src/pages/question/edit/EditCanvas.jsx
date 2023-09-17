import React from "react";
import styles from "./EditCanvas.module.scss";

import QuestionTitle from "../../../components/QuestionComponents/QuestionTitle/component";
import QuestionInput from "@/components/QuestionComponents/QuestionInput/component";

const EditCanvas = () => {
  return (
    <div className={styles.canvas}>
      <div>
        <QuestionTitle></QuestionTitle>
      </div>
      <div>
        <QuestionInput></QuestionInput>
      </div>
    </div>
  );
};

export default EditCanvas;
