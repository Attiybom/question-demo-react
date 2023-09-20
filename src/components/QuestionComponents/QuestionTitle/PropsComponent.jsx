import React, { useEffect } from "react";
import { Form, Input, Select, Checkbox } from "antd";

const PropsComponent = (props) => {
  // 输入框有标题属性和默认文字属性
  const { text, level, isCenter, onChange, disabled } = props;

  const [form] = Form.useForm();

  // 监听组件的切换 当组件切换的时候，右侧组件的属性也跟着更新
  useEffect(() => {
    form.setFieldsValue({
      text,
      level,
      isCenter,
    });
  }, [text, level, isCenter, form]);

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
      initialValues={{ text, level, isCenter }}
      onValuesChange={handleValueChange}
      disabled={disabled}
    >
      <Form.Item
        label="标题内容"
        name="text"
        rules={[{ required: true, message: "请输入标题内容" }]}
      >
        <Input></Input>
      </Form.Item>
      <Form.Item label="层级" name="level">
        <Select
          options={[
            {
              value: 1,
              text: 1,
            },
            {
              value: 2,
              text: 2,
            },
            {
              value: 3,
              text: 3,
            },
          ]}
        ></Select>
      </Form.Item>
      <Form.Item name="isCenter" valuePropName="checked">
        <Checkbox>居中显示</Checkbox>
      </Form.Item>
    </Form>
  );
};

export default PropsComponent;
