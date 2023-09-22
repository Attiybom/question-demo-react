import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { getQuestionService } from "../services/question";
import { useRequest } from "ahooks";
import { useDispatch } from "react-redux";
import { resetComponents } from "@/store/componentsReducer";
import { resetPageInfo } from "@/store/pageInfoReducer";

export default function useLoadQuestionData() {
  // 从路由中获取id
  const { id = {} } = useParams();

  const dispatch = useDispatch();

  // ajax请求，获取问卷组件数据
  const { loading, data, error, run } = useRequest(
    async (id) => {
      if (!id) throw new Error("没有问卷 id");
      const data = await getQuestionService(id);
      return data;
    },
    {
      manual: true,
    }
  );

  // 判断id变化，执行ajax加载问卷数据
  useEffect(() => {
    run(id);
  }, [id, run]);

  // 根据返回的数据获取
  useEffect(() => {
    if (!data) return;
    const {
      componentList = [],
      js = "",
      css = "",
      title = "",
      desc = "",
    } = data;

    let selectedId = "";
    if (componentList.length > 0) {
      selectedId = componentList[0].fe_id; // 默认选中第一个组件的id
    }

    // 把componentList存储到redux-store中
    dispatch(
      resetComponents({ componentList, selectedId, copiedComponent: null })
    );
    // 把服务端的页面信息存到redux store中
    dispatch(resetPageInfo({ desc, title, js, css }));
  }, [data, dispatch]);

  return {
    loading,
    error,
  };
}
