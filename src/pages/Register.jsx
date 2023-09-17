import { Space, Typography } from "antd";
import styles from "./Register.module.scss";
import { UserAddOutlined } from "@ant-design/icons";
import { Button, Form, Input, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { useRequest } from "ahooks";
import { registerService } from "../services/user";
import { setUserToken } from "../utils/user-token";

export default function Register() {
  const { Title } = Typography;

  const nav = useNavigate();

  // 注册逻辑
  const { run: handleRegister } = useRequest(
    async (values) => {
      const data = await registerService(values);
      return data;
    },
    {
      manual: true,
      debounceWait: 500,
      onSuccess(res) {
        console.info("register-res", res);
        const { token } = res;
        setUserToken(token);
        message.success("注册成功，进入首页！");
        nav("/manage/list");
      },
    }
  );

  const onFinish = (values) => {
    // console.log("Success:", values);
    handleRegister(values);
  };
  return (
    <div className={styles.container}>
      <div>
        <Space>
          <Title level={2}>
            <UserAddOutlined />
          </Title>
          <Title level={2}>注册新用户</Title>
        </Space>
      </div>
      <div>
        <Form
          labelCol={{ span: 8 }}
          wrapperCol={{
            span: 16,
          }}
          onFinish={onFinish}
        >
          <Form.Item
            label="用户名"
            name="username"
            rules={[
              { required: true, message: "请输入用户名" },
              {
                type: "string",
                min: 5,
                max: 20,
                message: "字符长度在5-20之间",
              },
              {
                pattern: /^\w+$/,
                message: "用户名只能是字母数字下划线组合",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="密码"
            name="password"
            rules={[{ required: true, message: "请输入密码" }]}
          >
            <Input.Password />
          </Form.Item>

          {/* 重点 */}
          <Form.Item
            label="确认密码"
            name="confirm"
            dependencies={["password"]}
            rules={[
              { required: true, message: "请再次输入密码" },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  } else {
                    return Promise.reject(new Error("两次密码不一致"));
                  }
                },
              }),
            ]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item label="昵称" name="nickname">
            <Input />
          </Form.Item>

          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Space>
              <Button type="primary" htmlType="submit">
                注册
              </Button>
              <Link to="/login">账号登录</Link>
            </Space>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}
