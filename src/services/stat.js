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
