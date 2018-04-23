import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Table, Icon, Divider, message, Menu, Dropdown } from 'antd';
import 'antd/lib/table/style/css'; // or antd/lib/button/style/css for css format file
import ISO6391 from 'iso-639-1';
import moment from 'moment';

// Custom components
import { addShow } from '../../actions/series';
import { doRequest } from '../../utils/utilities'
import DetailsModal  from './DetailsModal';
import config from '../../../config.json';
import { BACKDROP_IMG_300, LOGO_IMG_92 } from '../../../config';
import { addShowToTimeline } from '../../actions/timeline';

// Declare local constants
const { api_key: API_KEY } = config;
const NOT_AVAILABLE = (
  <p className="dataNotAvailable">Not available</p>
);


let genresDict2 = {};
class SeriesList extends Component {
  state = {

      paginationConfig: {
        simple: false,
        defaultCurrent: 1,
        position: 'both',
        showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} shows.`
      },
      showModal: false


  };
  
  menu = (
    <Menu>
      <Menu.Item>
        <a onClick={(e) => this.setState({ showModal: true }) }>More info</a>
      </Menu.Item>
    </Menu>
  );
  

    columns = [{
      title: 'Poster', dataIndex: 'poster_path', key: 'poster_path',
      render: img_path => img_path && <img src={`${LOGO_IMG_92}${img_path}`} width="92"></img>,
    }, {
      title: 'Name', dataIndex: 'name', key: 'name',
      render: text => <a href="#">{text}</a>,
    }, {
      title: 'Rating', dataIndex: 'vote_average', key: 'vote_average',
    }, {
      title: 'First Air Date', dataIndex: 'first_air_date', key: 'first_air_date',
    }, {
      title: 'Action', key: 'action',
      render: (text, record) => (
        <span>
          <a onClick={(e) => {
            console.log(record);
            this.props.dispatch(addShow({
                id: record.id,
                name: record.name,
                vote_avg: record.vote_average,
                first_aired: record.first_air_date,
                poster_path: record.poster_path,
                backdrop_path: record.backdrop_path,
                description: record.overview,
                createdAt: moment().format("YYYY-MM-DD hh:mm:ss")
            }));
            console.log(record);
            message.success(`Successfully added ${record.name} to your list.`, 2)
            this.props.dispatch(addShowToTimeline({
                id: record.id,
                name: record.name,
                createdAt: moment().format('YYYY-MM-DD HH:mm:ss')
            }));
          }}>
            Add
          </a>
          <Divider type="vertical" />
          <Dropdown overlay={this.menu}>
          <a className="ant-dropdown-link" onClick={(e) => console.log('pressed dropdown')} >
            More actions <Icon type="down" />
          </a>
          </Dropdown>
        </span>
      ),
  }];

  onChange = (pagination, filters, sorter) => {
    console.log('params', pagination, filters, sorter);
    
  }

  onExpandedRowRender = (record) => (
    <div className="expandedRowDetails">
      {record.poster_path && <img src={`${BACKDROP_IMG_300}${record.poster_path}`}></img>}
      <div className="expandedRowDetails-inner">
        <h3>Description</h3>
        {record.overview ? <p>{record.overview}</p> : NOT_AVAILABLE}
        <div className="expandedRowDetails-double-inner">
          <h3>First Aired</h3>
          {record.first_air_date ?  <p>{record.first_air_date}</p> : NOT_AVAILABLE}
          <h3>Language</h3>
          {record.original_language ? <p>{ISO6391.getName(record.original_language)}</p> : NOT_AVAILABLE}
          <h3>Genres</h3>
          {record.genre_ids.length > 0 ? record.genre_ids.map((genre, index) => (
            <p key={index}>{genresDict2[genre]}</p>
          )) : NOT_AVAILABLE}
        </div>
      </div>
    </div>
  );

  componentDidMount() {
      // Temporarily store genre object retrieved from api
      let genresDict = [];

      //Do a GET request to get the id:genre-name mapping. Then create a dictionary using this.
      Object.keys(genresDict2).length===0 && doRequest(`https://api.themoviedb.org/3/genre/tv/list?api_key=${API_KEY}`, ({genres}) => {
        genresDict = genres;
        genresDict.forEach(element => {
          genresDict2[element[Object.keys(element)[0]]]=element[Object.keys(element)[1]]
        });
        //console.log("Genres" + genresDict2);
      })
  }

  
  render() {
    return (
      <div className="seriesListContainer">

          <Table  columns={this.columns}
                  className="antdTableContainer"
                  dataSource={this.props.shows}
                  rowKey={record => record.id} 
                  pagination={this.state.paginationConfig}
                  onChange={this.onChange}

                  expandedRowRender={this.onExpandedRowRender}/>

          {this.state.showModal && <DetailsModal closeModalInParent={() => this.setState({ showModal: false })}/>}
      </div>
    );
}};


export default connect()(SeriesList);


