import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import '../User/Login.css';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { setUserDetails } from '../../Redux/User/UserSlice';
import 'react-toastify/dist/ReactToastify.css'
import { AddUser } from '../../Api/AdminApi';

function Signup() {
  const [value, setValue] = useState({
    name: '', mob: '', email: '', password: '', is_admin:''
  });
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const GenerateError = (err) => {
    toast.error(err, {
      position: 'top-center',
      theme: 'colored',
      autoClose: 3000
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const {email,password,name} = value

      if (!email) {
        console.log("no email");
        GenerateError("Email is required")
      } else if (!password) {
        GenerateError("Password is required")
      } else if(!name){
        GenerateError("Name is required")
      }else {
        const response = await AddUser(value)
        console.log(response);
        toast(response.data.alert)
      if (response.data.status) {
        localStorage.setItem("admintoken",response.data.token)
        dispatch(setUserDetails({
          id:response.data.user._id,
          name:response.data.user.name,
          email:response.data.user.email,
          mob:response.data.user.mob,
          is_admin:response.data.user.is_admin,
          image:response.data.user.image
        }))
        navigate('/admin/home');
      }
    }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className='main'>
      <Form className="form" onSubmit={handleSubmit}>
        <h2 className="mb-3">SignUp</h2>
        <Form.Group className="mb-3" controlId="formGroupEmail">
          <Form.Label>Name</Form.Label>
          <Form.Control type="text" name='name' onChange={(e) => { setValue({ ...value, [e.target.name]: e.target.value }) }} placeholder="Enter Name" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formGroupEmail">
          <Form.Label>Mob. Number</Form.Label>
          <Form.Control type="number" name='mob' onChange={(e) => { setValue({ ...value, [e.target.name]: e.target.value }) }} placeholder="Enter Mob. Number" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formGroupEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" name='email' onChange={(e) => { setValue({ ...value, [e.target.name]: e.target.value }) }} placeholder="Enter Email" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formGroupPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" name='password' onChange={(e) => { setValue({ ...value, [e.target.name]: e.target.value }) }} placeholder="Password" />
        </Form.Group>

        <button className="btn btn-primary" type='submit'>Add User</button>
        <ToastContainer />
      </Form>
    </div>
  );
}

export default Signup;
