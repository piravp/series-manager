import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Divider, Menu, Icon } from 'antd';
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;
import {withRouter} from 'react-router'


class Header extends React.Component {
    state = {
      current: 'home',
    }
    handleClick = (e) => {
      this.setState({
        current: e.key
      });
    }

    checkActiveRoute = () => {
      const pathname = this.props.location.pathname;
      const newRoute = pathname.substring(1, pathname.length);
      const checkHome = newRoute==='' ? 'home' : newRoute;
      if(checkHome !== this.state.current){
        this.setState({ current: newRoute })
      }
    }

    componentDidMount(){
      this.checkActiveRoute();
    }

    componentDidUpdate(){
      this.checkActiveRoute();
    }

    render() {
      return (
        <div className="headerParentContainer">
          <div className="topHeader">
            <h1><a style={{color: 'black'}} href="/">The Designated Show</a></h1>
          </div>
          <div className="headerContainer">
            <Menu
              theme="dark"
              onClick={this.handleClick}
              selectedKeys={[this.state.current]}
              mode="horizontal"
            >
              <Menu.Item key="home">
                <NavLink to="/" activeClassName="is-active" exact>Home</NavLink>
              </Menu.Item>
              <Menu.Item key="search">
                <NavLink to="/search" activeClassName="is-active" exact>Search</NavLink>
              </Menu.Item>
              <Menu.Item key="popular">
                <NavLink to="/popular" activeClassName="is-active" exact>Popular</NavLink>
              </Menu.Item>
              <Menu.Item key="calendar">
                <NavLink to="/calendar" activeClassName="is-active" exact>Calendar</NavLink>
              </Menu.Item>
            </Menu>
          </div>
          
        </div>

      );
    }
  }

export default withRouter(Header);