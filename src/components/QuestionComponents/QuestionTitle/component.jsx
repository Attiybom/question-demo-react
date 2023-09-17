import React from "react";
import { Typography } from "antd";

const { Title } = Typography;

const QuestionTitle = (props) => {
  const { text = "一级标题", level = 1, isCenter = false } = props;

  const genFontSize = (level) => {
    if (level === 1) return "24px";
    if (level === 2) return "24px";
    if (level === 3) return "24px";
    return "16px";
  };

  return (
    <Title
      level={level}
      style={{
        textAlign: isCenter ? "center" : "start",
        marginBottom: "0",
        fontSize: genFontSize(level),
      }}
    >
      {text}
    </Title>
  );
};

export default QuestionTitle;
