import React from "react";
import { connect } from "react-redux";
import { Card, Skeleton, message, Button } from "antd";
import { getTestDetail } from "../store/actions/test";
import { createGradedTest } from "../store/actions/gradedTest";
import Hoc from "../hoc/hoc";
import {Editor} from "@tinymce/tinymce-react/lib/es2015/main/ts";

const cardStyle = {
  marginTop: "20px",
  marginBottom: "20px"
};

class TestDetail extends React.Component {
  state = {
    userTest: {}
  };

  componentDidMount() {
    if (this.props.token !== undefined && this.props.token !== null) {
      this.props.getTestDetail(this.props.token, this.props.match.params.id);
    }
  }

  componentWillReceiveProps(newProps) {
    if (newProps.token !== this.props.token) {
      if (newProps.token !== undefined && newProps.token !== null) {
        this.props.getTestDetail(newProps.token, this.props.match.params.id);
      }
    }
  }

  onChange = (e, tId) => {
    const { userTest } = this.state;
    userTest[tId] = e.target.value;
    this.setState({ userTest });
  };

  handleEditorChange = (test) => {
        this.setState({ userTest: test });
  };

  handleSubmit() {
    message.success("Submitting your test!");
    const { userTest } = this.state;
    const test = {
      username: this.props.username,
      testId: this.props.currentTest.id,
      test: userTest
    };
    this.props.createGradedTest(this.props.token, test);
  }

  /*
  <Editor
                    apiKey="qagffr3pkuv17a8on1afax661irst1hbr4e6tbv888sz91jc"
                    value={currentTest.test}
                    init={{
                        height: 200,
                        menubar: false
                    }}
                    onEditorChange={this.handleEditorChange}
                />
  */

  render() {
    const { currentTest } = this.props;
    const { title } = currentTest;
    const { userTest } = this.state;
    return (
      <Hoc>
        {Object.keys(currentTest).length > 0 ? (
          <Hoc>
            {this.props.loading ? (
              <Skeleton active />
            ) : (
              <Card title={title}>
                <span dangerouslySetInnerHTML={{ __html: currentTest.test }} onChange={this.onChange}>
                </span>
                <Button type="primary" htmlType="submit" onClick={this.handleSubmit}>
                    Submit
                </Button>

              </Card>
            )}
          </Hoc>
        ) : null}
      </Hoc>
    );
  }
}

const mapStateToProps = state => {
  return {
    token: state.auth.token,
    currentTest: state.test.currentTest,
    loading: state.test.loading,
    username: state.auth.username
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getTestDetail: (token, id) => dispatch(getTestDetail(token, id)),
    createGradedTest: (token, test) => dispatch(createGradedTest(token, test))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TestDetail);
