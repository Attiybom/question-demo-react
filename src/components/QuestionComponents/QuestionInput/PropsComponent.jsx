import React, { useEffect } from "react";
import { Form, Input } from "antd";

const PropsComponent = (props) => {
  // 输入框有标题属性和默认文字属性
  const { title, placeholder, onChange } = props;

  const [form] = Form.useForm();

  // 监听组件的切换 当组件切换的时候，右侧组件的属性也跟着更新
  useEffect(() => {
    form.setFieldValue({
      title,
      placeholder,
    });
  }, [title, placeholder, form]);

  function handlePropsChange() {
    console.log("handlePropsChange", form.getFieldValue());
    if (onChange) {
      onChange(form.getFieldValue());
    }
  }

  return (
    <Form
      form={form}
      layout="vertical"
      initialValues={{ title, placeholder }}
      onValuesChange={handlePropsChange}
    >
      <Form.Item
        label="标题"
        name="title"
        rules={[{ required: true, message: "请输入标题" }]}
      >
        <Input></Input>
      </Form.Item>
      <Form.Item label="placeholder" name="placeholder">
        <Input></Input>
      </Form.Item>
    </Form>
  );
};

export default PropsComponent;
