import React ,{useState} from 'react';
import "./App.css";
import { useLocation } from "react-router-dom";

const EditUser = () => {
  const location = useLocation()
  const query=new URLSearchParams(location.search)
  const [firstName, setFirstName] = useState(query.get("first"));
  const [lastName, setLastName] = useState(query.get("last"));
  const [email, setEmail] = useState(query.get("email"));

  const handleSubmit = (e) => {
    e.preventDefault();
  }
  return (
    <div>
      <h3>Edit User</h3>
      <form onSubmit={handleSubmit}>
        <label>
          FirstName: <input required type="text" name="first_name" value={firstName}/>
            LastName: <input required type="text" name="last_name" value={lastName} />
            Email: <input required type="email" name="email" value={email} />
        </label>
        <input type="submit" value="Submit" />
      </form>
      <br />
    </div>
  );
}
export default EditUser;