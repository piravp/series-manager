import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Input, Button, Select, Icon, Popover, Tooltip, Badge } from 'antd'; 
const Search = Input.Search;
const Option = Select.Option;
import CollapsenMenu from './CollapsedMenu';

import { 
    setTextFilter, 
    sortByDateAddedNewestFirst,
    sortByDateAddedOldestFirst, 
    sortByNameAscending, 
    sortByNameDescending,
    sortByRatingAscending,
    sortByRatingDescending } from '../../actions/filters';
import { removeAllShows } from '../../actions/series';
import AddShowModal from './AddShow/AddShowModal';
import { clearStorage } from '../../utils/localStorage';
import TimelineModal from './TimelineModal';


const popoverContent = (content) =>  (
    <div>
      <p>{content}</p>
    </div>
  );

class HomeSeriesFilter extends Component {
    state = {
        showAddShowModal: false,
        showTimelineModal: false
    }
    
    // componentDidUpdate() {
    //     {this.state.showAddShowModal && <AddShowModal closeModalInParent={() => this.setState({ showAddShowModal: false })}/>}
    // }

    render() {
        return (
        <div className="homeSeriesFilterContainer">

            <div className="homeSeriesFilterChildContainer">
                    <div className="timeline"  onClick={e => this.setState({ showTimelineModal: true })}>
                        <Tooltip title="Show timeline (beta)">
                            <Badge dot> 
                                <a><Icon type="fork" style={{ fontSize: 22}}/></a>
                            </Badge>
                        </Tooltip>
                    </div>

                    <div className="chooseView">
                        <div onClick={e => this.props.handleChangeView('list')} hidden={this.props.currentView==='list' ? true : false}>
                            <Tooltip title="List view">
                                <a><Icon type="bars" style={{ fontSize: 26 }}/></a>
                            </Tooltip>
                        </div>
                        <div onClick={e => this.props.handleChangeView('card')} hidden={this.props.currentView==='card' ? true : false}>
                            <Tooltip title="Card view">
                                <a><Icon type="appstore-o" style={{ fontSize: 24 }}/></a>
                            </Tooltip>
                        </div>
                    </div>



                <Select defaultValue="date_added_new_first" style={{ width: 190 }} disabled={this.props.seriesListItems === 0} onChange={value => {
                    switch(value){
                        case 'name_ascending':
                            return this.props.dispatch(sortByNameAscending());
                        case 'name_descending':
                            return this.props.dispatch(sortByNameDescending());
                        case 'date_added_old_first':
                            return this.props.dispatch(sortByDateAddedOldestFirst());
                        case 'date_added_new_first':
                            return this.props.dispatch(sortByDateAddedNewestFirst());
                        case 'rating_ascending':
                            return this.props.dispatch(sortByRatingAscending());
                        case 'rating_descending':
                            return this.props.dispatch(sortByRatingDescending());
                    }
                }}>
                    <Option value="name_ascending">Name, ascending</Option>
                    <Option value="name_descending">Name, descending</Option>
                    <Option value="date_added_old_first">Date added, oldest first</Option>
                    <Option value="date_added_new_first">Date added, newest first</Option>
                    <Option value="rating_ascending">Rating, ascending</Option>
                    <Option value="rating_descending">Rating, descending</Option>
                </Select>
            
                <Search
                    className="searchbarInHome"
                    placeholder="Search through your list"
                    onChange={(e) => {
                        this.props.dispatch(setTextFilter({ text: e.target.value }))
                    }}
                    autoFocus/>

                
                <div>
                    <Popover content={popoverContent("This will remove every show from your collection. This will also completely wipe it locally.")} title="Remove all shows">
                        <Button onClick={(e) => {
                            this.props.dispatch(removeAllShows())
                            clearStorage
                        }}
                        disabled={this.props.seriesListItems === 0}
                        type="danger"
                        ghost
                        >
                            Remove all
                        </Button>
                    </Popover>
                    <Popover content={popoverContent("Can't find the show you're looking for? Fear not! You can manually add one here.")} title="Add new show?">
                        <Button type="default" icon="plus-circle-o" onClick={(e) => this.setState({ showAddShowModal: true })}>Add new</Button>
                    </Popover>
                </div>
            </div>
            {this.state.showAddShowModal && <AddShowModal closeModalInParent={() => this.setState({ showAddShowModal: false })}/>}
            {this.state.showTimelineModal && <TimelineModal closeModalInParent={() => this.setState({ showTimelineModal: false })}/>}
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