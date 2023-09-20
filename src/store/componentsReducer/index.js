import { createSlice } from "@reduxjs/toolkit";
// import {produce} from 'immer'
import { getNextSelectedId } from "./utils";

const INIT_STATE = {
  selectedId: "", //用于记录当前选中的组件，以便左（组件列表）中（画布）右（问卷信息）之间的信息联动
  componentList: [],
};

export const componentSlice = createSlice({
  name: "components",
  initialState: INIT_STATE,
  reducers: {
    // 重置所有组件
    resetComponents(state, action) {
      // console.log('state', state.selectedId)
      return action.payload;
    },
    // 记录当前选中组件id
    changeSelectedId: (state, action) => {
      state.selectedId = action.payload;
    },
    // 添加组件
    addComponent(state, action) {
      const newComponent = action.payload;

      const { selectedId, componentList } = state;

      const targetIndex = componentList.findIndex(
        (c) => c.fe_id === selectedId
      );

      if (targetIndex < 0) {
        // 未选中任何组件，即默认第一个组件，这种情况，新添加的组件直接插到最后
        state.componentList.push(newComponent);
      } else {
        // 已有选中的组件，插到这个组件的下面
        state.componentList.splice(targetIndex + 1, 0, newComponent);
      }

      state.selectedId = newComponent.fe_id;
    },
    // 修改组件属性
    changeComponentProps(state, action) {
      const { fe_id, newProps } = action.payload;
      // 找到当前选中组件
      const targetComponent = state.componentList.find(
        (c) => c.fe_id === fe_id
      );
      if (targetComponent) {
        targetComponent.props = {
          ...targetComponent.props,
          ...newProps,
        };
      }
    },
    // 删除选中的组件
    removeComponent(state) {
      const { selectedId, componentList } = state;

      const targetComponentIndex = componentList.findIndex(
        (c) => c.fe_id === selectedId
      );
      // 删除后自动选中下一个组件，因此需要重新计算selectedId
      const newSelectedID = getNextSelectedId(selectedId, componentList);
      state.selectedId = newSelectedID;

      if (targetComponentIndex > -1) {
        state.componentList.splice(targetComponentIndex, 1);
      }
    },
    // 隐藏/显示组件
    changeComponentHidden(state, action) {
      const { componentList } = state;

      const { fe_id, isHidden } = action.payload;

      // 重新计算selectId，因为如果只是控制隐藏，右侧的属性面板依然指向被隐藏的那个组件
      let newSelectedID = "";

      if (isHidden) {
        // 隐藏
        newSelectedID = getNextSelectedId(fe_id, componentList);
      } else {
        // 显示
        newSelectedID = fe_id;
      }

      state.selectedId = newSelectedID;

      // 隐藏组件
      const targetComponent = componentList.find((c) => c.fe_id === fe_id);
      if (targetComponent) {
        targetComponent.isHidden = isHidden;
      }
    },

    // 锁定/解锁组件
    toggleComponentLock(state, action) {
      const { fe_id } = action.payload;

      const targetComponent = state.componentList.find(
        (c) => c.fe_id === fe_id
      );
      if (targetComponent) {
        targetComponent.isLocked = !targetComponent.isLocked;
      }
    },
  },
});

export const {
  resetComponents,
  changeSelectedId,
  addComponent,
  changeComponentProps,
  removeComponent,
  changeComponentHidden,
  toggleComponentLock,
} = componentSlice.actions;

export default componentSlice.reducer;
