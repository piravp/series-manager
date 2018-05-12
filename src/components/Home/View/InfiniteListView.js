import React from 'react';
import { List, message, Avatar, Spin, Icon, Tooltip } from 'antd';
import InfiniteScroll from 'react-infinite-scroller';
import moment from 'moment';
import { connect } from 'react-redux';

import { API_KEY } from '../../../../configKey';
import HomeDetailsModal from '../Details/HomeDetailsModal';
import { removeShow } from '../../../actions/series';
import { BACKDROP_IMG_185 } from '../../../../config';
import { removeShowTimeline } from '../../../actions/timeline';


const IconText = ({ type, text = "", classNameProp, callbackFunc }) => (
  <span className={classNameProp} onClick={(e) => callbackFunc()}>
    <Icon type={type} style={{ marginRight: 8 }} />
    {text}
  </span>
);


class InfiniteListView extends React.Component {
  state = {
    data: [],
    pendingData: [],
    loading: false,
    hasMore: false,
    currentPage: 2,
    loadNEachTime: 1,
    modal: {
      showModal: false,
      modalShowId: undefined
    },
    animateListView: undefined        //Default is defined in reducer
  }

  // Loaded when component mounts or if data changes 
  loadLimitedData(list) {
    let filteredList = []
    let series_list = [...list];
    for (let i = 0; i < this.state.currentPage; i++) {
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
  loadMoreData(loadNMore) {
    let newDataList = []
    let newPendingData = [...this.state.pendingData];
    for (let i = 0; i < loadNMore; i++) {
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
  };

  componentDidMount() {
    try {
      this.loadLimitedData(this.props.series);
    } catch (err) {
      // Do nothing
    }

    this.setState({ animateListView: this.props.settings.animateList })
  }

  // If new data or filtering is activated
  componentDidUpdate(prevProps) {
    try {
      if (prevProps.series !== this.props.series) {
        // Reset data and pendingData first
        this.setState({
          ...this.state,
          data: [],
          pendingData: []
        });

        this.loadLimitedData(this.props.series);
      }
    } catch (err) {
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


  handleRemoveShow = (id, name) => {
    this.props.dispatch(removeShow({ id: id }))
    this.props.dispatch(removeShowTimeline({ name, removedAt: moment().format('YYYY-MM-DD HH:mm:ss') }))
  };

  handleCardClick = (id) => {
    this.setState({ 
      modal: {
        showModal: true, modalShowId: id 
      }});
  };

  handleCloseModalInParent = () => {
    this.setState({ 
      modal: {
        showModal: false, modalShowId: undefined 
      }});
  };


  render() {
    const titleContent = (item) => (
      <Tooltip title="See details" mouseEnterDelay={0.1}>
        <a onClick={(e) => this.handleCardClick(item.id)}>
          {item && item.name}
        </a>
        </Tooltip>
    );

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
              if (this.props) {
                return (
                  <List.Item
                    className={this.props.settings.animateList ? "animated fadeInLeft animation-delay-200" : ''}
                    key={item && item.name}
                    actions={ [
                      <IconText type="star-o" text="156" callbackFunc={() => console.log('Rating icon pressed. Not yet implemented')}/>, 
                      <IconText classNameProp="removeIconText" type="close" text="Remove" callbackFunc={() => this.handleRemoveShow(item.id, item.name)}/>
                    ]}
                    extra={item && item.backdrop_path ? <img width={272} alt="logo" src={`${BACKDROP_IMG_185}${item.backdrop_path}`} /> : null}
                  >
                    {<List.Item.Meta
                      avatar={item && item.backdrop_path ? <Avatar src={`${BACKDROP_IMG_185}${item.backdrop_path}`} /> : null}
                      title={item && titleContent(item)}
                      description=""
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
        {this.state.modal.showModal && <HomeDetailsModal className="modalModal" modalShowId={this.state.modal.modalShowId} handleCloseModalInParent={this.handleCloseModalInParent }/>}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    settings: state.settings
  }
}

export default connect(mapStateToProps)(InfiniteListView);