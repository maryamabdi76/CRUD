import React, { useState } from "react";
import { UserContext } from './context/User'
import { Modal } from 'antd';

const ModalForm = () => {
  const { state, add, edit, hideModal } = React.useContext(UserContext)
  const [user, setUser] = useState({
    available: state.currentUser.first_name === undefined ? false : true,
    id: state.currentUser.id,
    first_name: state.currentUser.first_name,
    last_name: state.currentUser.last_name,
    email: state.currentUser.email
  })
  const [fields, setFields] = useState({
    first_name: ["required"],
    last_name: ["required"],
    email: ["required", "email"]
  })
  const [error, setError] = useState({ first_name: "", last_name: "", email: "" })

  const required = (name, value) => {
    if (value === "") {
      setError(prevState => { return ({ ...prevState, [name]: name + " is required" }) })
      return true
    }
    return false
  }

  const validateEmail = (email) => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!re.test(email)) {
      setError(prevState => { return ({ ...prevState, email: "invalid Email" }) })
      return true
    }
    return false
  }

  const validation = () => {
    let validate = false;
    for (let key in fields) {
      for (let value of fields[key]) {
        if (value === "required") {
          validate = required(key, user[key])
          if (validate) break;
        }
        else if (value === "email") {
          validate = validateEmail(user[key])
        }
      }
    }
    return validate
  }

  const inputChange = (target) => {
    const name = target.name;
    const value = target.value;
    value && setError({ ...error, [name]: "" })
    setUser({ ...user, [name]: value });
  }

  const handleOk = () => {
    if (validation()) {
    }

    else if (!user.available) {
      const id = Date.now();
      const userAdd = { id: id, first_name: user.first_name, last_name: user.last_name, email: user.email }
      add(userAdd);
      hideModal();
    }

    else if (user.available) {
      edit(user);
      hideModal();
    }
  }

  return (
    <Modal
      visible={state.visibleModal}
      title={user.available ? "Edit" : "Add"}
      onOk={handleOk}
      onCancel={hideModal}
      footer={[
        <button onClick={hideModal}>Cancel</button>,
        <button onClick={handleOk}>Submit</button>,
      ]}
    >
      FirstName: <input type="text" name="first_name" value={user.first_name} onChange={(e) => inputChange(e.target)} />
      <span className="error">{error.first_name}</span>
      <br />
      LastName: <input type="text" name="last_name" value={user.last_name} onChange={(e) => inputChange(e.target)} />
      <span className="error">{error.last_name}</span>
      <br />
      Email: <input type="email" name="email" value={user.email} onChange={(e) => inputChange(e.target)} />
      <span className="error">{error.email}</span>
      <br />
    </Modal>
  )
}
export default ModalForm;