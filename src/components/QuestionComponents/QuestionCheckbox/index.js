import Component from "./component"; //中间画布显示组件
import PropsComponent from "./PropsComponent"; //右侧组件信息
import StatComponent from "./StatComponent";

// 多选标题组件的配置
const questionCheckboxConfig = {
  title: "多选标题",
  type: "questionCheckbox",
  Component,
  PropsComponent,
  StatComponent,
};

export default questionCheckboxConfig;
