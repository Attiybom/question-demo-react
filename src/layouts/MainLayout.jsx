import { Outlet } from "react-router-dom";
import { Layout, Space } from "antd";
import styles from "./MainLayout.module.scss";
import Logo from "../components/Logo";
import UserInfo from "../components/UserInfo";

const { Header, Footer, Content } = Layout;

export default function MainLayout() {
  return (
    <Layout>
      <Header className={styles.header}>
        <div className={styles.left}>
          <Logo></Logo>
        </div>
        <div className={styles.right}>
          <UserInfo />
        </div>
      </Header>

      <Layout className={styles.main}>
        <Content>
          <Outlet></Outlet>
        </Content>
      </Layout>

      <Footer className={styles.footer}>Genshin Start! 2020 - 2023</Footer>
    </Layout>
  );
}
