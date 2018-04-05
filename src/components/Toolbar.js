import React from 'react';

// This is the search bar

const Toolbar = (props) => (
    <div className="toolbar">
    <form onSubmit={props.handleOnSearchSubmit}>
        <input  placeholder="Search for your series here" 
                onChange={props.handleSearch}
                value={props.searchTerm}>
    
        </input>
    </form>
    </div>
);

export default Toolbar;