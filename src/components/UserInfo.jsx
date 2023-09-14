import { Link, useNavigate } from "react-router-dom";
import { getUserInfoService } from "../services/user";
import { UserOutlined } from "@ant-design/icons";
import { Button, message } from "antd";
import { useRequest } from "ahooks";
import { removeUserToken } from "../utils/user-token";
import { useState } from "react";

export default function UserInfo() {
  const nav = useNavigate();

  // const [userName, setUserName] = useState("");
  // const [nickName, setNickName] = useState("");

  // 退出逻辑
  const clickLayout = () => {
    message.success("退出成功");
    removeUserToken(); //移除token
    nav("/login");
    // setUserName("");
    // setNickName("");
  };

  // 获取用户信息
  const { data } = useRequest(getUserInfoService);
  const { username, nickname } = data || {};
  // setUserName(username);
  // setNickName(nickname);

  // 有用户信息的情况
  const UserInfo = (
    <>
      <span style={{ color: "#fff" }}>
        <UserOutlined />
        {nickname}
      </span>

      <Button type="link" onClick={clickLayout}>
        退出
      </Button>
    </>
  );

  // 无用户信息的情况
  const Login = (
    <>
      <Link to="/login">登录</Link>
    </>
  );

  return <>{username ? UserInfo : Login}</>;
  // return <>{beforeLogin}</>;
}
