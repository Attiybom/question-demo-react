import React from "react";
import { Typography, Space, Checkbox } from "antd";
import { INIT_VALUE } from "./PropsComponent";

const { Paragraph } = Typography;

const QuestionCheckbox = (props) => {
  const { title, isVertical = false, list = [] } = { ...INIT_VALUE, ...props };

  return (
    <div>
      <Paragraph strong>{title}</Paragraph>
      <Space direction={isVertical ? "vertical" : "horizontal"}>
        {list.map((opt) => {
          const { text, value, checked } = opt;

          return (
            <Checkbox value={value} checked={checked} key={value}>
              {text}
            </Checkbox>
          );
        })}
      </Space>
    </div>
  );
};

export default QuestionCheckbox;
