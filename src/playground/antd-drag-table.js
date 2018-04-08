import React from 'react';
import ReactDOM from 'react-dom';

import { Table, Pagination, Radio } from 'antd';



const columns = [{
  title: 'Name',
  dataIndex: 'name',
  filters: [{
    text: 'Joe',
    value: 'Joe',
  }, {
    text: 'Jim',
    value: 'Jim',
  }],
  // specify the condition of filtering result
  // here is that finding the name started with `value`
  onFilter: (value, record) => record.name.indexOf(value) === 0,
  defaultSortOrder: 'descend',
  sorter: (a, b) => a.name.length - b.name.length,
}, {
  title: 'Age',
  dataIndex: 'age',
  sorter: (a, b) => a.age - b.age,
}, {
  title: 'Address',
  dataIndex: 'address',
  filters: [{
    text: 'London',
    value: 'London',
  }, {
    text: 'New York',
    value: 'New York',
  }],
  filterMultiple: false,
  onFilter: (value, record) => record.address.indexOf(value) === 0,
  sorter: (a, b) => a.address.length - b.address.length,
}];

const data = [{
  key: '1',
  name: 'John Brown',
  age: 32,
  address: 'New York No. 1 Lake Park',
}, {
  key: '2',
  name: 'Jim Green',
  age: 42,
  address: 'London No. 1 Lake Park',
}, {
  key: '3',
  name: 'Joe Black',
  age: 32,
  address: 'Sidney No. 1 Lake Park',
}, {
  key: '4',
  name: 'Jim Red',
  age: 32,
  address: 'London No. 2 Lake Park',
},{
  key: '5',
  name: 'John Brown',
  age: 32,
  address: 'New York No. 1 Lake Park',
}, {
  key: '6',
  name: 'Jim Green',
  age: 42,
  address: 'London No. 1 Lake Park',
}, {
  key: '7',
  name: 'Joe Black',
  age: 32,
  address: 'Sidney No. 1 Lake Park',
}, {
  key: '8',
  name: 'Jim Red',
  age: 32,
  address: 'London No. 2 Lake Park',
},{
  key: '12',
  name: 'John Brown',
  age: 32,
  address: 'New York No. 1 Lake Park',
}, {
  key: '9',
  name: 'Jim Green',
  age: 42,
  address: 'London No. 1 Lake Park',
}, {
  key: '10',
  name: 'Joe Black',
  age: 32,
  address: 'Sidney No. 1 Lake Park',
}, {
  key: '11',
  name: 'Jim Red',
  age: 32,
  address: 'London No. 2 Lake Park'
}];

const onChange = (pagination, filters, sorter) => {
  console.log('params', pagination, filters, sorter);
}

const onExpandedRowRender = (record) => (
  <div className="antd-drag-table">
    <img src="https://image.tmdb.org/t/p/w500/8uO0gUM8aNqYLs1OsTBQiXu0fEv.jpg" width="200"></img>
    <p>Blue Bloods is a series about the Reagen family who has dedicated their lives to the NY police life.</p>
  </div>
);

const paginationConfig = {
  simple: false,
  defaultCurrent: 1,
  total: 50,
  position: 'both',
  showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} shows.`
}

let size = 'top';
const handleSizeChange = (e) => {
  size = e.target.value;
}

ReactDOM.render(
  <div>


              <Radio.Group size="default" onChange={handleSizeChange}>
                <Radio.Button value="default">Default</Radio.Button>
                <Radio.Button value="middle">Middle</Radio.Button>
                <Radio.Button value="small">Small</Radio.Button>
              </Radio.Group>

  <Table columns={columns} 
            pagination={paginationConfig}
            dataSource={data} 
            onChange={onChange}
            expandRowByClick={true}
            expandedRowRender={onExpandedRowRender}
            scroll={{ x: 1500, y: 400 }}
            size={size}/>
  </div>

, document.getElementById('app'));
