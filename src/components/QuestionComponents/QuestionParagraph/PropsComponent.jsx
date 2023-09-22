import React, { useEffect } from "react";
import { Form, Input, Checkbox } from "antd";

const { TextArea } = Input;

const PropsComponent = (props) => {
  const { text = "一行段落", isCenter = false, onChange, disabled } = props;

  const [form] = Form.useForm();

  // 监听组件的切换 当组件切换的时候，右侧组件的属性也跟着更新
  useEffect(() => {
    form.setFieldsValue({
      text,
      isCenter,
    });
  }, [text, isCenter, form]);

  // 监听属性变化，同步到画布
  function handleValueChange() {
    if (onChange) {
      onChange(form.getFieldsValue());
    }
  }

  return (
    <Form
      form={form}
      layout="vertical"
      initialValues={{ text, isCenter }}
      onValuesChange={handleValueChange}
      disabled={disabled}
    >
      <Form.Item
        label="段落内容"
        name="text"
        rules={[{ required: true, message: "请输入段落内容" }]}
      >
        <TextArea></TextArea>
      </Form.Item>
      <Form.Item name="isCenter" valuePropName="checked">
        <Checkbox>居中显示</Checkbox>
      </Form.Item>
    </Form>
  );
};

export default PropsComponent;
