import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Table, Icon, Divider, message, Menu, Dropdown } from 'antd';
import 'antd/lib/table/style/css'; // or antd/lib/button/style/css for css format file
import ISO6391 from 'iso-639-1';

import SeriesListItem from './SeriesListItem';
import { addShow } from '../../actions/series';
import { doRequest } from '../../utils/utilities'
import DetailsModal  from './DetailsModal';

const IMAGE_BASE_URI = 'https://image.tmdb.org/t/p/w300/';
const NOT_AVAILABLE = (
  <p className="dataNotAvailable">Not available</p>
);


let genresDict2 = {};
class SeriesList extends Component {
  state = {
      totalShows: this.props.shows.length,
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
      render: img_path => img_path && <img src={`${IMAGE_BASE_URI}${img_path}`} width="60"></img>,
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
          <a href="#" onClick={(e) => {
            this.props.dispatch(addShow({
                id: record.id,
                name: record.name,
                vote_avg: record.vote_average,
                first_aired: record.first_air_date,
                createdAt: 20
            }));
            console.log(record);
            message.success(`Successfully added ${record.name} to your list.`, 2)
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
    this.setState({ totalShows: '' })
  }

  onExpandedRowRender = (record) => (
    <div className="expandedRowDetails">
      {record.poster_path && <img src={`${IMAGE_BASE_URI}${record.poster_path}`}></img>}
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
      Object.keys(genresDict2).length===0 && doRequest(`https://api.themoviedb.org/3/genre/tv/list?api_key=fa9ece8f7749c68617390fd3ecdb6bc4`, ({genres}) => {
        genresDict = genres;
        genresDict.forEach(element => {
          genresDict2[element[Object.keys(element)[0]]]=element[Object.keys(element)[1]]
        });
        console.log(genresDict2);
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


//export default SeriesList;
export default connect()(SeriesList);

// <Table {...this.tableProps} />

// <Table     columns={this.columns}
// className="antdTableContainer"
// dataSource={this.props.shows}
// rowKey={record => record.id} 
// pagination={this.paginationConfig}
// onChange={this.onChange}
// expandRowByClick={true}
// expandedRowRender={this.onExpandedRowRender}/>


// tableProps: {
//   columns: this.columns,
//   className: "antdTableContainer",
//   dataSource: this.props.shows,
//   rowKey: record => record.id,
//   pagination: this.paginationConfig,
//   onChange: this.onChange,
//   expandRowByClick: true,
//   expandedRowRender : this.onExpandedRowRender
// },
