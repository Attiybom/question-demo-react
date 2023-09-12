import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getQuestionService } from "../../../services/question";

export default function Index() {
  const { id = "" } = useParams();

  const [loading, setLoading] = useState(true);
  const [questionData, setQuestionData] = useState({});

  // useEffect 无法直接执行async
  useEffect(() => {
    async function fn() {
      const data = await getQuestionService(id);
      // console.info("getQuestion", data);
      setQuestionData(data);
      setLoading(false);
    }
    fn();
  }, []);

  return (
    <div>
      <div>edit page</div>
      {loading ? <p>loading...</p> : <p>{JSON.stringify(questionData)}</p>}
    </div>
  );
}
