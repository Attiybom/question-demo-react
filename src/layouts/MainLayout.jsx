import { Outlet } from "react-router-dom";
import { Layout, Spin } from "antd";
import styles from "./MainLayout.module.scss";
import Logo from "../components/Logo";
import UserInfo from "../components/UserInfo";
import useLoadUserData from "../hooks/useLoadUserData";
import useNavPage from "../hooks/useNavPage";
// import { isLoginOrRegister } from "../router";
// import useGetUserInfo from "../hooks/useGetUserInfo";

const { Header, Footer, Content } = Layout;

export default function MainLayout() {
  const waitingUserData = useLoadUserData();

  useNavPage(waitingUserData);

  // const pathname = useLocation();
  // const { username } = useGetUserInfo();
  // const nav = useNavigate();
  // if (isLoginOrRegister(pathname) && username) {
  //   nav("/manage/list");
  // }

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
          {waitingUserData ? (
            <div style={{ textAlign: "center", marginTop: `120px` }}>
              <Spin></Spin>
            </div>
          ) : (
            <Outlet></Outlet>
          )}
        </Content>
      </Layout>

      <Footer className={styles.footer}>Genshin Start! 2020 - 2023</Footer>
    </Layout>
  );
}
