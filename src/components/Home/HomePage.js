import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BackTop, notification, Icon } from 'antd';

import selectSeries from '../../selectors/series';
import HomeSeriesFilter from './HomeSeriesFilter';
import CardView from './View/CardView';
import InfiniteListView from './View/InfiniteListView';

import Cookies from 'universal-cookie';

const openNotification = () => {
    const args = {

      icon: <Icon style={{ color: 'cornflowerblue', fontSize: '3rem'  }} type="notification" />,  
      message: 'Welcome to The Designated Show',
      description: `Start by adding an API key in /settings. You can read more by pressing on the question mark icon below. Press x to close this notification.`,
      duration: 0,
    };
    notification.open(args);
  };

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

    componentDidMount(){
        const cookies = new Cookies();
        
        if(cookies.get('first_visit')){
            //console.log('first_visit cookie is set');

        }else{
            cookies.set('first_visit', true,  '/' );
            openNotification();
            //console.log('Cookie was set:', cookies.get('first_visit')); 
        }
    }

    render() {
        return (
            <div className="homePageContainer">
            <HomeSeriesFilter handleChangeView={this.handleChangeView} currentView={this.state.view}/>
            {
                this.state.view === 'list' ? 
                <InfiniteListView series={this.props.series} {...this.props}/> : 
                <CardView {...this.props} collections={this.props.collection} />
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