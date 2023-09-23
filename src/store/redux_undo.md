使用第三方库redux-undo

1. 引用
import undoable, { excludeAction, StateWithHistory } from "redux-undo";


2. 包裹 + 配置
使用undoable将所需要的store包裹起来，并传入配置项
    components: undoable(componentsReducer, {//存储画布组件列表 (有undo)
      limit: 20, //限制保留undo20步
      filter: excludeAction([
        "components/resetComponents", // 表明这些函数不需要undo功能
        "components/changeSelectedId",
      ]),
    }),

3. 获取数据
在获取store数据的时候需要加上.present
const components = useSelector(state => state.components.present)

4. 点击撤销or重做
引用
import { ActionCreators } from 'redux-undo'
  // 撤销/
  function undo() {
    dispatch(ActionCreators.undo());
  }

  // 重做
  function redo() {
    dispatch(ActionCreators.redo());
  }
