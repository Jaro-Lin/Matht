import React from 'react';
import 'antd/dist/antd.css';
import {Menu, Layout} from 'antd';
import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';
import { NavLink, Route, HashRouter } from 'react-router-dom'
import form from './Form';

const { SubMenu } = Menu;
const { Content } = Layout;
class board extends React.Component {
    // submenu keys of first level
    rootSubmenuKeys = ['sub1', 'sub2', 'sub3'];

    state = {
        openKeys: ['sub1'],
    };

    onOpenChange = openKeys => {
        const latestOpenKey = openKeys.find(key => this.state.openKeys.indexOf(key) === -1);
        if (this.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
            this.setState({ openKeys });
        } else {
            this.setState({
                openKeys: latestOpenKey ? [latestOpenKey] : [],
            });
        }
    };

    render() {
        return (
            <HashRouter>
            <Menu
                mode="inline"
                openKeys={this.state.openKeys}
                onOpenChange={this.onOpenChange}
                style={{ width: 256 }}
            >
                <SubMenu key="sub1" icon={<MailOutlined />} title="Topics">
                    <Menu.Item key="1"><NavLink to="/home/homeboard/year"> Year 7 </NavLink></Menu.Item>
                    <Menu.Item key="2">Year 8</Menu.Item>
                    <Menu.Item key="3">Year 9</Menu.Item>
                    <Menu.Item key="4">Year 10</Menu.Item>
                    <Menu.Item key="5">Year 11</Menu.Item>
                    <Menu.Item key="6">Year 12</Menu.Item>
                    <Menu.Item key="7">Year 13</Menu.Item>
                </SubMenu>
                    <Menu.Item key="8" icon={<AppstoreOutlined />}><NavLink to="/home/homeboard/teacher"> Teacher </NavLink></Menu.Item>
                <SubMenu key="sub3" icon={<SettingOutlined />} title="Students">
                    <Menu.Item key="15"><NavLink to="/home/homeboard/student"> Year 7 </NavLink></Menu.Item>
                    <Menu.Item key="16">Year 8</Menu.Item>
                    <Menu.Item key="17">Year 9</Menu.Item>
                    <Menu.Item key="18">Year 10</Menu.Item>
                    <Menu.Item key="19">Year 11</Menu.Item>
                    <Menu.Item key="20">Year 12</Menu.Item>
                    <Menu.Item key="21">Year 13</Menu.Item>
                </SubMenu>
            </Menu>
                <Content style={{ margin: '0 1px' }}>
                    <div className="site-layout-background" style={{ padding: 24, minHeight: 800 }}>
                        <Route path='/home/homeboard/year' component = { form.form1 } />
                        <Route path='/home/homeboard/teacher' component = { form.form2 } />
                        <Route path='/home/homeboard/student' component = { form.form3 } />
                    </div>
                </Content>
            </HashRouter>
        );
    }
}

export default board;