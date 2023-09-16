import { useSelector } from 'react-redux'

// 从store里面拿用户数据
export default function useGetUserInfo() {
  const { username, nickname } = useSelector(state => state.user)
  return { username, nickname}
}
