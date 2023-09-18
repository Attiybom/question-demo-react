import QuestionTitleConfig from './QuestionInput/index'
import QuestionInputConfig from './QuestionTitle/index'

const componentConfigList = [QuestionInputConfig, QuestionTitleConfig]

// 全部的组件配置的列表，可以根据参数动态返回
export function getComponentConfigByType(type) {
  return componentConfigList.find(c => c.type === type)
}
