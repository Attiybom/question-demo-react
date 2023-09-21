import React from "react";
import { Typography, Input } from "antd";

const { Paragraph } = Typography;
const { TextArea } = Input;

const QuestionTextarea = (props) => {
  const { title = "多行输入标题", placeholder = "请输入..." } = props;

  return (
    <div>
      <Paragraph strong>{title}</Paragraph>
      <div>
        <TextArea placeholder={placeholder}></TextArea>
      </div>
    </div>
  );
};

export default QuestionTextarea;
