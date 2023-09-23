import { useSelector } from "react-redux";



// 从store中获取组件列表
export default function useGetComponentsInfo() {
  // 由于使用了redux-undo，因此需要额外获取present
  const components = useSelector((state) => state.components.present);

  const { componentList = [], selectedId, copiedComponent = null } = components;

  const selectedComponent = componentList.find((c) => c.fe_id === selectedId);

  return {
    componentList,
    selectedId,
    selectedComponent,
    copiedComponent,
  };
}
