import React from 'react';
import "antd/dist/antd.css";
import "./App.css";

import { UserContext } from './context/User'

import User from './User'
import Pagination from './Pagination'
import ModalForm from './ModalForm'

function App() {
  const { state, search , showModal } = React.useContext(UserContext)

  return (
    <div >
      <div className="filter">
        Search: <input type="text" name="search" value={state.search} style={{ width: "300px" }} onChange={(e) => search(e.target.value)} />
        <button className="pull-right" onClick={showModal}>Add User</button>
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
            ).map((user) => (<User key={user.id} user={user} />))
            : (<tr>
              <td colSpan={5}>No users</td>
            </tr>)
          }
        </tbody>
      </table>

      <Pagination />
      {state.visibleModal && <ModalForm />}
    </div>
  )
}
export default App;
