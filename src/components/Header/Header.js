import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Divider } from 'antd';

const Header = () => (
    <div className="header-style">
        <header>
            <h1>The Designated Show</h1>

            <NavLink to="/" activeClassName="is-active" exact>Home</NavLink>
            <Divider type="vertical" />
            <NavLink to="/search" activeClassName="is-active" exact>Search</NavLink>
            
        </header>
    </div>
);

export default Header;