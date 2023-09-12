import axios from "axios";
import { message } from 'antd'

const instance = axios.create({
  timeout: 10* 1000 //最多10秒响应
})


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
