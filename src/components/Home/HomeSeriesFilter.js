import React from 'react';
import { connect } from 'react-redux';
import { Input, Button, Select } from 'antd'; 
const Search = Input.Search;
const Option = Select.Option;


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

        <div className="homeSeriesFilterChildContainer">
            <Select defaultValue="name_ascending" style={{ width: 190 }} disabled={props.seriesListItems === 0} onChange={value => {
                switch(value){
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
            }}>
                <Option value="name_ascending">Name - ascending</Option>
                <Option value="name_descending">Name - descending</Option>
                <Option value="date_ascending">Aired date - ascending</Option>
                <Option value="date_descending">Aired date - descending</Option>
                <Option value="rating_ascending">Rating - ascending</Option>
                <Option value="rating_descending">Rating - descending</Option>
            </Select>
        
            <Search
                className="searchbarInHome"
                placeholder="Search through your list"
                onChange={(e) => {
                    props.dispatch(setTextFilter({ text: e.target.value }))
                }}
                autoFocus/>


                <Button onClick={(e) => {
                    props.dispatch(removeAllShows())
                }}
                disabled={props.seriesListItems === 0}
                type="danger"
                >
                    Remove all
                </Button>
        </div>
    </div>
);

const mapStateToProps = (state) => {
    return {
        filters: state.filters,
        seriesListItems: state.series.length
    }
}

export default connect(mapStateToProps)(HomeSeriesFilter);