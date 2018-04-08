import React from 'react';
import { Input } from 'antd';
const Search = Input.Search;

// This is the search bar

const SearchBar = (props) => (
    <div className="searchBarContainer">

        <form onSubmit={props.handleOnSearchSubmit}>
            <Search
                className="antdSearch"
                placeholder="Search for your series here"
                onChange={props.handleSearch}
                autoFocus
                enterButton/>
        </form>


    </div>
);

export default SearchBar;