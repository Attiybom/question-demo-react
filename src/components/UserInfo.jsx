import { Link } from "react-router-dom";

export default function UserInfo() {
  return (
    <>
      {/* 当用户未登录时候显示 */}
      <Link to="/login">登录</Link>
    </>
  );
}
