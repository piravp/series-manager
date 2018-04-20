import React from 'react';
import { List, message, Avatar, Spin, Icon } from 'antd';

import InfiniteScroll from 'react-infinite-scroller';
import config from '../../../config.json';

// Declare local constants
const { api_key: API_KEY } = config;
const IMAGE_BASE_URI = 'https://image.tmdb.org/t/p/w300/';

const IconText = ({ type, text }) => (
  <span>
    <Icon type={type} style={{ marginRight: 8 }} />
    {text}
  </span>
);

export default class InfiniteList extends React.Component {
  state = {
    data: [],
    pendingData: [],
    loading: false,
    hasMore: false,
    currentPage: 2,
    loadNEachTime: 1
  }

  loadLimitedData(list){
    let filteredList = []
    let series_list = [...list];
    for(let i=0; i < this.state.currentPage; i++){
        // get first item
        const shifted = series_list.shift();
        filteredList = [...filteredList, shifted];
    }
    console.log('filteredDataList', filteredList);
    console.log('pending_data', series_list);
    this.setState(prevState => {
      return {
        ...this.state,
        hasMore: series_list.length > 0,
        data: prevState.data.concat(filteredList),
        pendingData: prevState.pendingData.concat(series_list)
      }
    })

  };

  loadMoreData(loadNMore){
    let newDataList = []
    let newPendingData = [...this.state.pendingData];
    for(let i=0; i < loadNMore; i++){
        // get first item
        const shifted = newPendingData.shift();
        newDataList = [...newDataList, shifted];
    }
    console.log('newDataList', newDataList);
    console.log('newPendingData', newPendingData);
    console.log('-----');
    this.setState(prevState => {
      return {
        ...this.state,
        hasMore: newPendingData.length > 0,
        data: prevState.data.concat(newDataList),
        pendingData: newPendingData
      }
    })

    if (newPendingData.length === 0) {
      message.warning('No more series to load');
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
      console.log(error, 'err')
    }
    
    // If there exists more items than items pr. page limit
    //if(this.state.data.length > this.state.currentPage){
    // if(this.state.pendingData.length > 0){      
    //   this.setState({ hasMore: true })
    // } else {
    //   this.setState({ hasMore: false })
    // }
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
      console.log('error', err)
    }



    
    

  };



  handleInfiniteOnLoad = (page) => {
    // let data = this.state.data;
    this.setState({
      loading: true,
    });
    // if (this.state.pendingData.length < this.state.loadNEachTime) {
    //   message.warning('No more series to load');
    //   this.setState({
    //     hasMore: false,
    //     loading: false,
    //   });
    //   return;
    // }

    this.loadMoreData(1);
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



// handleInfiniteOnLoad = () => {
//   let data = this.state.data;
//   this.setState({
//     loading: true,
//   });
//   if (data.length > 2) {
//     message.warning('No more series to load');
//     this.setState({
//       hasMore: false,
//       loading: false,
//     });
//     return;
//   }
//   this.getData((res) => {
//     data = data.concat(res.results);
//     this.setState({
//       data,
//       loading: false,
//     });
//   });
// }


// <List
//   dataSource={this.state.data}
//   renderItem={item => (
//     <List.Item key={item.id}>
//       <List.Item.Meta
//         avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
//         title={<a href="https://ant.design">{item.name.last}</a>}
//         description={item.email}
//       />
//       <div>Content</div>
//     </List.Item>
//   )}
// >
//   {this.state.loading && this.state.hasMore && <Spin className="demo-loading" />}
// </List>