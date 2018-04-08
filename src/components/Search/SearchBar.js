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
            enterButton
        />
        </form>


    </div>
);

export default SearchBar;
// <form onSubmit={props.handleOnSearchSubmit}>
// <input  placeholder="Search for your series here" 
//         onChange={props.handleSearch}
//         value={props.searchTerm}
//         autoFocus>

// </input>
// </form>

// <form onSubmit={props.handleOnSearchSubmit}>
// <Search
//     className="antdSearch"
//     placeholder="Search for your series here"
//     onEnter={props.handleSearch}
//     enterButton
// />
// </form>


// <Search
// className="antdSearch"
// placeholder="Search for your series here"
// onChange={props.handleSearch}
// onSearch={props.handleSearchAntdSubmit}
// enterButton
// />