import React from "react";
import { Layout, Menu } from "antd";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../store/actions/auth";

const { Header, Content, Footer, Sider } = Layout;

class CustomLayout extends React.Component {

  render() {
    return (
      <Layout className="layout">
        <Header>
          <div className="logo" />
          <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={["2"]}
            style={{ lineHeight: "64px" }}
          >
            {this.props.isAuthenticated ? (
              <Menu.Item key="2" onClick={this.props.logout}>
                Logout
              </Menu.Item>
            ) : (
              <Menu.Item key="2">
                <Link to="/login">Login</Link>
              </Menu.Item>
            )}
          </Menu>
        </Header>
        <Layout>
        {this.props.token !== null ? (
         <Sider width={150} style={{ background: '#fff' }}>
            <Menu theme="light" mode="inline" style={{ height: '100%', borderRight: 0 }}>
            <Menu.Item key="10">
              <Link to="/" >ClassList</Link>
            </Menu.Item>
            <Menu.Item key="1">
              <Link to="/practice" >PracticeList</Link>
            </Menu.Item>
            <Menu.Item key="2">
              <Link to="/testlist">TestList</Link>
            </Menu.Item>
            <Menu.Item key="3">
              <Link to={`/profile/${this.props.userId}`}>Profile</Link>
            </Menu.Item>
            {this.props.is_teacher ? (<Menu.Item key="4">
              <Link to="/gradedTestlist">GradedTestList</Link>
            </Menu.Item>):null}
            {this.props.is_teacher ? (<Menu.Item key="5">
              <Link to="/create">CreatePractice</Link>
            </Menu.Item>):null}
            {this.props.is_teacher ? (<Menu.Item key="6">
              <Link to="/createTest">CreateTest</Link>
            </Menu.Item>):null}
            <Menu.Item key="7">
            <Link to="/upload">Upload</Link>
            </Menu.Item>
            <Menu.Item key="8">
            <Link to="/homework">Homework</Link>
            </Menu.Item>
            <Menu.Item key="11">
            <Link to="/material">Material</Link>
            </Menu.Item>
            <Menu.Item key="9">
            <Link to="/calendar">Calendar</Link>
            </Menu.Item>
            </Menu>
        </Sider>):null}
       <Layout>
        <Content style={{ padding: "0 50px" }}>

          <div style={{ background: "#fff", padding: 24, minHeight: 280 }}>
            {this.props.children}
          </div>
        </Content>
       </Layout>
       </Layout>
        <Footer style={{ textAlign: "center" }}>
            Online Math Teaching © Group 12
        </Footer>
      </Layout>
    );
  }
}

const mapStateToProps = state => {
  return {
    userId: state.auth.userId,
    token: state.auth.token,
    is_teacher: state.auth.is_teacher
  };
};

const mapDispatchToProps = dispatch => {
  return {
    logout: () => dispatch(actions.logout())
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(CustomLayout)
);
