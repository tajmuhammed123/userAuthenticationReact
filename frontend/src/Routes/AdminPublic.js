import React from 'react'
import { Navigate } from 'react-router-dom';

function AdminPublic(props) {
  if (localStorage.getItem('token')) {
    console.log("the public route console");
      return <Navigate to="/admin/home" />;
    }
    <Navigate to='/login'/>
    console.log("return case ");
    return props.children;
}

export default AdminPublic