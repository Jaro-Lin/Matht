import React, { useEffect, useRef } from 'react';
import 'antd/dist/antd.css';
import { FormInstance } from 'antd/lib/form';
import { Form, Input, Modal, Table, Button, Popconfirm, message } from 'antd';

function cancel(e) {
    console.log(e);
    message.error('Click on No');
}

interface Values {
    name: string;
    id: string;
    intro: string;
}

interface ModalFormProps {
    visible: boolean;
    onCreate: (values: Values) => void;
    onEdit: (values: Values) => void;
    onCancel: () => void;
}

// reset form fields when modal is form, closed
const useResetFormOnCloseModal = ({ form, visible }) => {
    const prevVisibleRef = useRef();
    useEffect(() => {
        prevVisibleRef.current = visible;
    }, [visible]);
    const prevVisible = prevVisibleRef.current;

    useEffect(() => {
        if (!visible && prevVisible) {
            form.resetFields();
        }
    }, [visible]);
};

const ModalForm: React.FC<ModalFormProps> = ({ visible, onCancel, onCreate }) => {
    const [form] = Form.useForm();

    useResetFormOnCloseModal({
        form,
        visible,
    });

    const onOk = () => {
        form
            .validateFields()
            .then(values => {
                form.resetFields();
                onCreate(values);
    })};

    return (
        <Modal title="Add" visible={visible} onOk={onOk} onCancel={onCancel} footer={[
            <Button key="back" onClick={onCancel}>
                Return
            </Button>,
            <Button key="submit" type="primary"  onClick={onOk}>
                Submit
            </Button>,
        ]}>
            <Form form={form} layout="vertical" name="form">
                <Form.Item name="name" label="Name" rules={[{ required: true }]}>
                    <Input />
                </Form.Item>
                <Form.Item name="id" label="ID" rules={[{ required: true }]}>
                    <Input />
                </Form.Item>
                <Form.Item name="intro" label="Introduction" rules={[{ required: true }]}>
                    <Input />
                </Form.Item>
            </Form>
        </Modal>
    );
};

class form1 extends React.Component{
    formRef = React.createRef();
    constructor(props) {
        super(props);
        this.columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            width: 150,
        },
        {
            title: 'Id',
            dataIndex: 'id',
            width: 150,
        },
        {
            title: 'Introduction',
            dataIndex: 'intro',
        },
            {
                title: 'Edit',
                dataIndex: 'edit',
                render: (_: any, record: Item) =>
                    this.state.data1.length > 0 ? (
                        <a onClick={() => this.handleEdit(record.key)}>
                            Edit
                        </a>
                    ):null,
            },
        {
            title: 'Delete',
            dataIndex: 'delete',
            render: (text, record) =>
                this.state.data1.length > 0 ? (
                    <Popconfirm title="Sure to delete?" onConfirm={() => this.handleDelete(record.key)}
                                onCancel={cancel}
                                okText="Yes"
                                cancelText="No">
                        <a>Delete</a>
                    </Popconfirm>
                ) : null,
        },
        ];
        this.state = {
            name: '',
            id: '',
            intro: '',
            data1: [],
            data2: [],
            data3: [],
            index: '',
            count: 8,
            visible: false,
            vi: false,
        };
        for (let i = 0; i < 8; i++) {
            this.state.data1.push({
                key: i,
                name: `Topic ${i}`,
                id: 40,
                intro: `topic no. ${i}`,
            });
        }
        for (let i = 0; i < 4; i++) {
            this.state.data2.push({
                key: i,
                name: `teachers ${i}`,
                id: 32,
                intro: `teacher id. ${i}`,
            });
        }
        for (let i = 0; i < 10; i++) {
            this.state.data3.push({
                key: i,
                name: `students ${i}`,
                id: 14,
                intro: `student id. ${i}`,
            });
        }
    }

    showUserModal = () => {
        this.setState({visible: true});
    };

    hideUserModal = () => {
        this.setState({visible: false});
    };

    handleDelete = key => {
        message.success('Click on Yes');
        const dataSource = [...this.state.data1];
        this.setState({ data1: dataSource.filter(item => item.key !== key) });
    };

    hideEditModal = () => {
        this.setState({
            vi: false,
        });
    };

    handleEdit = key => {
        this.setState({index: key});
        const values = this.state.data1[key];
        this.setState({vi: true,});
        if (this.formRef.current) {
            this.formRef.current.setFieldsValue({
                key: key,
                name: values.name,
                id: values.id,
                intro: values.intro,
            });
        }
    };

    /*onChange = (e) => {
        const values = e.target.values;
        this.setState({

        });
    };*/

render() {
    const onCreate = (values) => {
        const { count, data1 } = this.state;
        this.setState({visible: false});
        const newData = {
            key: count,
            name: values.name,
            id: values.id,
            intro: values.intro,
        };
        this.setState({
            data1: [...data1, newData],
            count: count + 1,
        });
    };

    /*const EditForm: React.FC<ModalFormProps> = ({ onEdit }) => {
        const [form] = Form.useForm();
            form.validateFields()
                .then(values => {
                    form.resetFields();
                    onEdit(values);
                })
    };*/

    const onEdit = (e) => {
        e.preventDefault();
        const {data1, index} = this.state;
        this.setState({
            vi: false,
        });
        //this.setState({ data1: dataSource.filter(item => item.key !== index) });
        if (this.formRef.current) {
            const values = this.formRef.current.getFieldsValue;
            data1.splice(index, 1);

        /*this.props.form.validateFields((err, values) => {
            if (!err) {

            }
        });*/
        data1[index] = {
            name: values.name,
            id: values.id,
            intro: values.intro,
        };}
        this.setState({
            data1: [...data1],
            index: '',
        });
    };
    return(
        <div>
        <Button onClick={this.showUserModal} type="primary" style={{ marginBottom: 16 }}>
            Add a Topic
        </Button>
        <ModalForm visible={this.state.visible} onCancel={this.hideUserModal} onCreate={onCreate}/>
            <Modal title="Add" visible={this.state.vi} onOk={onEdit} onCancel={this.hideEditModal} footer={[
                <Button key="back" onClick={this.hideEditModal}>
                    Return
                </Button>,
                <Button key="submit" type="primary"  onClick={onEdit}>
                    Submit
                </Button>,
            ]}>
                <Form layout="vertical" name="form" ref={this.formRef}>
                    <Form.Item name="name" label="Name" rules={[{ required: true }]}>
                        <Input/>
                    </Form.Item>
                    <Form.Item name="id" label="ID" rules={[{ required: true }]}>
                        <Input/>
                    </Form.Item>
                    <Form.Item name="intro" label="Introduction" rules={[{ required: true }]}>
                        <Input/>
                    </Form.Item>
                </Form>
            </Modal>
        <Table columns={this.columns} dataSource={this.state.data1} pagination={{ pageSize: 50 }} scroll={{ y: 240 }} />
        </div>
        );
    }
}
const form2 =()=>{
    return(
        <Table columns={this.columns} dataSource={this.state.data2} pagination={{ pageSize: 50 }} scroll={{ y: 240 }} />
    )
};
const form3 =()=>{
    return(
        <Table columns={this.columns} dataSource={this.state.data3} pagination={{ pageSize: 50 }} scroll={{ y: 240 }} />
    )
};
export default {form1, form2, form3};