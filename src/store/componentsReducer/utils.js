

/**
 * @param fe_id 当前id
 * @param componentList 组件列表
 * @returns
 */



export function getNextSelectedId(selectId, componentList) {

  const index = componentList.findIndex(c => c.fe_id === selectId)
  // 未找到
  if (index < 0)  return ''


  let newSelectedID = ''
  const length = componentList.length
  if (length <= 1) {
    // 说明当前组件长度就一个，删完后就没有任何组件了，因此下一个被选中的id就是空
    return newSelectedID
  } else {
    // 组件长度至少为两个
    if (index + 1 === length) {
      // 即要删除的就是最后一个，因此下一个选中的id就是组件列表的第一个
      newSelectedID = componentList[index - 1].fe_id
    } else {
      // 即删除的不是最后一个，则下一个被选中的id就是下一个
      newSelectedID = componentList[index + 1].fe_id
    }
  }


  return newSelectedID
}
