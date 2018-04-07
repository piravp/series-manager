import React from 'react';
import { connect } from 'react-redux';

import { 
    setTextFilter, 
    sortByDateAscending,
    sortByDateDescending, 
    sortByNameAscending, 
    sortByNameDescending,
    sortByRatingAscending,
    sortByRatingDescending } from '../../actions/filters';
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

        <select disabled={props.seriesListItems === 0}
                value={props.filters.sortBy}
                onChange={(e) => {
                    switch(e.target.value){
                        case 'name_ascending':
                            return props.dispatch(sortByNameAscending());
                        case 'name_descending':
                            return props.dispatch(sortByNameDescending());
                        case 'date_ascending':
                            return props.dispatch(sortByDateAscending());
                        case 'date_descending':
                            return props.dispatch(sortByDateDescending());
                        case 'rating_ascending':
                            return props.dispatch(sortByRatingAscending());
                        case 'rating_descending':
                            return props.dispatch(sortByRatingDescending());
                    }


                }}
        
        >
            <option value="name_ascending">Name - ascending</option>
            <option value="name_descending">Name - descending</option>
            <option value="date_ascending">Aired date - ascending</option>
            <option value="date_descending">Aired date - descending</option>
            <option value="rating_ascending">Rating - ascending</option>
            <option value="rating_descending">Rating - descending</option>
        </select>

        <button onClick={(e) => {
                    props.dispatch(removeAllShows())
                }}
                disabled={props.seriesListItems === 0}
        >
            Remove all
        </button>


    </div>
);

const mapStateToProps = (state) => {
    return {
        filters: state.filters,
        seriesListItems: state.series.length
    }
}

export default connect(mapStateToProps)(HomeSeriesFilter);