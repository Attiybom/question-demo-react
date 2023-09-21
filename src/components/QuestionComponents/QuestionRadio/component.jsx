import React from "react";
import { Typography, Radio, Space } from "antd";

import { INIT_VALUE } from "./PropsComponent";

const { Paragraph } = Typography;

const QuestionRadio = (props) => {
  const {
    title,
    isVertical = false,
    options = [],
    value = "",
  } = { ...INIT_VALUE, ...props };

  return (
    <div>
      <Paragraph strong>{title}</Paragraph>
      <Radio.Group value={value}>
        <Space direction={isVertical ? "vertical" : "horizontal"}>
          {options.map((opt) => {
            const { value, text } = opt;
            return (
              <Radio key={value} value={value}>
                {text}
              </Radio>
            );
          })}
        </Space>
      </Radio.Group>
    </div>
  );
};

export default QuestionRadio;
