import axios from "./ajax";

// 获取单个用户信息
export async function getUserInfoService() {
  const url = `/api/user/info`
  const data = (await axios.get(url))

  return data
}
// 注册
export async function registerService(option) {
  const url = `/api/user/register`


  const body = {
    username: option.username,
    password: option.password,
    nickname: option.nickname || option.username ,
  }

  const data = (await axios.post(url, body))

  return data
}
// 登录
export async function loginService(option) {
  const url = `/api/user/login`

  const body = {
    username: option.username,
    password: option.password,
    token: option.token
  }
  const data = (await axios.post(url, body))

  return data
}
