import { createBrowserRouter } from "react-router-dom";

// 布局
import MainLayout from "../layouts/MainLayout";
import ManageLayout from "../layouts/ManageLayout";
import QuestionLayout from "../layouts/QuestionLayout";

// 主要页面
import Home from "../pages/Home";
import Login from "../pages/Login";
import NotFound from "../pages/NotFound";
import Register from "../pages/Register";

import List from "../pages/manage/List";
import Star from "../pages/manage/Star";
import Trash from "../pages/manage/Trash";

import Edit from "../pages/question/edit/index";
import Stat from "../pages/question/stat/index";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "login",
        element: <Login></Login>,
      },
      {
        path: "register",
        element: <Register></Register>,
      },
      {
        path: "manage",
        element: <ManageLayout></ManageLayout>,
        children: [
          {
            path: "list",
            element: <List></List>,
          },
          {
            path: "star",
            element: <Star></Star>,
          },
          {
            path: "trash",
            element: <Trash></Trash>,
          },
        ],
      },

      {
        path: "*",
        element: <NotFound></NotFound>,
      },
    ],
  },
  {
    path: "question",
    element: <QuestionLayout></QuestionLayout>,
    children: [
      {
        path: "edit/:id",
        element: <Edit></Edit>,
      },
      {
        path: "stat/:id",
        element: <Stat></Stat>,
      },
    ],
  },
]);

export default router;


export const HOME_PATHNAME = '/'
export const LOGIN_PATHNAME = '/login'
export const REGISTER_PATHNAME = '/register'
export const MANAGE_INDEX_PATHNAME = '/manage/list'

export function isLoginOrRegister(pathname) {

  if ([LOGIN_PATHNAME, REGISTER_PATHNAME].includes(pathname)) return true

  return false

}

export function isNoNeedUserInfo(pathname) {
  if ([HOME_PATHNAME, LOGIN_PATHNAME, REGISTER_PATHNAME].includes(pathname)) return true
  return false
}
