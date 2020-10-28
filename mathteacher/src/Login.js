import React from 'react';
import 'antd/dist/antd.css';
import { Avatar, Form, Input, Button, Checkbox } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { NavLink } from 'react-router-dom'

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 8 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 8 },
};

const login = () => {
  const onFinish = values => {
    console.log('Success:', values);
  };

  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
  };

  return (
    <Form
      {...layout}
      name="basic"
      className="login-form"
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
        <Avatar size={140} icon={<UserOutlined />} style={{display: 'block', margin: "auto",}}/>
      <Form.Item
        label="Username"
        name="username"
        rules={[{ required: true, message: 'Please input your username!' }]}
      >
        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[{ required: true, message: 'Please input your password!' }]}
      >
        <Input.Password prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="Password" />
      </Form.Item>

      <Form.Item {...tailLayout} name="remember" valuePropName="checked">
        <Checkbox>Remember me</Checkbox>
        <NavLink to='/pass'className="login-form-forgot">
          Forgot password</NavLink>
      </Form.Item>

      <Form.Item {...tailLayout}>
        <Button type="ghost" htmlType="submit">
        <NavLink to='/home'>
          Sign in</NavLink>
        </Button>
      </Form.Item>
    </Form>
  );
};
export default login;