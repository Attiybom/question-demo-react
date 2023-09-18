import { createSlice } from '@reduxjs/toolkit'
// import {produce} from 'immer'

const INIT_STATE = {
  selectedId: '', //用于记录当前选中的组件，以便左（组件列表）中（画布）右（问卷信息）之间的信息联动
  componentList: []
}

export const componentSlice = createSlice({
  name: 'components',
  initialState: INIT_STATE,
  reducers: {
    // 重置所有组件
    resetComponents(state, action) {
      // console.log('state', state.selectedId)
      return action.payload
    },
    // 记录当前选中组件id
    changeSelectedId: (state, action) => {
      state.selectedId = action.payload
    }
  }
})


export const { resetComponents, changeSelectedId } = componentSlice.actions

export default componentSlice.reducer
