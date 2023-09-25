import Component from "./component";
import PropsComponent from "./PropsComponent";
import StatComponent from "./StatComponent";

/**
 * @description 段落组件的相关配置
 */
const componentConfig = {
  title: "单选框",
  type: "questionRadio",
  Component, //组件 => 用于展示在画布中
  PropsComponent, //属性配置 => 用于右侧属性面板显示
  StatComponent, //统计组件
};

export default componentConfig;
