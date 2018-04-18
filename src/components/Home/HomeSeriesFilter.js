import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Input, Button, Select, Icon, Popover } from 'antd'; 
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
import AddShowModal from './AddShowModal';

const popoverContent = (
    <div>
      <p>Can't find the show you're looking for? Fear not! You can manually add one here.</p>
    </div>
  );

class HomeSeriesFilter extends Component {
    state = {
        showAddShowModal: false
    }
    
    // componentDidUpdate() {
    //     {this.state.showAddShowModal && <AddShowModal closeModalInParent={() => this.setState({ showAddShowModal: false })}/>}
    // }

    render() {
        return (
        <div className="homeSeriesFilterContainer">

            <div className="homeSeriesFilterChildContainer">
                <Select defaultValue="name_ascending" style={{ width: 190 }} disabled={this.props.seriesListItems === 0} onChange={value => {
                    switch(value){
                        case 'name_ascending':
                            return this.props.dispatch(sortByNameAscending());
                        case 'name_descending':
                            return this.props.dispatch(sortByNameDescending());
                        case 'date_ascending':
                            return this.props.dispatch(sortByDateAscending());
                        case 'date_descending':
                            return this.props.dispatch(sortByDateDescending());
                        case 'rating_ascending':
                            return this.props.dispatch(sortByRatingAscending());
                        case 'rating_descending':
                            return this.props.dispatch(sortByRatingDescending());
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
                        this.props.dispatch(setTextFilter({ text: e.target.value }))
                    }}
                    autoFocus/>


                    <Button onClick={(e) => {
                        this.props.dispatch(removeAllShows())
                    }}
                    disabled={this.props.seriesListItems === 0}
                    type="danger"
                    >
                        Remove all
                    </Button>
                    <Popover content={popoverContent} title="Add new show?">
                        <Button type="primary" icon="plus-circle-o" onClick={(e) => this.setState({ showAddShowModal: true })}>Add new</Button>
                    </Popover>
            </div>
            {this.state.showAddShowModal && <AddShowModal closeModalInParent={() => this.setState({ showAddShowModal: false })}/>}
        </div>
    )}
};                 

const mapStateToProps = (state) => {
    return {
        filters: state.filters,
        seriesListItems: state.series.length
    }
}

export default connect(mapStateToProps)(HomeSeriesFilter);