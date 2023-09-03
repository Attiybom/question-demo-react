import { Outlet } from "react-router-dom";

export default function QuestionLayout() {
  return (
    <>
      <div>QuestionLayout</div>
      <div>
        <Outlet></Outlet>
      </div>
    </>
  );
}
