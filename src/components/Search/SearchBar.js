import React from 'react';

// This is the search bar

const SearchBar = (props) => (
    <div className="searchBarContainer">
        <form onSubmit={props.handleOnSearchSubmit}>
            <input  placeholder="Search for your series here" 
                    onChange={props.handleSearch}
                    value={props.searchTerm}
                    autoFocus>
        
            </input>
        </form>
    </div>
);

export default SearchBar;