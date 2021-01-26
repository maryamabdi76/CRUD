import React from 'react';
import axios from 'axios';
import AddUser from './AddUser';
import "./App.css";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      showEdit: false,
      pagination: {
        current: 1,
        totalPages: 0,
        pageSize: 0,
        total: 0
      },
    }
    this.selectedUser = this.selectedUser.bind(this);
    this.deleteUser = this.deleteUser.bind(this);
  }

  componentDidMount() {
    const { pagination } = this.state;
    this.fetch({ pagination });
  }

  fetch = (params = {}) => {
    axios({
      url: 'https://reqres.in/api/users?page=' + params.pagination.current,
      method: 'get',
      type: 'json',
    }).then(data => {
      console.log(data);
      this.setState({
        showEdit: false,
        data: data.data.data,
        pagination: {
          current: data.data.page,
          totalPages: data.data.total_pages,
          pageSize: data.data.per_page,
          total: data.data.total,
        },
      });
    });
  };

  selectedUser(user) {
    this.setState({ selectedUser: user });
    useHistory.push("/EditUser")
  }

  add = (addData) => (
    this.setState(prevState => ({ data: [addData, ...prevState.data] }))
  )

  handleInputChange = (e) => {
    const target = e.target;
    const name = target.name;
    const value = target.value;
    this.setState({ [name]: value });
  }

  handleSubmit = (e) => {
    e.preventDefault();
  }

  deleteUser(user) {
    let rows = [...this.state.data]
    let index = rows.findIndex(users => users.id === user.id)
    rows.splice(index, 1)
    this.setState({ data: rows })
  }

  render() {
    const { data, pagination } = this.state;
    return (
      <div>
        <AddUser onAddedUser={this.add} />
        <table id="users">
          <tr>
            <th>User Image</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Options</th>
          </tr>
          {data.length > 0 ? (
            data.map((user) => (
              <tr key={user.email}>
                <td><img width="80" src={user.avatar} /></td>
                <td>
                  { this.state.showEdit ?
                          <input required type="text" name="first_name" value={user.first_name} onChange={this.handleInputChange} /> 
                          : user.first_name
                  }
                </td>
                <td>{user.last_name}</td>
                <td>{user.email}</td>
                <td>
                  <Link to={"/edituser?first="+ user.first_name + "&last="+ user.last_name + "&email="+user.email } 
                  ><button>Edit</button></Link>
                  {/* <button onClick={(e) => this.state.showEdit = true }>Edit</button> */}
                  <button onClick={(e) => window.confirm('Do you want to delete?') ? this.deleteUser(user) : null}>Delete</button>
                </td>
              </tr>
            ))
          ) : (
              <tr>
                <td colSpan={5}>No users</td>
              </tr>
            )}
        </table>

        <div>
        </div>

      </div>
    );
  }
}
export default App;
