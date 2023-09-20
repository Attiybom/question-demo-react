import QuestionTitleConfig from './QuestionTitle/index'
import QuestionInputConfig from './QuestionInput/index'
import QuestionParagraphConfig from "./QuestionParagraph/index";

const componentConfigList = [
  QuestionInputConfig,
  QuestionTitleConfig,
  QuestionParagraphConfig,
];

// 全部的组件配置的列表，可以根据参数动态返回
export function getComponentConfigByType(type) {
  const targetConfig = componentConfigList.find((c) => c.type === type);
  // console.log('targetConfig', targetConfig)
  return targetConfig;
}

// 左侧画板 - 组件库 -组件分组
export const componentConfigGroup = [
  {
    groupId: "textGroup",
    groupName: "文本显示",
    components: [QuestionTitleConfig, QuestionParagraphConfig],
  },
  {
    groupId: "inputGroup",
    groupName: "用户输入",
    components: [QuestionInputConfig],
  },
];
