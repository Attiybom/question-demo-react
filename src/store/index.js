import { configureStore } from '@reduxjs/toolkit'
import userReducer from './user'
import componentsReducer from './componentsReducer'
import pageInfoReducer from "./pageInfoReducer";

export default configureStore({
  reducer: {
    //  这里的key 要和 name对应上
    user: userReducer,
    components: componentsReducer, //存储画布组件列表
    pageInfo: pageInfoReducer, // 页面设置所需要的页面信息

    //存储画布右侧编辑好的问卷列表
  },
});
