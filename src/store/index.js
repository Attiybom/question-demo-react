import { configureStore } from '@reduxjs/toolkit'
import userReducer from './user'
import componentsReducer from './componentsReducer'

export default configureStore({
  reducer: {
    user: userReducer,
    components: componentsReducer    //存储画布组件列表


    //存储画布右侧编辑好的问卷列表
  }
})
