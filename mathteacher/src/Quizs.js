import React from "react";
import "antd/dist/antd.css";
import "./index.css";
import { Form, Input, Button, Space, Radio, Upload, Modal, Table  } from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import {Editor} from "@tinymce/tinymce-react/lib/es2015/main/ts";
//import ImgCrop from 'antd-img-crop';

function getBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
}

const data = [];
for (let i = 0; i < 10; i++) {
    data.push({
        key: i,
        img: `Edward King ${i}`,
        question: 32,
        answer: `London, Park Lane no. ${i}`,
    });
}

class quiz extends React.Component {
  //const [selectionType, setSelectionType] = useState("checkbox");
    constructor(props) {
        super(props);

        this.state={
            selectionType: "radio",
            previewVisible: false,
            previewImage: '',
            previewTitle: '',
            tableValid: false,
            formData: [],
            fileList: [],
            question: [],
            selection: [],
            answer: [],
        };
        this.handleQuestionChange = this.handleQuestionChange.bind(this);
        this.handleSelectionChange = this.handleSelectionChange.bind(this);
        this.handleAnswerChange = this.handleAnswerChange.bind(this);
    }
    handleQuestionChange(event) {
        this.setState({ question: event.target.value });
    }

    handleSelectionChange(event) {
        this.setState({ selection: event.target.value });
    }

    handleAnswerChange(event) {
        this.setState({ answer: event.target.value });
    }

    handleSubmit(e){
        e.preventDefault();
        if(this.state.question !== "" && this.state.answer !== "" && this.state.question !== null && this.state.answer !== null){
            let object = {};
            object.question = this.state.question;
            object.answer = this.state.answer;

            this.setState({
                tableValid: true,
                formData: object,
            })
        }
    }

    handleCancel = () => this.setState({ previewVisible: false });

    handlePreview = async file => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }

        this.setState({
            previewImage: file.url || file.preview,
            previewVisible: true,
            previewTitle: file.name || file.url.substring(file.url.lastIndexOf('/') + 1),
        });
    };

    handleChange = ({ fileList }) => this.setState({ fileList });

render(){
    const onFinish = (values) => {
    console.log("Received values of form:", values);
  };
    const { previewVisible, previewImage, fileList, previewTitle } = this.state;
    const uploadButton = (
        <div>
            <PlusOutlined />
            <div style={{ marginTop: 8 }}>Upload</div>
        </div>
    );
    const table = (
        <div>
            <Table dataSource={this.state.formData}/>
        </div>
    );
    const {content} = this.props.location;
  return (
    <Form name="dynamic_form_nest_item" onFinish={onFinish} autoComplete="off">
      <Form.List name="users">
        {(fields, { add, remove }) => {
          return (
            <div>
                    <Upload
                        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                        listType="picture-card"
                        fileList={fileList}
                        onPreview={this.handlePreview}
                        onChange={this.handleChange}
                    >
                        {fileList.length >= 4 ? null : uploadButton}
                    </Upload>
                    <Modal
                        visible={previewVisible}
                        title={previewTitle}
                        footer={null}
                        onCancel={this.handleCancel}
                    >
                        <img alt="example" style={{ width: '100%' }} src={previewImage} />
                    </Modal>
                <Input.TextArea placeholder="Question" autoSize={{ minRows: 1, maxRows: 4 }} onChange={this.handleQuestionChange} value={ this.state.question } />
              <Radio.Group
                onChange={({ target: { value } }) => {
                  this.setState({selectionType: value});
                }}
                value={this.state.selectionType}
              >
                  <Radio value="radio">Single-choice</Radio>
                  <Radio value="checkbox">Multi-choice</Radio>
              </Radio.Group>
              {fields.map((field) => (
                <Space
                  key={field.key}
                  style={{ display: "flex", marginBottom: 8 }}
                  align="start"
                >
                    <Form.Item
                        {...field}
                        name={[field.name, "choice"]}
                        fieldKey={[field.fieldKey, "choice"]}
                    >
                        <Input type={this.state.selectionType} onChange={this.handleSelectionChange} value={ this.state.selection } />
                    </Form.Item>
                  <Form.Item
                    {...field}
                    name={[field.name, "answer"]}
                    fieldKey={[field.fieldKey, "answer"]}
                    rules={[{ required: true, message: "Missing answer" },
                        ]}
                  >
                    <Input.TextArea placeholder="Answer" autoSize={{ minRows: 1, maxRows: 4 }} onChange={this.handleAnswerChange} value={ this.state.answer } />
                  </Form.Item>

                  <MinusCircleOutlined
                    onClick={() => {
                      remove(field.name);
                    }}
                  />
                </Space>
              ))}

              <Form.Item>
                <Button
                  type="dashed"
                  onClick={() => {
                    add();
                  }}
                  block
                >
                  <PlusOutlined /> Add field
                </Button>
              </Form.Item>
            </div>
          );
        }}
      </Form.List>

      <Form.Item>
        <Button type="primary" htmlType="submit" onClick={this.handleSubmit}>
          Submit
        </Button>
      </Form.Item>
        {this.state.tableValid ? table() : ''}
        <form>
        <h2>Introduction to Software Engineering hahahaha</h2>
        <h3>Provide a hahahaha course overview</h3>
        <Editor
        apiKey="qagffr3pkuv17a8on1afax661irst1hbr4e6tbv888sz91jc"
        value={content}
        init={{
            height: 200,
            menubar: false
        }}
        />
        <br />
        <input type="submit" value="Submit" />
        </form>)
    </Form>
  );
}
}

export default quiz;
