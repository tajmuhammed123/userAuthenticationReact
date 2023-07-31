import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logOutUser } from '../../Redux/User/UserSlice';
import { Fragment, useEffect, useState } from 'react';
import { getUsers } from '../../Api/AdminApi';
import Table from 'react-bootstrap/Table';

function AdminHome() {

    const [user,setUser]=useState([])
    const navigate=useNavigate()
    const dispatch=useDispatch()

    useEffect(()=>{
      getUsers().then(response=>{
        const users=response.data.data
        setUser(users)
      }).catch(error=>console.error(error))
    },[])

    const {id,name,email,mob}=useSelector(state=>state.user)
    const handleLogout=()=>{
        console.log('user logged out');
        localStorage.removeItem('token')
        dispatch(logOutUser({
            id:'',
            name:'',
            email:'',
            mob:'',
            is_admin:''
        }))
        navigate('/login')
    }
    const handleLogIn=()=>{
        navigate('/login')
    }

    

  return (
    <Fragment>
        <Navbar expand="lg" className="bg-body-tertiary">
      <Container fluid>
        <Navbar.Brand href="#">ADMIN HOME</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '200px' }}
            navbarScroll
          >
            <Nav.Link href="#action1">Home</Nav.Link>
            <Nav.Link href="#action2">Link</Nav.Link>
          </Nav>
          
            {localStorage.getItem('token') ? <Form className='d-flex align-items-center'>
                <Nav.Link>Signed as: <span style={{fontWeight:'bold'}}>{name}</span></Nav.Link>
                <Button variant="outline-success" className='mx-3' onClick={handleLogout}>LogOut</Button>
                </Form> : <Button variant="outline-success" className='mx-3' onClick={handleLogIn}>LogIn</Button>}

        </Navbar.Collapse>
      </Container>
    </Navbar>
        <Table striped bordered hover variant="dark">
          <thead>
            <tr>
              <th>#</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Username</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>Mark</td>
              <td>Otto</td>
              <td>@mdo</td>
            </tr>
            <tr>
              <td>2</td>
              <td>Jacob</td>
              <td>Thornton</td>
              <td>@fat</td>
            </tr>
            <tr>
              <td>3</td>
              <td colSpan={2}>Larry the Bird</td>
              <td>@twitter</td>
            </tr>
          </tbody>
        </Table>
    </Fragment>
  );
}

export default AdminHome;