import React from "react";
import { connect } from "react-redux";
import { Card, Skeleton, message, Button, Input } from "antd";
import { getTestDetail } from "../store/actions/test";
import { createGradedTest } from "../store/actions/gradedTest";
import Hoc from "../hoc/hoc";
import $ from 'jquery';

const cardStyle = {
  marginTop: "20px",
  marginBottom: "20px"
};

class TestDetail extends React.Component {
constructor(props) {
    super(props);
    this.state = {
        userTest: ""
    };
    this.getHTML = this.getHTML.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

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

  /*onChange = (e) => {
    console.log(this.state.userTest);
    const html = this.ref.current.innerHTML;
    this.setState({ userTest: html });

  };*/

  getHTML() {
   $('#sp :input').each(function () {
       switch (this.type) {
           case 'text': this.setAttribute('value', this.value); break;this.disabled = true;
           case 'checkbox':
           case 'radio':
               if(this.checked)this.setAttribute('checked', 'checked');
               else this.removeAttribute('checked');
               break;
           case 'textarea': this.innerHTML = this.value; break;
       }
   });
   const html = $('#sp').html();
   console.log(html);
   //alert($('#sp').html());
   this.setState({ userTest: html });
}

  handleEditorChange = (test) => {
        this.setState({ userTest: test });
  };

  handleSubmit() {
    message.success("Submitting your test!");
    $('#sp :input').each(function () {
       switch (this.type) {
           case 'text': this.setAttribute('value', this.value); break;this.disabled = true;
           case 'checkbox':
           case 'radio':
               if(this.checked)this.setAttribute('checked', 'checked');
               else this.removeAttribute('checked');
               break;
           case 'textarea': this.innerHTML = this.value; break;
       }
    });
    const html = $('#sp').html();
    this.setState({ userTest: html });
    const test = {
      username: this.props.username,
      title: this.props.currentTest.title,
      test: html
    };
    this.props.createGradedTest(this.props.token, test);
  }

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
                <span id="sp" dangerouslySetInnerHTML={{ __html: currentTest.test }}>
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
