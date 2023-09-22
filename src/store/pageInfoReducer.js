import { createSlice } from "@reduxjs/toolkit";

const INIT_VALUE = {
  title: "",
  desc: "",
  js: "", //js代码
  css: "", //css代码
};

const pageInfoReducer = createSlice({
  name: "pageInfo",
  initialState: INIT_VALUE,
  reducers: {
    resetPageInfo(state, action) {
      return action.payload;
    },
    changePageTitle(state, action) {
      state.title = action.payload;
    },
  },
});

export const { resetPageInfo, changePageTitle } = pageInfoReducer.actions;

export default pageInfoReducer.reducer;
