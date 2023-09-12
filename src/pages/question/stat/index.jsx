import useLoadQuestionData from "../../../hooks/useLoadQuestionData";

export default function Index() {
  const { loading, data } = useLoadQuestionData();

  return (
    <div>
      <div>stat-index</div>
      <div>{loading ? <p>loading....</p> : <p>{JSON.stringify(data)}</p>}</div>
    </div>
  );
}
