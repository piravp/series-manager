import React from 'react';
import { NavLink, Link } from 'react-router-dom';

const Header = () => (
    <div className="header-style">
        <header>
            <h1>The Designated Show</h1>

            <NavLink to="/" activeClassName="is-active" exact>Home</NavLink>
            <NavLink to="/search" activeClassName="is-active" exact>Search</NavLink>
            
        </header>
    </div>
);

export default Header;