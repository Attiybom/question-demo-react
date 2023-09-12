import axios from "./ajax";

// 获取单个问卷信息
export async function getQuestionService(id) {
  const url = `/api/question/${id}`
  const data = (await axios.get(url))

  return data
}

export async function createQuestionService() {
  const url = `/api/question`
  const data = (await axios.post(url))

  return data
}
