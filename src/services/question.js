import axios from "./ajax";

// 获取单个问卷信息
export async function getQuestionService(id) {
  const url = `/api/question/${id}`
  const data = (await axios.get(url))

  return data
}

// 创建单个问卷
export async function createQuestionService() {
  const url = `/api/question`
  const data = (await axios.post(url))

  return data
}

// 获取问卷列表
export async function getQuestionListService(option = {}) {
  const url = `/api/question`
  const data = (await axios.get(url, { params: option }))

  return data
}

// 更新单个问卷
export async function updateQuestionListService(id, option = {}) {
  const url = `/api/question/${id}`
  const data = (await axios.patch(url, { params: option }))

  return data
}

// 复制单个问卷
export async function copyQuestionService(id) {
  const url = `/api/question/copy/${id}`
  const data = (await axios.post(url))

  return data
}

// 批量删除问卷
export async function deleteQuestionService(ids=[]) {
  const url = `/api/question/delete`
  const data = (await axios.delete(url, { data: { ids }}))

  return data
}
