import React from "react";
import { Typography } from "antd";

const { Title, Paragraph } = Typography;

const QuestionInfo = (props) => {
  const { title = "问卷标题", desc = "问卷描述" } = props;

  const descList = desc.split("\n");

  return (
    <div style={{ textAlign: "center" }}>
      <Title style={{ fontSize: "24px" }}>{title}</Title>
      <Paragraph>
        {descList.map((desc, index) => (
          <span key={index}>
            {index > 0 && <br></br>}
            {desc}
          </span>
        ))}
      </Paragraph>
    </div>
  );
};

export default QuestionInfo;
