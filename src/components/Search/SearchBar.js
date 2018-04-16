import React from 'react';
import { Input } from 'antd';
const Search = Input.Search;

// This is the search bar in /search

const SearchBar = (props) => (
    <div className="searchBarContainer">

        <form onSubmit={props.handleOnSearchSubmit}>
            <Search
                className="antdSearch"
                placeholder="Search for your series here"
                onChange={props.handleSearch}
                value={props.searchTerm}
                autoFocus
                enterButton/>
        </form>
        

    </div>
);

export default SearchBar;