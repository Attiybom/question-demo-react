import React from "react";
import { Typography } from "antd";

const { Paragraph } = Typography;

const QuestionRadio = (props) => {
  const { text = "一行段落", isCenter = false } = props;

  // 换行实现: 方式一，但有安全危险
  // const newText = text.replaceAll("\n", "<br>");

  // 换行实现：方式二 => 根据换行符，切割成数组
  const textList = text.split("\n");

  return (
    <Paragraph
      style={{ textAlign: isCenter ? "center" : "start", marginBottom: 0 }}
    >
      {/* <span dangerouslySetInnerHTML={{ __html: newText }}></span> */}
      {textList.map((t, index) => (
        <span key={index}>
          {/* 如果该文本不是第一个，则添加上一个br，换行 */}
          {index > 0 && <br></br>}
          {t}
        </span>
      ))}
    </Paragraph>
  );
};

export default QuestionRadio;
