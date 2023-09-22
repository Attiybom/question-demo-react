import React, { useEffect } from "react";
import { Form, Input } from "antd";

const { TextArea } = Input;

const PropsComponent = (props) => {
  // 输入框有标题属性和默认文字属性
  const { title = "问卷标题", desc = "问卷描述", onChange, disabled } = props;

  const [form] = Form.useForm();

  // 监听组件的切换 当组件切换的时候，右侧组件的属性也跟着更新
  useEffect(() => {
    form.setFieldsValue({
      title,
      desc,
    });
  }, [title, desc, form]);

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
      initialValues={{ title, desc }}
      onValuesChange={handleValueChange}
      disabled={disabled}
    >
      <Form.Item
        label="标题内容"
        name="title"
        rules={[{ required: true, message: "请输入问卷标题" }]}
      >
        <Input></Input>
      </Form.Item>
      <Form.Item
        label="段落内容"
        name="desc"
        rules={[{ required: true, message: "请输入问卷段落" }]}
      >
        <TextArea></TextArea>
      </Form.Item>
    </Form>
  );
};

export default PropsComponent;
