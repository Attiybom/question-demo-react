import { useNavigate } from "react-router-dom";
import { Button } from "antd";

export default function Login() {
  const nav = useNavigate();

  return (
    <div>
      <div>login</div>
      <Button type="primary" onClick={() => nav(-1)}>
        返回
      </Button>
    </div>
  );
}
