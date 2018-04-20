import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BackTop } from 'antd';

import selectSeries from '../../selectors/series';
import HomeSeriesFilter from './HomeSeriesFilter';
import CardView from './CardView';
import InfiniteListView from './InfiniteListView';

class HomePage extends Component {
    state = {
        view: 'card'
    }

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
                <InfiniteListView series={this.props.series}/> : 
                <CardView {...this.props} />
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