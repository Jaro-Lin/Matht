import React from "react";
import { Layout, Menu, Breadcrumb } from "antd";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../store/actions/auth";

const { Header, Content, Footer, Sider } = Layout;

class CustomLayout extends React.Component {

  state = {
    collapsed: false,
  };

  onCollapse = collapsed => {
    this.setState({ collapsed });
  };

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
            <Menu.Item key="1">
              <Link to="/" >AssignmentList</Link>
            </Menu.Item>
            <Menu.Item key="2">
              <Link to="/testlist">TestList</Link>
            </Menu.Item>
            <Menu.Item key="3">
              <Link to={`/profile/${this.props.userId}`}>Profile</Link>
            </Menu.Item>
            <Menu.Item key="4">
              <Link to="/create">CreateAssignment</Link>
            </Menu.Item>
            <Menu.Item key="5">
              <Link to="/createTest">CreateTest</Link>
            </Menu.Item>
            <Menu.Item key="6">
            <Link to="/calendar">Calendar</Link>
            </Menu.Item>
            </Menu>
        </Sider>):null}
       <Layout>
        <Content style={{ padding: "0 50px" }}>
          <Breadcrumb style={{ margin: "16px 0" }}>
            <Breadcrumb.Item>
              <Link to="/">Home</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>
              <Link to="/testlist">Test</Link>
            </Breadcrumb.Item>
            {this.props.token !== null ? (
              <Breadcrumb.Item>
                <Link to={`/profile/${this.props.userId}`}>Profile</Link>
              </Breadcrumb.Item>
            ) : null}
            {this.props.token !== null && this.props.is_teacher ? (
              <Breadcrumb.Item>
                <Link to="/create">Create</Link>
              </Breadcrumb.Item>
            ) : null}
            {this.props.token !== null && this.props.is_teacher ? (
              <Breadcrumb.Item>
                <Link to="/createTest">CreateTest</Link>
              </Breadcrumb.Item>
            ) : null}
          </Breadcrumb>
          <div style={{ background: "#fff", padding: 24, minHeight: 280 }}>
            {this.props.children}
          </div>
        </Content>
       </Layout>
       </Layout>
        <Footer style={{ textAlign: "center" }}>
            Math Teacher @ Group 12
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
