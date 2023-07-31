import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import './Login.css';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { editUserData } from '../../Api/AdminApi';

function EditUser() {
  const [value, setValue] = useState({
    name: '', mob: '', email: response.data.user.email
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
      const {email,password} = value

      if (!email) {
        console.log("no email");
        GenerateError("Email is required")
      } else {
        const response = await editUserData(id,email)
        if(response.data.updated){
           navigate('/admin/home')
        }else{
          toast('something went wrong')
        }
    } 
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className='main'>
      <Form className="form" onSubmit={handleSubmit}>
        <h2 className="mb-3">Edit User</h2>
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

        <button className="btn btn-primary" type='submit'>Edit</button>
      </Form>
    </div>
  );
}

export default EditUser;
