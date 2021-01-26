import React, { useState } from 'react';
import { UserContext } from './context/User'
import { Modal } from 'antd';
const { confirm } = Modal;

const User=(props)=> {
  const [user, setUser] = useState(props.user);
  const {remove,showModal,hideModal} = React.useContext(UserContext)
  const alt=user.first_name.charAt(0).toUpperCase() + user.last_name.charAt(0).toUpperCase();
  const handleEdit=()=>{
    showModal(user);
  }
  const handleDelete=()=>{
    confirm({ title: 'Do you Want to delete this item?',
      onOk() {
        remove(user.id)
        hideModal()
      }
    })
  }
  return (
    <tr key={user.id}>
      <td><img src={user.avatar} alt={alt} id={"profileImage"}/></td>
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
