import { Outlet } from "react-router-dom";
import useLoadUserData from "../hooks/useLoadUserData";
import useNavPage from "../hooks/useNavPage";
import { Spin } from "antd";

export default function QuestionLayout() {
  const waitingUserData = useLoadUserData();

  useNavPage(waitingUserData);

  return (
    <div style={{ height: "100vh" }}>
      {waitingUserData ? (
        <div style={{ textAlign: "center", marginTop: "60px" }}>
          <Spin></Spin>
        </div>
      ) : (
        <Outlet></Outlet>
      )}
    </div>
  );
}
