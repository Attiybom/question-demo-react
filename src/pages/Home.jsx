import { useNavigate } from "react-router-dom";
import { Typography, Button } from "antd";
import styles from "./Home.module.scss";

const { Title, Paragraph } = Typography;

export default function Home() {
  const nav = useNavigate();

  const clickLogin = () => {
    nav("login");
  };

  // useEffect(() => {
  //   fetch("/api/question/100").then((res) => {
  //     // console.info("fetch_res", res);
  //   });
  // }, []);

  return (
    <div>
      <div className={styles.container}>
        <Title>问卷调查 | 在线投票</Title>
        <Paragraph>已累计创建问卷100份，发布问卷90份，收到答卷980份</Paragraph>
        <div>
          <Button size="large" type="primary" onClick={clickLogin}>
            开始使用
          </Button>
        </div>
      </div>
      {/*
      <button onClick={clickLogin}>登录</button>
      <Link to="/register">注册</Link> */}
    </div>
  );
}
