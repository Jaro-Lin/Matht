import React from "react";
import { List, Skeleton, Progress } from "antd";
import { connect } from "react-redux";
import Result from "../components/Result";
import { getGradedASNTS } from "../store/actions/gradedAssignments";
import { getMarksList } from "../store/actions/upload";

import Hoc from "../hoc/hoc";

class Profile extends React.PureComponent {
  componentDidMount() {
    if (this.props.token !== undefined && this.props.token !== null) {
      this.props.getGradedASNTS(this.props.username, this.props.token);
    }
  }

  componentWillReceiveProps(newProps) {
    if (newProps.token !== this.props.token) {
      if (newProps.token !== undefined && newProps.token !== null) {
        this.props.getGradedASNTS(newProps.username, newProps.token);
      }
    }
  }

  render() {
    return (
      <Hoc>
        {this.props.loading ? (
          <Skeleton active />
        ) : (
          <Hoc>
            <h1>Hi {this.props.username}</h1>
            <h1> Practice mark </h1>
            <List
              size="large"
              dataSource={this.props.gradedAssignments}
              renderItem={a => <Result key={a.id} grade={a.grade} />}
            />
            <h1> Homework mark </h1>
            <List
              size="large"
              dataSource={this.props.mark}
              renderItem={a => <Progress key={a.id} percent={a.grade} />}
            />
            <h1> Test mark </h1>
            <List
              size="large"
              dataSource={this.props.gradedAssignments}
              renderItem={a => <Result key={a.id} grade={a.grade} />}
            />
          </Hoc>
        )}
      </Hoc>
    );
  }
}

const mapStateToProps = state => {
  return {
    token: state.auth.token,
    username: state.auth.username,
    gradedAssignments: state.gradedAssignments.assignments,
    mark: state.upload.mark,
    loading: state.gradedAssignments.loading
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getGradedASNTS: (username, token) =>
      dispatch(getGradedASNTS(username, token)),
    getMarksList: (username, token) =>
      dispatch(getMarksList(username, token))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Profile);
