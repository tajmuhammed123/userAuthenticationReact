import React, { useState } from 'react'
import Form from 'react-bootstrap/Form';

import '../User/Login.css'
import { useNavigate } from 'react-router-dom';
import { UserLogin } from '../../Api/UserApi';
import { useDispatch } from 'react-redux';
import { setUserDetails } from '../../Redux/User/UserSlice';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

function Login() {
    const [value,setValue]=useState('')
    const navigate = useNavigate();
    const dispatch=useDispatch()

    const GenerateError = (err) => {
      toast.error(err, {
        position: 'top-center',
        theme: 'colored',
        autoClose: 3000,
      });
    };
    const handleSubmit = async (e) => {
      e.preventDefault();
  
      try {
        const {email,password} = value

        if (!email) {
          console.log("no email");
          GenerateError("Email is required")
        } else if (!password) {
          GenerateError("Password is required")
        } else {
          const response = await UserLogin(value)
          console.log(response);
          toast(response.data.alert)
        if (response.data.status) {
          localStorage.setItem("token",response.data.token)
          dispatch(setUserDetails({
            id:response.data.user._id,
            name:response.data.user.name,
            email:response.data.user.email,
            mob:response.data.user.mob,
            is_admin:response.data.user.is_admin,
            image:response.data.user.image
          }))
          if(response.data.user.is_admin){
            navigate('/admin/home');
          }else{
            GenerateError("Not an admin")
          }
          
        }
      } 
      } catch (error) {
        console.log(error);
      }
    };
  return (
    <div className='main'>
      <Form className='form' onSubmit={handleSubmit}>
        <h2 className="mb-3">Admin Login</h2>
      <Form.Group className="mb-3" controlId="formGroupEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" name='email' onChange={(e) => { setValue({ ...value, [e.target.name]: e.target.value }) }} placeholder="Enter email" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formGroupPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" name='password' onChange={(e) => { setValue({ ...value, [e.target.name]: e.target.value }) }} placeholder="Password" />
      </Form.Group>
      <button className='btn btn-primary' type='submit'>Login</button>
      <ToastContainer />
    </Form>
    </div>
  )
}

export default Login