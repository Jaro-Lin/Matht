import React from "react";
import { connect } from "react-redux";
import { Form, Input, Button } from "antd";
import Hoc from "../hoc/hoc";
import { createTest } from "../store/actions/test";
import { Editor } from "@tinymce/tinymce-react";

const FormItem = Form.Item;

class TestCreate extends React.Component {
  state = {
    formCount: 1,
    tests: []
  };

  add = () => {
    const { formCount } = this.state;
    this.setState({
      formCount: formCount + 1
    });
  };

  remove = () => {
    const { formCount } = this.state;
    this.setState({
      formCount: formCount - 1
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log("Received title of form: ", values);
        const test = {
          teacher: this.props.username,
          title: values.title,
          test: this.state.tests
        };
        this.props.createTest(this.props.token, test);
      }
    });
  };

  handleEditorChange = (test) => {
        this.setState({ tests: test });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
    <Hoc>
      <Form onSubmit={this.handleSubmit}>
        <h1>Create new test</h1>
        <FormItem label={"Title: "}>
                    {getFieldDecorator(`title`, {
                        validateTrigger: ["onChange", "onBlur"],
                        rules: [
                        {
                            required: true,
                            message: "Please input a title"
                        }
                        ]
                    })(<Input placeholder="Add a title" />)}
                    </FormItem>
                    <Editor
                        apiKey="caqgz1g1ze14148861c0gwvlwwzn68pkg5bcwmkuaw3qcd1o"
                        initialValue=""
                        value={this.state.tests}
                        init={{
                            height: 500,
                            menubar: true,
                            resize: true,
                            autosave_ask_before_unload: true,
                            image_title: true,
                            automatic_uploads: false,
                            images_upload_url: 'postAcceptor.php',
                            menu: {
                                format: {
                                    title: 'Format',
                                    items: 'bold italic underline strikethrough superscript subscript codeformat | formats blockformats fontformats fontsizes align | forecolor backcolor | removeformat'
                                },
                            },
                            plugins: [
                                'link',
                                'searchreplace',
                                'advlist anchor autolink codesample fullscreen help image imagetools',
                                'lists link media noneditable preview',
                                'searchreplace table template visualblocks wordcount',
                                'preview',
                                'lists',
                                'paste',
                                'advlist autolink lists link image charmap print preview anchor',
                                'searchreplace visualblocks fullscreen',
                                'insertdatetime media table paste code help wordcount'
                            ],
                            toolbar:
                                'undo redo | formatselect | preview searchreplace | bold italic backcolor | mybutton | alignleft aligncenter alignright alignjustify | language spellcheckdialog | bullist numlist outdent indent | image link media | removeformat | help',
                            setup: function (editor) {
                                /* Menu items are recreated when the menu is closed and opened, so we need
                                   a variable to store the toggle menu item state. */
                                /* example, adding a toolbar menu button */
                                editor.ui.registry.addMenuButton('mybutton', {
                                    text: 'Add Choice',
                                    fetch: function (callback) {
                                        var items = [
                                            {
                                                type: 'menuitem',
                                                text: 'FillBlank',
                                                onAction: function () {
                                                    editor.insertContent('<input type="text" id="FB" name="FB">');
                                                }
                                            },
                                            {
                                                type: 'menuitem',
                                                text: 'ContentField',
                                                onAction: function () {
                                                    editor.insertContent('<textarea id="CF" name="CF" rows="5" cols="50"></textarea>');
                                                }
                                            },
                                            {
                                                type: 'nestedmenuitem',
                                                text: 'SingleChoice',
                                                getSubmenuItems: function () {
                                                    return [
                                                        {
                                                            type: 'menuitem',
                                                            text: 'TorF',
                                                            onAction: function () {
                                                                editor.insertContent('&nbsp;<label for="T">True. </label>&nbsp;<input type="radio" id="T" name="TorF" value="true"><br>' +
                                                                    '&nbsp;<label for="F">False. </label><input type="radio" id="F" name="TorF" value="false">');
                                                            }
                                                        },
                                                        {
                                                            type: 'menuitem',
                                                            text: '4thChoices',
                                                            onAction: function () {
                                                                editor.insertContent('&nbsp;<label for="S4A">A. </label><input type="radio" id="S4A" name="4thChoices" value="A"><br>' +
                                                                    '&nbsp;<label for="S4B">B. </label><input type="radio" id="S4B" name="4thChoices" value="B"><br>' +
                                                                    '&nbsp;<label for="S4C">C. </label><input type="radio" id="S4C" name="4thChoices" value="C"><br>' +
                                                                    '&nbsp;<label for="S4D">D. </label><input type="radio" id="S4D" name="4thChoices" value="D">');
                                                            }
                                                        }
                                                    ];
                                                }
                                            },
                                            {
                                                type: 'nestedmenuitem',
                                                text: 'MultiChoices',
                                                getSubmenuItems: function () {
                                                    return [
                                                        {
                                                            type: 'menuitem',
                                                            text: '4thChoices',
                                                            onAction: function () {
                                                                editor.insertContent('&nbsp;<label for="M4A">A. </label><input type="checkbox" id="M4A" name="4thChoices" value="A"><br>' +
                                                                    '&nbsp;<label for="M4B">B. </label><input type="checkbox" id="M4B" name="4thChoices" value="B"><br>' +
                                                                    '&nbsp;<label for="M4C">C. </label><input type="checkbox" id="M4C" name="4thChoices" value="C"><br>' +
                                                                    '&nbsp;<label for="M4D">D. </label><input type="checkbox" id="M4D" name="4thChoices" value="D">');
                                                            }
                                                        },
                                                        {
                                                            type: 'menuitem',
                                                            text: '5thChoices',
                                                            onAction: function () {
                                                                editor.insertContent('&nbsp;<label for="M5A">A. </label><input type="checkbox" id="M5A" name="5thChoices" value="A"><br>' +
                                                                    '&nbsp;<label for="M5B">B. </label><input type="checkbox" id="M5B" name="5thChoices" value="B"><br>' +
                                                                    '&nbsp;<label for="M5C">C. </label><input type="checkbox" id="M5C" name="5thChoices" value="C"><br>' +
                                                                    '&nbsp;<label for="M5D">D. </label><input type="checkbox" id="M5D" name="5thChoices" value="D"><br>' +
                                                                    '&nbsp;<label for="M5E">E. </label><input type="checkbox" id="M5E" name="5thChoices" value="E">');
                                                            }
                                                        }
                                                    ];
                                                }
                                            },
                                        ];
                                        callback(items);
                                    }
                                });
                            },
                        }}
                        onEditorChange={this.handleEditorChange}
                    />
            <FormItem>
            <Button type="primary" htmlType="submit">
                Submit
            </Button>
            </FormItem>
            <div dangerouslySetInnerHTML={{ __html: this.state.tests }}>
            </div>
      </Form>
      </Hoc>
    );
  }
}

const WrappedTestCreate = Form.create()(TestCreate);

const mapStateToProps = state => {
  return {
    token: state.auth.token,
    username: state.auth.username,
    loading: state.assignments.loading
  };
};

const mapDispatchToProps = dispatch => {
  return {
    createTest: (token, test) => dispatch(createTest(token, test))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WrappedTestCreate);
