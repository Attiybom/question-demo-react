import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import useGetUserInfo from './useGetUserInfo'
import { isLoginOrRegister,MANAGE_INDEX_PATHNAME, isNoNeedUserInfo, LOGIN_PATHNAME } from '../router/index'

export default function useNavPage(waitingUserData) {
  const nav = useNavigate()
  const {pathname} = useLocation()

  const { username } = useGetUserInfo() || {}



  useEffect(() => {
    // 如果redux没有用户数据，直接返回
    if (waitingUserData) {
      console.info('waitingUserData', waitingUserData)
      return
    }
    // 如果有用户数据且当前页为登录页或注册页，直接跳转主页
    if (username) {
      if (isLoginOrRegister(pathname)) {
        console.info('isLoginOrRegister-true',username)
        nav(MANAGE_INDEX_PATHNAME)
      }
      return
    }


    if (isNoNeedUserInfo(pathname)) {
      //未登录且当前页不需要用户信息，比如home页
      console.info('isNoNeedUserInfo-true')
      return
    } else {
      //未登录且当前页需要用户信息，跳转登录页
      console.info('isNoNeedUserInfo-false')
      nav(LOGIN_PATHNAME)
    }


  },[waitingUserData,nav,username, pathname])

}
