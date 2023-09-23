import { configureStore } from '@reduxjs/toolkit'
import userReducer from './user'
import componentsReducer from './componentsReducer'
import pageInfoReducer from "./pageInfoReducer";
import undoable, { excludeAction } from "redux-undo";

export default configureStore({
  reducer: {
    //  这里的key 要和 name对应上
    user: userReducer,
    // components: componentsReducer, //存储画布组件列表 (没有undo)
    components: undoable(componentsReducer, {
      //存储画布组件列表 (有undo)
      limit: 20, //限制保留undo20步
      filter: excludeAction([
        "components/resetComponents", // 表明这些函数不需要undo功能
        "components/changeSelectedId",
      ]),
    }),
    pageInfo: pageInfoReducer, // 页面设置所需要的页面信息

    //存储画布右侧编辑好的问卷列表
  },
});
