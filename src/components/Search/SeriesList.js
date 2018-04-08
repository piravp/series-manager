import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Table, Icon, Divider } from 'antd';
import 'antd/lib/table/style/css'; // or antd/lib/button/style/css for css format file

import SeriesListItem from './SeriesListItem';
import { addShow } from '../../actions/series';

const IMAGE_BASE_URI = 'http://image.tmdb.org/t/p/w185/';

class SeriesList extends Component {
  state = {
    totalShows: this.props.shows.length,
    paginationConfig: {
      simple: false,
      defaultCurrent: 1,
      position: 'both',
      showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} shows.`
    }

  };
  
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
          <a href="#">Action 一 {record.name}</a>
          <Divider type="vertical" />
          <a href="#" onClick={(e) => {
            this.props.dispatch(addShow({
                id: record.id,
                name: record.name,
                vote_avg: record.vote_average,
                first_aired: record.first_air_date,
                createdAt: 20
            }))
          }}>
            Add
          </a>
          <Divider type="vertical" />
          <a href="#" className="ant-dropdown-link">
            More actions <Icon type="down" />
          </a>
        </span>
      ),
  }];



  onChange = (pagination, filters, sorter) => {
    console.log('params', pagination, filters, sorter);
    this.setState({ totalShows: '' })
  }



  onExpandedRowRender = (record) => (
    <div className="expandedRowDetails">
      {record.poster_path && <img src={`${IMAGE_BASE_URI}${record.poster_path}`} width="200"></img>}
      <div className="expandedRowDetails-inner">
        <h3>Description</h3>
        <p>{record.overview}</p>

        <h3>First Aired</h3>
        <p>{record.first_air_date}</p>
      </div>
    </div>
  );

  render() {

    return (
    <div>
        <Table  columns={this.columns}
                className="antdTableContainer"
                dataSource={this.props.shows}
                rowKey={record => record.id} 
                pagination={this.state.paginationConfig}
                onChange={this.onChange}
                expandRowByClick={true}
                expandedRowRender={this.onExpandedRowRender}/>
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
