import React from 'react'
import { Navigate } from 'react-router-dom';
// import { toast } from 'react-toastify';


function AdminProtect(props) {
    if (localStorage.getItem('token')) {
        return props.children;
      }
      // toast('You have no account, Please Login');
      return <Navigate to="/login" />;
}


export default AdminProtect