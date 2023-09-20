import React from "react";
import useGetComponentsInfo from "@/hooks/useGetComponentsInfo";
import { getComponentConfigByType } from "@/components/QuestionComponents";
import { useDispatch } from "react-redux";
import { changeComponentProps } from "@/store/componentsReducer";

function NoProp() {
  return <div style={{ textAlign: "center" }}>暂未选中组件</div>;
}

const ComponentPropTab = () => {
  const dispatch = useDispatch();
  // 从store中获取当前选中的组件类型信息(实际上这里是服务端的数据，因此得在前端找对应的属性)
  const { selectedComponent } = useGetComponentsInfo();
  // 未选中
  if (selectedComponent == null) return <NoProp></NoProp>;
  // 选中的组件类型
  const { type, props } = selectedComponent;
  // 同组件类型获取到对于的组件配置
  const componentConfig = getComponentConfigByType(type);
  if (componentConfig == null) return <NoProp></NoProp>;
  // 从组件配置中获取到对应的属性面板
  const { PropsComponent } = componentConfig;

  // 组件属性变化
  function handlePropChange(newProps) {
    if (selectedComponent == null) return;
    console.log("handlePropChange", newProps);
    const { fe_id } = selectedComponent;
    dispatch(changeComponentProps({ fe_id, newProps }));
  }

  return (
    <PropsComponent {...props} onChange={handlePropChange}></PropsComponent>
  );
};

export default ComponentPropTab;
