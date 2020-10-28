import React, {useState} from 'react';
import {
    Form,
    Input,
    Select,
    Button, AutoComplete,
} from 'antd';

const { Option } = Select;

const formItemLayout = {
    labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
    },
};
const tailFormItemLayout = {
    wrapperCol: {
        xs: {
            span: 24,
            offset: 0,
        },
        sm: {
            span: 16,
            offset: 8,
        },
    },
};

const mac = () => {
    const [form] = Form.useForm();
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [autoCompleteResult, setAutoCompleteResult] = useState([]);

    const onFinish = values => {
        console.log('Received values of form: ', values);
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

    const prefixSelector = (
        <Form.Item name="prefix" noStyle>
            <Select style={{ width: 70 }}>
                <Option value="86">+86</Option>
                <Option value="87">+87</Option>
                <Option value="64">+64</Option>
                <Option value="01">+01</Option>
            </Select>
        </Form.Item>
    );

    return (
        <Form
            {...formItemLayout}
            form={form}
            name="mac"
            onFinish={onFinish}
            initialValues={{
                prefix: '64',
            }}
            scrollToFirstError
        >
            <Form.Item
                name="fname"
                label={
                    <span>
            First Name&nbsp;
          </span>
                }
                rules={[{ required: true, message: 'Please input your firstname!', whitespace: true }]}
            >
                <Input placeholder="First Name"/>
            </Form.Item>

            <Form.Item
                name="lname"
                label={
                    <span>
            Last Name&nbsp;
          </span>
                }
                rules={[{ required: true, message: 'Please input your lastname!', whitespace: true }]}
            >
                <Input placeholder="Last Name"/>
            </Form.Item>

            <Form.Item name="email" label="Email"  rules={[
                {
                    type: 'email',
                    message: 'The input is not valid E-mail!',
                },
                {
                    required: true,
                    message: 'Please input your E-mail!',
                },
            ]}>
                <AutoComplete options={emailOptions} onChange={onEmailChange}>
                    <Input type="email"
                           placeholder="Email"/>
                </AutoComplete>
            </Form.Item>

            <Form.Item
                name="phone"
                label="Phone Number"
            >
                <Input placeholder="Phone Number" addonBefore={prefixSelector} style={{ width: '100%' }} />
            </Form.Item>

            <Form.Item
                name="address"
                label={
                    <span>
            Address&nbsp;
          </span>
                }
                rules={[{ whitespace: true }]}
            >
                <Input placeholder="Address"/>
            </Form.Item>

            <Form.Item {...tailFormItemLayout}>
                <Button type="primary" htmlType="submit">
                    Confirm
                </Button>
            </Form.Item>
        </Form>
    );
};
export default mac;