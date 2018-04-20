import React from 'react';
import { List, message, Avatar, Spin, Icon } from 'antd';

import InfiniteScroll from 'react-infinite-scroller';
import config from '../../../../config.json';

// Declare local constants
const { api_key: API_KEY } = config;
const IMAGE_BASE_URI = 'https://image.tmdb.org/t/p/w300/';

const IconText = ({ type, text }) => (
  <span>
    <Icon type={type} style={{ marginRight: 8 }} />
    {text}
  </span>
);

export default class InfiniteListView extends React.Component {
  state = {
    data: [],
    pendingData: [],
    loading: false,
    hasMore: false,
    currentPage: 2,
    loadNEachTime: 1
  }

  // Loaded when component mounts or if data changes 
  loadLimitedData(list){
    let filteredList = []
    let series_list = [...list];
    for(let i=0; i < this.state.currentPage; i++){
        // get first item
        const shifted = series_list.shift();
        filteredList = [...filteredList, shifted];
    }
    this.setState(prevState => {
      return {
        ...this.state,
        hasMore: series_list.length > 0,
        data: prevState.data.concat(filteredList),
        pendingData: prevState.pendingData.concat(series_list)
      }
    })

  };

  // Load more data which has already been fetched and stored in the state
  loadMoreData(loadNMore){
    let newDataList = []
    let newPendingData = [...this.state.pendingData];
    for(let i=0; i < loadNMore; i++){
        // get first item
        const shifted = newPendingData.shift();
        newDataList = [...newDataList, shifted];
    }
    this.setState(prevState => {
      return {
        ...this.state,
        hasMore: newPendingData.length > 0,
        data: prevState.data.concat(newDataList),
        pendingData: newPendingData
      }
    })

    // Let the user know that all the data has been loaded
    if (newPendingData.length === 0) {
      message.info('No more series to load');
      this.setState({
        hasMore: false,
        loading: false,
      });
      return;
    }
  }

  componentDidMount() {
    try {
      this.loadLimitedData(this.props.series);
    } catch (err) {
      // Do nothing
    }
    
  }

  // If new data or filtering is activated
  componentDidUpdate(prevProps) {
    try {
      if(prevProps.series !== this.props.series) {
        // Reset data and pendingData first
        this.setState({
          ...this.state,
          data: [],
          pendingData: []
        });
  
        this.loadLimitedData(this.props.series);
      }
    } catch(err) {
      // Do nothing
    }
  };


  handleInfiniteOnLoad = (page) => {
    this.setState({
      loading: true,
    });

    this.loadMoreData(1);               // EDIT HERE how many items is loaded at once when scrolling is triggered
    this.setState({
      ...this.state,
      loading: false,
    });
    

  }
  render() {
    return (
      <div className="demo-infinite-container">
        <InfiniteScroll
          initialLoad={false}
          pageStart={0}
          loadMore={this.handleInfiniteOnLoad}
          hasMore={!this.state.loading && this.state.hasMore}
          useWindow={true}
        >
        <List
          itemLayout="vertical"
          size="large"
          dataSource={this.state.data}
          renderItem={item => {
            if(this.props) {
              return (
                <List.Item
                  key={item && item.name}
                  actions={item && [<IconText type="star-o" text="156" />, <IconText type="like-o" text="156" />, <IconText type="message" text="2" />]}
                  extra={item && item.backdrop_path ? <img width={272} alt="logo" src={item && item.backdrop_path} /> : null}
                >
                  {item && <List.Item.Meta
                    avatar={<Avatar src={item && item.backdrop_path} />}
                    title={<a href="/">{item && item.name}</a>}
                    description="something something som"
                  />}
                  {item && item.description}
                </List.Item>
              )
            }
          }}
        >
          {this.state.loading && this.state.hasMore && <Spin className="demo-loading" />}
        </List>
        </InfiniteScroll>
      </div>
    );
  }
}