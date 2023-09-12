import { useSearchParams } from "react-router-dom";
import { useRequest } from 'ahooks'
import { getQuestionListService } from "../services/question";
import { LIST_SEARCH_PAPAM_KEY } from '../constant/index'

function useLoadQuestionListData(option = {}) {
  const { isStar = false, isDeleted = false } = option
  const [searchParams] = useSearchParams()

  const { data, loading, error} = useRequest(async () => {
    const keyword = searchParams.get(LIST_SEARCH_PAPAM_KEY) || ''
    const data = getQuestionListService({ keyword, isStar, isDeleted })
    return data
  }, {
    refreshDeps: [searchParams]//刷新的依赖项
  })

  return {
    data,
    loading,
    error
  }
}


export default useLoadQuestionListData
