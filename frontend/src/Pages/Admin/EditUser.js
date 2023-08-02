import React, { useEffect, useState } from 'react';
import Form from 'react-bootstrap/Form';
import '../User/Login';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { editUserData, userDetails } from '../../Api/AdminApi';

function EditUser() {
    
  const [value, setValue] = useState({
    name: '', mob: '', email: ''
  });
  const {id}=useParams()
  const navigate = useNavigate();
//   const GenerateError = (err) => {
//     toast.error(err, {
//       position: 'top-center',
//       theme: 'colored',
//       autoClose: 3000
//     });
//   };

  useEffect(()=>{
        const userData=async()=>{
            try {
                console.log('hghcfnf');
                const response= await userDetails(id)
                console.log('values');
                console.log(response.data);
                setValue({name:response.data.user.name,email:response.data.user.email,mob:response.data.user.mob})
            } catch (error) {
                console.log(error.message);
            }
        }
    userData()
  },[id])

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      if (!value.email) {
        console.log("no email");
        // GenerateError("Email is required")
      } else {
        console.log(value.email);
        const response = await editUserData(id,value.name,value.email,value.mob)
        console.log(response);
        if(response.data.updated){
          console.log('update');
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
          <Form.Control type="text" name='name' value={value.name} onChange={(e) => { setValue({ ...value, [e.target.name]: e.target.value }) }} placeholder="Enter Name" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formGroupEmail">
          <Form.Label>Mob. Number</Form.Label>
          <Form.Control type="number" name='mob' value={value.mob} onChange={(e) => { setValue({ ...value, [e.target.name]: e.target.value }) }} placeholder="Enter Mob. Number" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formGroupEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" name='email' value={value.email} onChange={(e) => { setValue({ ...value, [e.target.name]: e.target.value }) }} placeholder="Enter Email" />
        </Form.Group>

        <button className="btn btn-primary" type='submit'>Edit</button>
      </Form>
    </div>
  );
}

export default EditUser;
