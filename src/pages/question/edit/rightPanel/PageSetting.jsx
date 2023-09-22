import React, { useEffect } from "react";
import useGetPageInfo from "@/hooks/useGetPageInfo";
import { Form, Input } from "antd";
import { useDispatch } from "react-redux";
import { resetPageInfo } from "@/store/pageInfoReducer";

const { TextArea } = Input;

const PageSetting = () => {
  const dispatch = useDispatch();
  const pageInfo = useGetPageInfo();

  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue(pageInfo);
  }, [pageInfo, form]);

  function handleValuesChange() {
    // console.log("new-values", form.getFieldsValue());
    dispatch(resetPageInfo(form.getFieldsValue()));
  }

  return (
    <Form
      form={form}
      layout="vertical"
      onValuesChange={handleValuesChange}
      initialValues={pageInfo}
    >
      <Form.Item
        label="问卷信息"
        name="title"
        rules={[
          {
            message: "请输入问卷信息",
            required: true,
          },
        ]}
      >
        <Input placeholder="请输入问卷信息"></Input>
      </Form.Item>
      <Form.Item label="问卷描述" name="desc">
        <TextArea placeholder="请输入问卷描述"></TextArea>
      </Form.Item>
      <Form.Item label="样式代码" name="css">
        <TextArea placeholder="请输入css 样式代码"></TextArea>
      </Form.Item>
      <Form.Item label="脚本代码" name="js">
        <TextArea placeholder="请输入js 脚本代码"></TextArea>
      </Form.Item>
    </Form>
  );
};

export default PageSetting;
