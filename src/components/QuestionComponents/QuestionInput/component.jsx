import React from "react";
import { Typography, Input } from "antd";

const { Paragraph } = Typography;

const QuestionInput = (props) => {
  const { title = "输入框标题", placeholder = "请输入..." } = props;

  return (
    <div>
      <Paragraph strong>{title}</Paragraph>
      <div>
        <Input placeholder={placeholder}></Input>
      </div>
    </div>
  );
};

export default QuestionInput;
