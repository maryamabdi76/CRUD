import React from 'react';
import axios from 'axios';
import "antd/dist/antd.css";
import { Table , input } from 'antd';

const columns = [
  {
    title: 'User Image',
    dataIndex: 'avatar',
    render: (text,record)=>{
      return (
        <div>
          <img width="60" src={record.avatar} />
        </div>
      )
    }
  },
  {
    title: 'First Name',
    dataIndex: 'first_name',
  },
  {
    title: 'Last Name',
    dataIndex: 'last_name',
  },
  {
    title: 'Email',
    dataIndex: 'email',
  },
  {
    title: 'Options',
    dataIndex: 'options',
    render: ()=>{
      return (
        <div>
          <button >Edit</button>
          <button >Delete</button>
        </div>
      )
    }
  },
];

class App extends React.Component {
  state = {
    data: [],
    pagination: {
      current: 1,
      pageSize: 0,
      total: 0
    },
    loading: false,
  };

  componentDidMount() {
    const { pagination } = this.state;
    this.fetch({ pagination });
  }

  handleTableChange = (pagination) => {
    this.fetch({
      pagination
    });
  };

  fetch = (params = {}) => {
    console.log(params)
    this.setState({ loading: true });
    axios({
      url: 'https://reqres.in/api/users?page='+params.pagination.current,
      method: 'get',
      type: 'json',
    }).then(data => {
      console.log(data);
      this.setState({
        loading: false,
        data: data.data.data,
        pagination: {
          current: data.data.page,
          pageSize: data.data.per_page,
          total: data.data.total,
        },
      });
    });
  };

  render() {
    const { data, pagination, loading } = this.state;
    return (
      <Table
        kaey={data.email}
        columns={columns}
        dataSource={data}
        pagination={pagination}
        loading={loading}
        onChange={this.handleTableChange}
      />
    );
  }
}
export default App;
