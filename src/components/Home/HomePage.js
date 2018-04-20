import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Card, BackTop, Button } from 'antd';
const { Meta } = Card;

import selectSeries from '../../selectors/series';
import HomeSeriesFilter from './HomeSeriesFilter';
import HomeDetailsModal from './HomeDetailsModal';
import { removeShow } from '../../actions/series'
import InfiniteList from './InfiniteList';

//import NOT_AVAILABLE_IMAGE from '../../../public/assets/no-image-available.png';
import NOT_AVAILABLE_IMAGE from '../../../public/assets/no-image-icon-15.png';

class HomePage extends Component {
    
    state = {
        showModal: false,
        modalShowId: undefined,
        view: 'card'
    }

    handleRemoveCard = (id) => {
        this.props.dispatch(removeShow({id: id}))
    };

    handleChangeView = (viewType) => {
        this.setState({
            ...this.state,
            view: viewType
        })
    };

    render() {
        return (
            <div className="homePageContainer">
            <HomeSeriesFilter handleChangeView={this.handleChangeView} currentView={this.state.view}/>

            {
                this.state.view === 'list' ? 
                <InfiniteList series={this.props.series}/> : 
                <div className="cardsContainer">
                            {this.props.series.length !== 0 ? this.props.series.map((show) => (
                
                            <div className="singleCard animated flipInY" key={show.id} >
                
                                    <Card
                                        
                                        style={{ width: 240 }}
                                        cover={<img alt="image" src={show.poster_path ? show.poster_path : NOT_AVAILABLE_IMAGE} />}
                                    >
                                        <div onClick={(e) => this.setState({ showModal: true, modalShowId: show.id })  }>
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
                            {this.state.showModal && <HomeDetailsModal className="modalModal" modalShowId={this.state.modalShowId} closeModalInParent={() => this.setState({ showModal: false, modalShowId: undefined })}/>}
                </div>
            }            
            <BackTop />
        </div>
        )
    }
};
    


const mapStateToProps = (state) => {
    return {
        series: selectSeries(state.series, state.filters)
    }
};

export default connect(mapStateToProps)(HomePage);