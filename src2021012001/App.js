import React, { useState, useEffect } from 'react';
import axios from 'axios';
import users from './API';
import "antd/dist/antd.css";
import "./App.css";

import { Modal } from 'antd';
const { confirm } = Modal;

function App() {
  const [modal, setModal] = useState({ visible: false, action: "" });
  const [data, setData] = useState([]);
  const [first, setFirst] = useState("");
  const [last, setLast] = useState("");
  const [email, setEmail] = useState("");
  const [pagination, setPagination] = useState({ current: 1, totalPages: 1, pageSize: 1, total: 1 });

  const loadData = async (param = 1) => {
    await axios({
      url: users.getUsers.url + param,
      method: users.getUsers.method,
    }).then(result => {
      setData(result.data.data)
      setPagination({
        current: result.data.page,
        totalPages: result.data.total_pages,
        pageSize: result.data.per_page,
        total: result.data.total,
      })
    });
  }
  useEffect(() => {
    loadData();
  }, []);
  const pager = () => {
    let pages = [];
    for (let i = 0; i < pagination.totalPages; i++) {
      pages[i] = i + 1
    }
    return pages
  }
  const handleClick = (action, param = {}) => {
    if (action === "Add") {
      setModal({ visible: true, action: "Add" });
    }
    else if (action === "Edit") {
      setFirst(param.first_name)
      setLast(param.last_name)
      setEmail(param.email)
      setModal({ visible: true, action: "Edit" });
    }
    else if (action === "Delete") {
      confirm({
        title: 'Do you Want to delete this item?',
        onOk() {
          let rows = [...data]
          rows.splice(rows.findIndex(users => users.id === param.id), 1)
          setData(rows)
        },
      });
    }
  }

  const handleOk = async (action) => {
    let userChanged = { first_name: first, last_name: last, email: email }
    if (first === "" || last === "" || email === "") {
      confirm({ title: 'Please enter fields .' });
    }
    else if (action === "Add") {
      setData(prevState => ([userChanged, ...prevState]));
      handleCancel();
    }
    else if (action === "Edit") {
      let rows = [...data]
      let index = rows.findIndex(users => users.email === email)
      rows[index].first_name = first;
      rows[index].last_name = last;
      rows[index].email = email;
      setData(rows);
      handleCancel();
    }
  }

  const handleCancel = () => {
    setModal({ visible: false, action: "" });
    setFirst("")
    setLast("")
    setEmail("")
  }

  return (
    <div>
      <button onClick={(e) => handleClick("Add")}>Add User</button>
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
          {data.length > 0 ? (
            data.map((users) => (
              <tr key={users.email}>
                <td><img width="70" src={users.avatar} alt={users.email} /></td>
                <td>{users.first_name}</td>
                <td>{users.last_name}</td>
                <td>{users.email}</td>
                <td>
                  <button onClick={(e) => handleClick("Edit", users)}>Edit</button>
                  <button onClick={(e) => handleClick("Delete", users)}>Delete</button>
                </td>
              </tr>
            ))
          ) : (
              <tr>
                <td colSpan={5}>No users</td>
              </tr>
            )}
        </tbody>
      </table>

      <div className="pagination">
        {pager().length > 0 && pager().map(page =>
          <button onClick={(e) => loadData(page)}>{page}</button>
        )}
      </div>

      <Modal
        visible={modal.visible}
        title={modal.action}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <button onClick={(e) => handleCancel()}>Cancel</button>,
          <button onClick={(e) => handleOk(modal.action)}>Submit</button>,
        ]}
      >
        FirstName:
          <input type="text" name="first_name" value={first} onChange={(e) => setFirst(e.target.value)} />
        <br />
        LastName:
          <input type="text" name="last_name" value={last} onChange={(e) => setLast(e.target.value)} />
        <br />
        Email:
          <input type="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <br />
      </Modal>
    </div>
  )
}
export default App;
