import { useSearchParams } from "react-router-dom";
import { useRequest } from 'ahooks'
import { getQuestionListService } from "../services/question";
import { LIST_SEARCH_PAPAM_KEY, LIST_PAGE_PAPAM_KEY, LIST_PAGE_SIZE_PAPAM_KEY, LIST_PAGE_SIZE } from '../constant/index'

function useLoadQuestionListData(option = {}) {
  const { isStar = false, isDeleted = false } = option
  const [searchParams] = useSearchParams()

  const { data, loading, error, refresh} = useRequest(async () => {
    const keyword = searchParams.get(LIST_SEARCH_PAPAM_KEY) || ''

    const page = parseInt(searchParams.get(LIST_PAGE_PAPAM_KEY) || '') || 1
    const pageSize = parseInt(searchParams.get(LIST_PAGE_SIZE_PAPAM_KEY) || '') || LIST_PAGE_SIZE

    const data = getQuestionListService({ keyword, isStar, isDeleted, page, pageSize })
    return data
  }, {
    refreshDeps: [searchParams]//刷新的依赖项
  })

  return {
    data,
    loading,
    error,
    refresh
  }
}


export default useLoadQuestionListData
