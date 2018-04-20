import React, { Component } from 'react';
import { Card, Button } from 'antd';
const { Meta } = Card;

import HomeDetailsModal from './HomeDetailsModal';
import { removeShow } from '../../actions/series'

//import NOT_AVAILABLE_IMAGE from '../../../public/assets/no-image-available.png';
import NOT_AVAILABLE_IMAGE from '../../../public/assets/no-image-icon-15.png';

export default class CardView extends Component {
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
        console.log(nextProps)
        
        this.setState({
            ...this.state,
            series: nextProps.series
        });
    };

    handleRemoveCard = (id) => {
        this.props.dispatch(removeShow({id: id}))
    };

    handleCardClick = (id) => {
        this.setState({ showModal: true, modalShowId: id })
    };

    handleCloseModalInParent = () => {
        this.setState({ showModal: false, modalShowId: undefined });
    };
    
    render() {
        return (
            <div className="cardsContainer">
            {this.state.series && this.state.series.length !== 0 ? this.state.series.map((show) => (
                
            <div className="singleCard animated flipInY" key={show.id} >
        
                    <Card
                        style={{ width: 240 }}
                        cover={<img alt="image" src={show.poster_path ? show.poster_path : NOT_AVAILABLE_IMAGE} />}
                    >
                        <div onClick={(e) => this.handleCardClick(show.id) }>
                            <Meta
                                title={show.name}
                                description={show.description}
                            />
                        </div>
                        <div className="singleCardRemoveButton">
                            <Button type="danger" size="default" ghost onClick={(e) => this.handleRemoveCard(show.id)}>Remove</Button>
                        </div>
                    </Card>
                    
                     
            </div>
            )) : <p>There are no series here - navigate to <a href="/search">&nbsp;Search&nbsp;</a> and add your next designated show!</p>}
            {this.state.showModal && <HomeDetailsModal className="modalModal" modalShowId={this.state.modalShowId} handleCloseModalInParent={() => this.handleCloseModalInParent }/>}
         </div>
        );
    }
}
