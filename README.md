# 项目架构
## 布局文件夹——layouts
### MainLayout
* 总体页面布局
  * 头部导航栏
  * 中部内容
  * 底部导航栏

### Question
* 中部内容布局
  * 左侧菜单栏
  * 右侧对应列表页

## 页面文件夹——pages
* 首页：Home
* 登录页：Login
* 注册页：Register

* 问卷管理：manage
  * 我的问卷: /manage/list
  * 星标问卷: /manage/star
  * 回收站: /manage/trash
* 问卷详情: question
  * 编辑问卷: /question/edit
  * 问卷统计: /question/stat

* 404页面：NotFound

## 路由文件夹——router





## ui库 - antd-react

## '@reduxjs/toolkit'
* 内置immer功能，因此可以直接改state（否则要遵循不可变数据）

## 编辑问卷
* 编辑问卷: /question/edit
* 页面结构分为上下结构：header + main
* main结构包含 左侧面板 + 中间画布 + 右侧组件信息

* 左侧面板（tabs）： 组件库 + 图层
* 组件库：
  1. 点击组件，添加组件到中间画布中
  2. 需要为每一个组件定义一个属性表单，属性会同步显示到右侧的组件信息中
  3.


* 右侧组件信息
  1. 同步显示中间画布选中的组件信息（根据selectedId显示）
  2. 在右侧的这个面板中修改组件信息，也会同步到中间画布中去（）
