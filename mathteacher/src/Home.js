import React, {Component} from 'react';
import 'antd/dist/antd.css';
import { NavLink, Route, HashRouter } from 'react-router-dom'
import { Tabs, Layout, Button, Menu } from 'antd';
import {
  DesktopOutlined,
  PieChartOutlined,
  FileOutlined,
} from '@ant-design/icons';
import Cal from './Calendar.js'
import mem from './Messages.js'
import editor from './Editor.js'
import board from './Homeboard.js'
import prac from './Practice.js'
import quiz from './Quizs.js'
import mac from './ModifyAcc'

const { TabPane } = Tabs;
const { Header, Content, Footer, Sider } = Layout;
const HomeContent= () =>(
  <div>404!!!</div>
)
const AboutContent= () =>(
  <div>505!!!</div>
)
const initialPanes = [
    { title: 'Calendar', key: '/calendar', component: Cal},
    { title: 'Homeboard', key: '/homeboard', component: board},
    { title: 'Messages', key: '/messages', component: mem},
    { title: 'Editor', key: '/editor', component: editor},
    { title: 'Practice', key: '/practice', component: prac},
    { title: 'Quiz', key: '/quizs', component: quiz}
];

class Home extends Component {

  state = {
    panes: initialPanes,
    collapsed: false,
    pane: [],
  };

  onCollapse = collapsed => {
    console.log(collapsed);
    this.setState({ collapsed });
  };

  onEdit = (targetKey, action) => {
    this[action](targetKey);
  };

 onTabChanged = (key) => {
  this.setState({tabKey:key});
  this.props.history.replace({pathname:'/home' + key, state:{
      tabKey: key
  }});
};

  render() {
    return (
      <HashRouter>
      <Layout style={{ minHeight: '100vh' }}>
        <Button onClick={() => this.props.history.goBack()}>Rollback</Button>
          <Sider collapsible collapsed={this.state.collapsed} onCollapse={this.onCollapse}>
            <div className="logo" />
          <Menu theme="light" mode="inline">
            <Menu.Item key="1" icon={<PieChartOutlined />} onClick={() => this.state.pane.push(this.state.panes[0])&&console.log(this.pane)}>
              <NavLink to="/home/calendar" >Calendar</NavLink>
            </Menu.Item>
            <Menu.Item key="2" icon={<DesktopOutlined />} onClick={() => this.state.pane.push(this.state.panes[1])&&this.setState(this.pane)}>
              <NavLink to="/home/homeboard">Homeboard</NavLink>
            </Menu.Item>
            <Menu.Item key="3" icon={<PieChartOutlined />} onClick={() => this.state.pane.push(this.state.panes[2])&&this.setState(this.pane)}>
              <NavLink to="/home/messages">Messages</NavLink>
            </Menu.Item>
            <Menu.Item key="4" icon={<DesktopOutlined />} onClick={() => this.state.pane.push(this.state.panes[3])&&this.setState(this.pane)}>
              <NavLink to="/home/editor">Editor</NavLink>
            </Menu.Item>
            <Menu.Item key="5" icon={<PieChartOutlined />} onClick={() => this.state.pane.push(this.state.panes[4])&&this.setState(this.pane)}>
              <NavLink to="/home/practice">Practice</NavLink>
            </Menu.Item>
            <Menu.Item key="6" icon={<DesktopOutlined />} onClick={() => this.state.pane.push(this.state.panes[5])&&this.setState(this.pane)}>
            <NavLink to="/home/quizs">Quiz</NavLink>
            </Menu.Item>
            <Menu.Item key="7" icon={<FileOutlined />} />
            </Menu>
        </Sider>
        <Layout className="site-layout">
        <Header className="site-layout-background" style={{ padding: 0 }}>
            <Tabs type="editable-card" activeKey={(this.props.location.state && this.props.location.state.tabKey) ? this.props.location.state.tabKey : ''} onChange={this.onTabChanged}>
                <TabPane tab="Home" key="" closable={false} />
                <TabPane tab="About" key="/about" closable={false} />
                {this.state.pane.map((pan) => (
                  <TabPane tab={pan.title} key={pan.key} closable={true}>
                  </TabPane>))}
            </Tabs>
            <NavLink to="/home/modify">
            <Button>Modify Account</Button>
            </NavLink>
          </Header>
          <Content style={{ margin: '0 1px' }}>
            <div className="site-layout-background" style={{ padding: 24, minHeight: 800 }}>
                    <Route path='/home'  exact component = { HomeContent } />
                    <Route path='/home/about'  component = { AboutContent } />
                    <Route path='/home/calendar' component = { Cal } />
                    <Route path='/home/homeboard' component = { board } />
                    <Route path='/home/messages'  component = { mem } />
                    <Route path='/home/editor' component = { editor } />
                    <Route path='/home/practice'  component = { prac } />
                    <Route path='/home/quizs'  component = { quiz } />
                    <Route path='/home/modify'  component = { mac } />
            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}></Footer>
        </Layout>
      </Layout>
      </HashRouter>
    );
  }
}

export default Home;