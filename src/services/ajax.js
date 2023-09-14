import axios from "axios";
import { message } from 'antd'
import { getUserToken } from "../utils/user-token";

const instance = axios.create({
  timeout: 10* 1000 //最多10秒响应
})


// request 每次请求都带上token
instance.interceptors.request.use((config) => {
  config.headers['Authorization'] = `Bearer ${getUserToken()}`
  return config
},
  error => Promise.reject(error)
)

// response 拦截：统一处理 error 和 msg
instance.interceptors.response.use(res => {
  const resData = (res.data || {})
  const { errno, data = {} , msg } = resData

  if (errno !== 0) {


    if (msg) {
      message.error(msg)
    }

    throw new Error(msg)
  }


  return data
})


export default instance
