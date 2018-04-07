import React from 'react';
import { connect } from 'react-redux';

import { setTextFilter } from '../../actions/filters';
import { removeAllShows } from '../../actions/series';

const HomeSeriesFilter = (props) => (
    <div className="homeSeriesFilterContainer">

        <input autoFocus 
               type='text'
               name='filter' 
               value={props.filters.text} onChange={(e) => {
                        props.dispatch(setTextFilter({ text: e.target.value }))
                    }}
                placeholder="Search through your list"
        />

        <button onClick={(e) => {
            props.dispatch(removeAllShows())
        }}>
            Remove all
        </button>
    </div>
);

const mapStateToProps = (state) => {
    return {
        filters: state.filters
    }
}

export default connect(mapStateToProps)(HomeSeriesFilter);