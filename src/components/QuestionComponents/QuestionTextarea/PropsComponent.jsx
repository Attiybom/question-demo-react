import React, { useEffect } from "react";
import { Form, Input } from "antd";

const { TextArea } = Input;

const PropsComponent = (props) => {
  // 输入框有标题属性和默认文字属性
  const {
    title = "多行输入标题",
    placeholder = "请输入...",
    onChange,
    disabled,
  } = props;

  const [form] = Form.useForm();

  // 监听组件的切换 当组件切换的时候，右侧组件的属性也跟着更新
  useEffect(() => {
    form.setFieldsValue({
      title,
      placeholder,
    });
  }, [title, placeholder, form]);

  function handlePropsChange() {
    if (onChange) {
      onChange(form.getFieldsValue());
    }
  }

  return (
    <Form
      form={form}
      layout="vertical"
      initialValues={{ title, placeholder }}
      onValuesChange={handlePropsChange}
      disabled={disabled}
    >
      <Form.Item
        label="标题"
        name="title"
        rules={[{ required: true, message: "请输入标题" }]}
      >
        <Input></Input>
      </Form.Item>
      <Form.Item label="placeholder" name="placeholder">
        <TextArea></TextArea>
      </Form.Item>
    </Form>
  );
};

export default PropsComponent;
