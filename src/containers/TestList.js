import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { List, Skeleton } from "antd";
import * as actions from "../store/actions/test";
import Hoc from "../hoc/hoc";

class TestList extends React.PureComponent {
  componentDidMount() {
    if (this.props.token !== undefined && this.props.token !== null) {
      this.props.getTest(this.props.token);
    }
  }

  componentWillReceiveProps(newProps) {
    if (newProps.token !== this.props.token) {
      if (newProps.token !== undefined && newProps.token !== null) {
        this.props.getTest(newProps.token);
      }
    }
  }

  renderItem(item) {
    return (
      <Link to={`/test/${item.id}`}>
        <List.Item>{item.title}</List.Item>
      </Link>
    );
  }

  render() {
    return (
      <Hoc>
        {this.props.loading ? (
          <Skeleton active />
        ) : (
          <div>
            <h3 style={{ margin: "16px 0" }}>Test List</h3>
            <List
              size="large"
              bordered
              dataSource={this.props.test}
              renderItem={item => this.renderItem(item)}
            />
          </div>
        )}
      </Hoc>
    );
  }
}

const mapStateToProps = state => {
  return {
    token: state.auth.token,
    test: state.test.test,
    loading: state.test.loading
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getTest: token => dispatch(actions.getTest(token))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TestList);
