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
