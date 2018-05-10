import React, { Component } from 'react';
import { Card, Button, Input } from 'antd';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import uuidv4 from 'uuid/v4';

import HomeDetailsModal from '../Details/HomeDetailsModal';
import { POSTER_IMG_185 } from '../../../../config';

// Actions
import { addCollection, removeCollection } from '../../../actions/collection';
import { removeShow } from '../../../actions/series';
import { removeShowTimeline, addCollectionToTimeline, removeCollectionTimeline } from '../../../actions/timeline';

const { Meta } = Card;

//import NOT_AVAILABLE_IMAGE from '../../../../public/assets/no-image-available.png';
import NOT_AVAILABLE_IMAGE from '../../../../public/assets/no-image-icon-15.png';

class CardView extends Component {
    state = {
        series: undefined,
        showModal: false,
        modalShowId: undefined
    }
    
    // When view is first mounted
    componentDidMount() {
        this.setState({ series: this.props.series })
    };
    
    // If redux state changes due to filtering or something else
    componentWillReceiveProps(nextProps) {
        console.log("props:", nextProps)
        
        this.setState({
            ...this.state,
            series: nextProps.series
        });
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



    render() {
        return (
            <div>
            <Input className="inputCreateCollection" placeholder="Create collection (press enter)" onPressEnter={this.handleAddCollection}/>
            {
                this.props.collections.map(collection => (
                    <div key={collection}>
                            <div className="cardViewCollectionTitle">
                                <h2>{collection}</h2>
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
                            
                                            <div className="singleCard animated flipInY" key={show.id} >
                                        
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


export default connect()(CardView);