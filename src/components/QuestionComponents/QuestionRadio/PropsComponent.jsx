import React, { useEffect } from "react";
import { Form, Input, Checkbox, Select, Space, Button } from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { nanoid } from "@reduxjs/toolkit";

export const INIT_VALUE = {
  title: "单选标题",
  isVertical: false,
  options: [
    // 单选框选项
    { value: "item1", text: "选项1" },
    { value: "item2", text: "选项2" },
    { value: "item3", text: "选项3" },
  ],
  value: "", //单选框默认初始选项
};

const PropsComponent = (props) => {
  const {
    title,
    isVertical = false,
    options = [],
    value,
    onChange,
    disabled,
  } = { ...INIT_VALUE, ...props };

  const [form] = Form.useForm();

  // 监听组件的切换 当组件切换的时候，右侧组件的属性也跟着更新
  useEffect(() => {
    form.setFieldsValue({
      title,
      isVertical,
      options,
      value,
    });
  }, [title, isVertical, options, value, form]);

  // 监听属性变化，同步到画布
  function handleValueChange() {
    if (onChange == null) return;

    const newValues = form.getFieldsValue();

    // 过滤掉 text 为undefined 选项
    if (newValues.options) {
      newValues.options.filter((opt) => !(opt.text == null));
    }

    const { options = [] } = newValues;
    options.forEach((opt) => {
      if (opt.value === "") {
        opt.value = nanoid(5);
      } else {
        return;
      }
    });
    // console.log("newValues", newValues);
    if (onChange) {
      onChange(newValues);
    }
  }

  return (
    <Form
      form={form}
      layout="vertical"
      initialValues={{ title, isVertical, options, value }}
      onValuesChange={handleValueChange}
      disabled={disabled}
    >
      <Form.Item
        label="标题内容"
        name="title"
        rules={[{ required: true, message: "请输入标题内容" }]}
      >
        <Input></Input>
      </Form.Item>

      <Form.Item label="选项">
        <Form.List name="options">
          {(fields, { add, remove }) => (
            <>
              {/* fields 就是 name 对应的属性， 在这里也即是options */}
              {/* 循环遍历渲染 */}
              {fields.map((field, index) => {
                return (
                  <Space key={field.key} align="baseline">
                    {/* 选项本身 */}
                    {/* name={[field.name, "text"]} 的意思是找到field.name 这一项的里面的text，以这个text为这个选项的名字 */}
                    <Form.Item
                      name={[field.name, "text"]}
                      rules={[
                        { required: true, message: "请输入选项内容..." },
                        {
                          validator: (_, text) => {
                            const { options = [] } = form.getFieldsValue();
                            // num 用于记录选项本身text的出现次数，理论上不重复的话，num只能===1
                            let num = 0;
                            options.forEach((opt) => {
                              if (opt.text === text) num++;
                            });
                            // text不重复,即选项不重复，情况正常
                            if (num === 1) return Promise.resolve();
                            return Promise.reject(new Error("选项重复"));
                          },
                        },
                      ]}
                    >
                      <Input placeholder="请输入选项内容" />
                    </Form.Item>
                    {/* 每个选项的删除按钮 */}
                    <Form.Item>
                      {index > 1 && (
                        <MinusCircleOutlined
                          onClick={() => remove(field.name)}
                        ></MinusCircleOutlined>
                      )}
                    </Form.Item>
                  </Space>
                );
              })}
              {/* 添加按钮，add每一项需要传入每个选项的初始默认值，对应options中的属性 */}
              <Form.Item>
                <Button
                  block
                  onClick={() => add({ text: "", value: "" })}
                  icon={<PlusOutlined></PlusOutlined>}
                >
                  添加选项
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>
      </Form.Item>
      <Form.Item name="value" label="默认选中">
        <Select
          value={value}
          options={options.map(({ text, value }) => ({
            value,
            label: text || "",
          }))}
        ></Select>
      </Form.Item>
      <Form.Item name="isVertical" valuePropName="checked">
        <Checkbox>竖向排列</Checkbox>
      </Form.Item>
    </Form>
  );
};

export default PropsComponent;
