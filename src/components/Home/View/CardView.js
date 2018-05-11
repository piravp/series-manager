import React, { Component } from 'react';
import { Card, Button, Input, TreeSelect } from 'antd';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import uuidv4 from 'uuid/v4';

import HomeDetailsModal from '../Details/HomeDetailsModal';
import { POSTER_IMG_185 } from '../../../../config';

// Actions
import { addCollection, removeCollection } from '../../../actions/collection';
import { removeShow } from '../../../actions/series';
import { removeShowTimeline, addCollectionToTimeline, removeCollectionTimeline } from '../../../actions/timeline';

import { arraysEqual } from '../../../utils/utilities';

const { Meta } = Card;

//import NOT_AVAILABLE_IMAGE from '../../../../public/assets/no-image-available.png';
import NOT_AVAILABLE_IMAGE from '../../../../public/assets/no-image-icon-15.png';


class CardView extends Component {
    state = {
        series: undefined,
        showModal: false,
        modalShowId: undefined,
        collection: [],
        selectedCollectionKeys: ['Standard'],
        animateCardView: undefined                  //Default is defined in reducer
    }
    
    // When view is first mounted
    componentDidMount() {
        this.setState({ animateCardView: this.props.settings.animateCard })

        this.setState({ series: this.props.series })
        this.fetchCollection(this.props);
    };

    // FIXME: Can be removed if Adding new collections is done outside of /home
    // The props is going to be either this.props or nextProps depending on 
    // if the function is called upon mount or update
    fetchCollection = (props) => {
        this.setState({ collection: [] })
        
        props && props.collection.map(collection => {
            this.setState( prevState => {
                return {
                    collection: prevState.collection.concat({
                        label: collection,
                        value: collection,
                        key: collection
                    })
                }
            })
        })


    };
    
    // If redux state changes due to filtering or something else
    componentWillReceiveProps(nextProps) {
        // Only update if there has been a change
        if (!arraysEqual(this.props.series, nextProps.series)){
            this.setState({
                ...this.state,
                series: nextProps.series
            });
        }

        // Only update if there has been a change
        if (!arraysEqual(this.props.collection, nextProps.collection)){
            this.fetchCollection(nextProps);
            console.log("prevProps:", this.props)
            console.log("nextProps:", nextProps)
        }
    };

    handleRemoveCard = (id, name) => {
        this.props.dispatch(removeShow({id: id}))
        this.props.dispatch(removeShowTimeline({ id, name }))
    };

    handleCardClick = (id) => {
        this.setState({ showModal: true, modalShowId: id })
    };

    handleCloseModalInParent = () => {
        this.setState({ showModal: false, modalShowId: undefined });
    };
    
    handleAddCollection = (e) => {
        this.props.dispatch(addCollection({ name: e.target.value }));
        this.props.dispatch(addCollectionToTimeline({ id: uuidv4, name: e.target.value }));
    }

    handleRemoveCollection = (collection) => {
        this.props.dispatch(removeCollection({ name: collection }));
        this.props.dispatch(removeCollectionTimeline({ name: collection }));
    }

    handleOnCollectionFilterChange = (selectedCollectionArray) => {
        this.setState({  selectedCollectionKeys: selectedCollectionArray });
    };

    render() {
        const tProps = {
            treeData: this.state.collection,
            value: this.state.selectedCollectionKeys,
            onChange: this.handleOnCollectionFilterChange,
            treeCheckable: true,
            placeholder: 'Please select collection (multiple)',
            style: { width: 300 },
          };
        return (
            <div>
            <Input className="inputCreateCollection" placeholder="Create collection (press enter)" onPressEnter={this.handleAddCollection}/>
            <TreeSelect {...tProps} />
            {
                this.props.collection.map(collection => (
                    <div key={collection}>
                            <div className="cardViewCollectionTitle">
                                <h2 style={{ fontFamily: 'Lora, sans-serif', fontSize: '2.5rem', fontWeight: 'bold' }}>{collection}</h2>
                                    {
                                        collection !== 'Standard' &&
                                            <Button type="danger"  size="small"  onClick={() => this.handleRemoveCollection(collection)}>
                                                Remove collection
                                            </Button>
                                        
                                    }
                            </div>
                        <div className="cardsContainer">
                            {               
                                this.state.series && this.state.series.length !== 0 
                                ? this.state.series.map(show => {
                                    if (show.collection === collection) {
                                        return (
                            
                                            <div className={this.state.animateCardView ? "singleCard animated flipInY" : ''} key={show.id} >
                                        
                                                    <Card
                                                        style={{ width: 280 }}
                                                        cover={show.poster_path ? <img alt="image" src={ show.poster_path && `${POSTER_IMG_185}${show.poster_path}`} /> : null}
                                                    >
                                                        <div onClick={(e) => this.handleCardClick(show.id) }>
                                                            <Meta
                                                                title={show.name}
                                                                description={show.description}
                                                            />
                                                        </div>
                                                        <div className="singleCardRemoveButton">
                                                            <Button type="danger" size="default" ghost onClick={(e) => this.handleRemoveCard(show.id, show.name)}>Remove</Button>
                                                        </div>
                                                    </Card>
                                                    
                                            </div>
                                            )
                                    }
                                }) 
                                : <p>There are no series here - navigate to <NavLink to="/search">Search</NavLink> and add your next designated show!</p>
                            }
                        </div>
                    </div>
                ))
            }


            {this.state.showModal && <HomeDetailsModal className="modalModal" modalShowId={this.state.modalShowId} handleCloseModalInParent={this.handleCloseModalInParent }/>}
         </div>
        );
    }
}


const mapStateToProps = state => {
    return {
        collection: state.collection,
        settings: state.settings
    }
};

export default connect(mapStateToProps)(CardView);