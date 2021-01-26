import React, { useState, useEffect } from 'react';
import axios from 'axios';
import users from './API';
import "antd/dist/antd.css";
import "./App.css";

import User from './User'
import Pagination from './Pagination'
import ModalForm from './ModalForm'


function App() {
  const [state, setState] = useState({
    visibleModal: false,
    search: "",
    searchResult: [],
    data: [],
    currentUser: { first_name: "", last_name: "", email: "" },
    pagination: { current: 1, pageSize: 6, total: 1 }
  })

  const loadData = async (param = 1) => {
    await axios({
      url: users.getUsers.url + "page=" + param + "&per_page=100",
      method: users.getUsers.method,
    }).then(result => {
      setState({
        ...state,
        data: result.data.data,
        searchResult: result.data.data,
        pagination: { ...state.pagination, total: result.data.total }
      })
    });
  }

  useEffect(async () => {
    loadData();
  }, []);

  const filter = (value) => {
    const searchResult = state.data.filter(item => (
      item.first_name.includes(value),
      item.last_name.includes(value),
      item.email.includes(value))
    )
    setState({
      ...state,
      search: value,
      searchResult: searchResult,
      pagination: { ...state.pagination, total: searchResult.length }
    })
  }

  const handleCurrentPage = (pager) => {
    setState({ ...state, pagination: { ...state.pagination, current: pager } })
  }

  const handleAdd = () => {
    setState({ ...state, visibleModal: true });
  }

  const Edit = (user) => {
    setState({
      ...state,
      currentUser: user,
      visibleModal: true,
    })
  }

  const Delete = (id) => {
    setState({ ...state, 
      data: state.data.filter(user => user.id != id) , 
      searchResult: state.searchResult.filter(user => user.id != id)})
      handleCancel();
  }

  const handleOkAdd = (user) => {
    setState({
      ...state,
      data: [user, ...state.data],
      searchResult: [user, ...state.searchResult],
    })
    handleCancel();
  }

  const handleOkEdit = (user) => {
    let rows = [...state.data]
    let index = rows.findIndex(users => users.id === user.id)
    rows[index].first_name = user.first_name;
    rows[index].last_name = user.last_name;
    rows[index].email = user.email;
    setState({ ...state, data: rows });
    handleCancel();
  }

  const handleCancel = () => {
    setState(prevState => {
      return ({
        ...prevState, 
        visibleModal: false, 
        currentUser: { first_name: "", last_name: "", email: "" },
        pagination: { ...prevState.pagination, total: prevState.data.length }
      })
    })
  }

  return (
    <div >
      <div className="filter">
        Search: <input type="text" name="search" value={state.search} style={{ width: "300px" }} onChange={(e) => filter(e.target.value)} />
        <button className="pull-right" onClick={handleAdd}>Add User</button>
      </div>
      <table id="users">
        <thead>
          <tr>
            <th>User Image</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Options</th>
          </tr>
        </thead>
        <tbody>
          {state.data.length > 0
            ? state.searchResult.slice(
              (state.pagination.current - 1) * state.pagination.pageSize,
              state.pagination.current * state.pagination.pageSize
            ).map((user) => (<User key={user.id} user={user} Edit={Edit} Delete={Delete} />))
            : (<tr>
              <td colSpan={5}>No users</td>
            </tr>)
          }
        </tbody>
      </table>

      <Pagination handleCurrentPage={handleCurrentPage} pageSize={state.pagination.pageSize} total={state.pagination.total} />

      {state.visibleModal && <ModalForm visibleModal={state.visibleModal} user={state.currentUser} handleCancel={handleCancel} handleOkAdd={handleOkAdd} handleOkEdit={handleOkEdit} />
      }</div>
  )
}
export default App;
