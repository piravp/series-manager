import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Card } from 'antd';
const { Meta } = Card;

import HomeListItem from './HomeListItem';
import selectSeries from '../../selectors/series';
import HomeSeriesFilter from './HomeSeriesFilter';
import HomeDetailsModal from './HomeDetailsModal';

//import NOT_AVAILABLE_IMAGE from '../../../public/assets/no-image-available.png';
import NOT_AVAILABLE_IMAGE from '../../../public/assets/no-image-icon-15.png';

class HomePage extends Component {
    
    state = {
        showModal: false,
        modalShowId: undefined
    }

    render() {
        return (
            <div className="homePageContainer">
            <HomeSeriesFilter />
            <div className="cardsContainer">
                {this.props.series.map((show) => (

                <div className="singleCard" key={show.id} onClick={(e) => this.setState({ showModal: true, modalShowId: show.id })  }>
                        <Card
                            hoverable
                            style={{ width: 240 }}
                            cover={<img alt="example" src={show.poster_path ? show.poster_path : NOT_AVAILABLE_IMAGE} />}
                        >
                        <Meta
                            title={show.name}
                            description="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
                        />
                        </Card>
                         
                </div>
                ))}
                {this.state.showModal && <HomeDetailsModal className="modalModal" modalShowId={this.state.modalShowId} closeModalInParent={() => this.setState({ showModal: false, modalShowId: undefined })}/>}
             </div>
                 
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