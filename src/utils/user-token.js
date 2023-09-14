/**
 * @description 临时模拟token存储&获取
 * @author coderwhy
 */


const KEY = 'USER_TOKEN'

export function getUserToken() {
  return localStorage.getItem(KEY) || ''
}

export function setUserToken(token) {
  localStorage.setItem(KEY, token)
}

export function removeUserToken() {
  localStorage.removeItem(KEY)
}
