import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Input, Button, Select, Icon, Tooltip, Collapse, Upload, TreeSelect } from 'antd'; 
const Search = Input.Search;
const Option = Select.Option;
const Panel = Collapse.Panel;
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
import { clearStorage, setAPIKey } from '../../utils/localStorage';
import TimelineModal from './TimelineModal';

// Actions
import { addCollectionToTimeline, removeAllShowsFromTimeline } from '../../actions/timeline';
import { addCollection } from '../../actions/collection';
import { filterCollection } from '../../actions/filters';


// Utilities
import { arraysEqual } from '../../utils/utilities';



class HomeSeriesFilter extends Component {
    state = {
        showAddShowModal: false,
        showTimelineModal: false,
        selectedCollectionKeys: ['Standard'],

        unfilteredCollection: []
    }
    
    // componentDidUpdate() {
    //     {this.state.showAddShowModal && <AddShowModal closeModalInParent={() => this.setState({ showAddShowModal: false })}/>}
    // }

    componentDidMount() {
        this.fetchCollection(this.props, true);
    }

    // If redux state changes due to filtering
    componentWillReceiveProps(nextProps) {
        // Only update if there has been a change
        if (!arraysEqual(this.props.allCollections, nextProps.allCollections)){
            this.fetchCollection(nextProps, false);
            console.log("prevProps:", this.props)
            console.log("nextProps:", nextProps)
        }
    };

    // FIXME: Can be removed if Adding new collections is done outside of /home
    // The props is going to be either this.props or nextProps depending on 
    // if the function is called upon mount or update
    fetchCollection = (props, first=false) => {
        this.setState({ unfilteredCollection: [] })
        
        props && props.allCollections.map(collection => {
            this.setState( prevState => {
                return {
                    unfilteredCollection: prevState.unfilteredCollection.concat({
                        label: collection,
                        value: collection,
                        key: collection
                    })
                }
            })
        })

        // Taking the logic in the if-sentence out will lead to the DOM re-rendering and
        // checkboxing all collections (including those that were unchecked)
        // if the user adds a new collection
        if(first){
            this.setState({ selectedCollectionKeys: props.allCollections })
            this.props.dispatch(filterCollection({ collectionFilter:  props.allCollections }))
        }

    };

    handleAddCollection = (e) => {
        this.props.dispatch(addCollection({ name: e.target.value }));
        this.props.dispatch(addCollectionToTimeline({ id: uuidv4, name: e.target.value }));
    }

    handleOnCollectionFilterChange = (selectedCollectionArray) => {
        this.setState({  selectedCollectionKeys: selectedCollectionArray });
        this.props.dispatch(filterCollection({ collectionFilter: selectedCollectionArray }))
    };

    render() {
        const tProps = {
            treeData: this.state.unfilteredCollection,
            value: this.state.selectedCollectionKeys,
            onChange: this.handleOnCollectionFilterChange,
            treeCheckable: true,
            placeholder: 'Please select collection (multiple)',
            style: { width: 300 },
          };
        return (
        <div className="homeSeriesFilterContainer">

            <div className="homeSeriesFilterChildContainer">
                    <div className="timeline"  onClick={e => this.setState({ showTimelineModal: true })}>
                        <Tooltip title="Show timeline (Beta)">
                            <a><Icon type="fork" style={{ fontSize: 22}}/></a>
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


                <Search
                    className="searchbarInHome"
                    placeholder="Search through your list (across collections)"
                    onChange={(e) => {
                        this.props.dispatch(setTextFilter({ text: e.target.value }))
                    }}
                    autoFocus/>
                <Tooltip title="Can't find the show you're looking for? Fear not! You can manually add one here (Coming soon).">
                    <Button disabled={true} type="default" icon="plus-circle-o" onClick={(e) => this.setState({ showAddShowModal: true })}>Add new</Button>
                </Tooltip>

            </div>
            <Collapse bordered={false}>
                <Panel showArrow={true} header="&nbsp;" key="1">
                <div className="collapseableContent">
                        <Tooltip title="This will remove every show from your collection. This will also completely wipe it locally.">
                            <Button onClick={(e) => {
                                this.props.dispatch(removeAllShows())
                                clearStorage
                                this.props.dispatch(removeAllShowsFromTimeline())
                            }}
                            disabled={this.props.series.length === 0}
                            type="danger"
                            ghost
                            >
                                Remove all
                            </Button>
                        </Tooltip>

                        <Select defaultValue="date_added_new_first" style={{ width: 190 }} disabled={this.props.series.length === 0} onChange={value => {
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


                        <Input className="inputCreateCollection" placeholder="Create collection (press enter)" onPressEnter={this.handleAddCollection}/>                        
                        <TreeSelect {...tProps} />
                </div>
                </Panel>
            </Collapse>
            {this.state.showAddShowModal && <AddShowModal closeModalInParent={() => this.setState({ showAddShowModal: false })}/>}
            {this.state.showTimelineModal && <TimelineModal closeModalInParent={() => this.setState({ showTimelineModal: false })}/>}
        </div>
    )}
};                 

const mapStateToProps = (state) => {
    return {
        filters: state.filters,
        series: state.series,
        allCollections: state.collection,
        settings: state.settings
    }
}

export default connect(mapStateToProps)(HomeSeriesFilter);

//<Popover content={popoverContent("This will remove every show from your collection. This will also completely wipe it locally.")} title="Remove all shows">