import axios from "./ajax";

// 获取获取统计页答卷信息
export async function getQuestionStatListService(
  questionId,
  opt = { page: 1, pageSize: 10 }
) {
  const url = `/api/stat/${questionId}`;
  const data = await axios.get(url, { params: opt });

  return data;
}
// 获取组件的统计数据汇总
export async function getComponentStatService(
  questionId,
  componentId
) {
  const url = `/api/stat/${questionId}/${componentId}`;
  const data = await axios.get(url);

  return data;
}
