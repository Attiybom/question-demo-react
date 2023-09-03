import { useParams } from "react-router-dom";

export default function Index() {
  const { id = "" } = useParams();

  return (
    <div>
      <div>edit</div>
      <div>路由id: {id}</div>
    </div>
  );
}
