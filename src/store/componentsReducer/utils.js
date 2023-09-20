

/**
 * @description 获取下一个id
 * @param fe_id 当前id
 * @param componentList 完整的组件列表（包含被隐藏的组件）
 * @param visibleComponentList 可视组件列表
 */
export function getNextSelectedId(selectId, componentList) {
  // 因为要隐藏掉的组件的属性没必要显示在属性面板上
  const visibleComponentList = componentList.filter(c => !c.isHidden)
  const index = visibleComponentList.findIndex(c => c.fe_id === selectId)
  // 未找到
  if (index < 0)  return ''


  let newSelectedID = ''
  const length = visibleComponentList.length
  if (length <= 1) {
    // 说明当前组件长度就一个，删完后就没有任何组件了，因此下一个被选中的id就是空
    return newSelectedID
  } else {
    // 组件长度至少为两个
    if (index + 1 === length) {
      // 即要删除的就是最后一个，因此下一个选中的id就是组件列表的第一个
      newSelectedID = visibleComponentList[index - 1].fe_id
    } else {
      // 即删除的不是最后一个，则下一个被选中的id就是下一个
      newSelectedID = visibleComponentList[index + 1].fe_id
    }
  }


  return newSelectedID
}


/**
 * @description 添加 or 粘贴组件
 *
 */

export function addAndPasteComponent(selectedId, componentList, newComponent) {

  const targetIndex = componentList.findIndex(
    (c) => c.fe_id === selectedId
  );

  if (targetIndex < 0) {
    // 未选中任何组件，即默认第一个组件，这种情况，新添加的组件直接插到最后
    componentList.push(newComponent);
  } else {
    // 已有选中的组件，插到这个组件的下面
    componentList.splice(targetIndex + 1, 0, newComponent);
  }

  selectedId = newComponent.fe_id;
}
