import { Space, Typography, message } from "antd";
import styles from "./Login.module.scss";
import { UserAddOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useRequest } from "ahooks";
import { loginService } from "../services/user";
// import { useDispatch } from "react-redux";
// import { loginAction } from "../store/user";

export default function Login() {
  const { Title } = Typography;

  // const dispatch = useDispatch();

  const nav = useNavigate();

  const USERNAME_KEY = "username";
  const PASSWORD_KEY = "password";

  function rememberInfo(username, password) {
    localStorage.setItem(USERNAME_KEY, username);
    localStorage.setItem(PASSWORD_KEY, password);
  }

  function deleteInfoFromStorage() {
    localStorage.removeItem(USERNAME_KEY);
    localStorage.removeItem(PASSWORD_KEY);
  }

  function getInfoFromStorage() {
    return {
      username: localStorage.getItem(USERNAME_KEY),
      password: localStorage.getItem(PASSWORD_KEY),
    };
  }

  const [form] = Form.useForm();

  // 设置默认信息
  useEffect(() => {
    const { username, password } = getInfoFromStorage();
    form.setFieldsValue({ username, password });
  }, [form]);

  // 登录逻辑
  const { run: handleLogin } = useRequest(
    async (values) => {
      const data = loginService(values);
      return data;
    },
    {
      manual: true,
      debounceWait: 500,
      onSuccess(res) {
        // console.info("login-res", res);
        message.success("登录成功！");
        // dispatch(loginAction())
        nav("/manage/list");
      },
    }
  );

  // 提交
  const onFinish = (values) => {
    // console.log("Success:", values);
    const { username, password, remember } = values || {};
    handleLogin({
      username,
      password,
    });

    if (remember) {
      rememberInfo(username, password);
    } else {
      deleteInfoFromStorage();
    }
  };

  return (
    <div className={styles.container}>
      <div>
        <Space>
          <Title level={2}>
            <UserAddOutlined />
          </Title>
          <Title level={2}>用户登录</Title>
        </Space>
      </div>

      <div>
        <Form
          labelCol={{ span: 8 }}
          wrapperCol={{
            span: 16,
          }}
          onFinish={onFinish}
          initialValues={{ remember: true }}
          form={form}
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

          <Form.Item
            name="remember"
            valuePropName="checked"
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Checkbox>记住账号密码</Checkbox>
          </Form.Item>

          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Space>
              <Button type="primary" htmlType="submit">
                登录
              </Button>
              <Link to="/register">用户注册</Link>
            </Space>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}
