import React from 'react';
import "./App.css";
class AddUser extends React.Component {
  constructor(props) {
    super(props);
    this.state = { first_name: null, last_name: null , email:null };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleInputChange(event) {
    const target = event.target;
    const name = target.name;
    const value = target.value;
    this.setState({ [name]: value });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.onAddedUser(this.state)
  }
  render() {
    return (
      <div>
        <h3>Add User</h3>
        <form onSubmit={this.handleSubmit}>
          <label>
            FirstName: <input required type="text" name="first_name" value={this.state.first_name} onChange={this.handleInputChange} />
            LastName: <input required type="text" name="last_name" value={this.state.last_name} onChange={this.handleInputChange} />
            Email: <input required type="email" name="email" value={this.state.email} onChange={this.handleInputChange} />
          </label>
          <input type="submit" value="Submit" />
        </form>
        <br/>
      </div>
    );
  }
}
export default AddUser;
