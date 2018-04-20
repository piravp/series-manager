import React from 'react';
import { Menu, Icon, Button } from 'antd';
const SubMenu = Menu.SubMenu;

export default class CollapsenMenu extends React.Component {
  state = {
    collapsed: true,
  }
  toggleCollapsed = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  }
  render() {
    return (
      <div style={{ width: 256 }}>
        <Button type="primary" onClick={this.toggleCollapsed} style={{ marginBottom: 16 }}>
          <Icon type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'} />
        </Button>
        <Menu
          defaultSelectedKeys={[]}
          defaultOpenKeys={[]}
          mode="inline"
          theme="dark"
          inlineCollapsed={this.state.collapsed}
          onClick={e => console.log(e)}
        >
          <Menu.Item key="1">
            <Icon type="plus-circle" />
            <span>Add new show</span>
          </Menu.Item>
          <Menu.Item key="2">
            <Icon type="minus-circle"  style={{ color: '#cc351a' }}/>
            <span>Remove all</span>
          </Menu.Item>
        </Menu>
      </div>
    );
  }
}