import useLoadQuestionData from "../../../hooks/useLoadQuestionData";

export default function Index() {
  const { loading } = useLoadQuestionData();

  return (
    <div>
      <div>stat-index</div>
      <div>{loading ? <p>loading....</p> : <p>stat</p>}</div>
    </div>
  );
}
