import { useEffect, useState } from 'react'
import useGetUserInfo from './useGetUserInfo'
import { useRequest } from 'ahooks'
import { getUserInfoService } from '../services/user'
import { useDispatch } from 'react-redux'
import { loginAction } from '../store/user'
import { useLocation } from 'react-router-dom'

export default function useLoadUserData() {
  const [waitingUserData, setWaitingUserData] = useState(true)

  const pathname = useLocation()

  const dispatch = useDispatch()
  const { run } = useRequest(async () => getUserInfoService(), {
    manual: true,
    onSuccess(res) {
      const { username, nickname } = res

      dispatch(loginAction({username, nickname}))
    },
    onFinally() {
      setWaitingUserData(false)
    }
  })

  // 判断是否已经获取用户信息 - 从store里面拿数据
  const { username } = useGetUserInfo() || {}
  useEffect(() => {
    if (username) {
      setWaitingUserData(false)
      return
    } else {
      run() // 如果没有用户信息则执行
    }
  }, [username, pathname, run])


  return waitingUserData
}
