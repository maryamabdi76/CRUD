import React, { useState, useEffect } from 'react';
import { Modal } from 'antd';
const { confirm } = Modal;

const User=(props)=> {
  const [user, setUser] = useState(props.user);
  const handleEdit=()=>{
    props.Edit(user);
  }
  const handleDelete=()=>{
    confirm({ title: 'Do you Want to delete this item?',
      onOk() {
        props.Delete(user.id)
      }
    })
  }
  return (
    <tr key={user.id}>
      <td><img width="70" src={user.avatar} alt={user.email} /></td>
      <td>{user.first_name}</td>
      <td>{user.last_name}</td>
      <td>{user.email}</td>
      <td>
        <button onClick={handleEdit}>Edit</button>
        <button onClick={handleDelete}>Delete</button>
      </td>
    </tr>
    
  )
}
export default User;
