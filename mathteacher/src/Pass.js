import React, {useState} from 'react';
import './index.css'
import 'antd/dist/antd.css';
import { NavLink } from 'react-router-dom'
import { Form, Input, Button, AutoComplete, } from 'antd';
import { LockOutlined } from '@ant-design/icons';

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { offset: 8, span: 8 },
};
  
const Pass = () => {

  const [autoCompleteResult, setAutoCompleteResult] = useState([]);

  const onFinish = values => {
    console.log(values);
  };

  const onEmailChange = (value) => {
    if (!value) {
      setAutoCompleteResult([]);
    } else {
      setAutoCompleteResult(['@gmail.com', '@outlook.com', '@yahoo.com', '@hotmail.com', '@icloud.com', '@qq.com', '@163.com', '@126.com', '@sina.com'].map(domain => `${value}${domain}`));
    }
  };

  const emailOptions = autoCompleteResult.map(email => ({
    label: email,
    value: email,
  }));

  return (
    <Form {...layout} name="nest-messages" onFinish={onFinish}>
      <Form.Item name={['user', 'name']} label="Name" rules={[{ required: true, message: 'Please input user name!' }]}>
        <Input type="name"
          placeholder="Name"/>
      </Form.Item>
      <Form.Item name="email" label="Email" rules={[{ required: true}]} message='Please input email!'>
      <AutoComplete options={emailOptions} onChange={onEmailChange}>
          <Input type="email"
          placeholder="Email"/>
        </AutoComplete>
      </Form.Item>
      <Form.Item
        label="New Password"
        name="newpassword"
        rules={[{ required: true, message: 'Please input new password!' },]}
        hasFeedback
      >
        <Input.Password prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="Password" />
      </Form.Item>
      <Form.Item
        label="Confirm Password"
        name="conpassword"
        dependencies={['password']}
        hasFeedback
        rules={[{ required: true, message: 'Please confirm password!' },
        ({ getFieldValue }) => ({
          validator(rule, value) {
            if (!value || getFieldValue('newpassword') === value) {
              return Promise.resolve();
            }
            return Promise.reject('The two passwords that you entered do not match!');
          },
        }),]}
      >
        <Input.Password prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="Password" />
      </Form.Item>
      <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
        <Button type="ghost" htmlType="submit">
        <NavLink to='/'>Reset Password</NavLink>
        </Button>
      </Form.Item>
    </Form>
    );
};

export default Pass;