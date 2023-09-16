import { createSlice } from '@reduxjs/toolkit'

const INIT_STATE = {
  username: '',
  nickname: ''
}

export const userSlice = createSlice({
  name: 'user',
  initialState: INIT_STATE,
  reducers: {
    loginAction(state, action) {
      return action.payload // 设置username + nickname到store中
    },
    layoutAction(state, action) {
      return INIT_STATE
    }
  }
})


export const { loginAction, layoutAction }  = userSlice.actions

export default userSlice.reducer
