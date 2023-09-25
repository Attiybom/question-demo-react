import React, { useEffect, useState } from "react";
import { Typography } from "antd";
import { useRequest } from "ahooks";
import { getComponentStatService } from "@/services/stat";
import { useParams } from "react-router-dom";
import { getComponentConfigByType } from "@/components/QuestionComponents";

const { Title } = Typography;

const StatChart = (props) => {
  const { id } = useParams();

  const { selectComponentId, selectComponentType } = props;

  const [stat, setStat] = useState([]);

  const { run } = useRequest(
    async (id, selectComponentId) =>
      await getComponentStatService(id, selectComponentId),
    {
      manual: true,
      onSuccess(res) {
        setStat(res.stat);
      },
    }
  );

  // 选中的组件发生变化，重新请求数据
  useEffect(() => {
    if (selectComponentId) run(id, selectComponentId);
  }, [run, selectComponentId, id]);

  function genStatElem() {
    if (!selectComponentId) {
      return <div>暂无数据</div>;
    }

    // 获取组件配置
    const { StatComponent } = getComponentConfigByType(selectComponentType);
    if (!StatComponent) return <div>暂无数据</div>;

    return <StatComponent stat={stat}></StatComponent>;

    // return <div>{JSON.stringify(stat)}</div>;
  }

  return (
    <div>
      <Title>图表统计</Title>
      <div>{genStatElem()}</div>
    </div>
  );
};

export default StatChart;
