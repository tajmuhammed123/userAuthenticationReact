import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logOutUser } from '../../Redux/User/UserSlice';
import { Fragment, useEffect, useState } from 'react';
import { deleteUser, editUserData, getUsers } from '../../Api/AdminApi';
import Table from 'react-bootstrap/Table';
import { MDBCol, MDBInput } from "mdbreact";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faUserPen } from '@fortawesome/free-solid-svg-icons';

function AdminHome() {

    const [user,setUser]=useState([])
    const [searchInput,setSearchInput]=useState('')
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

    const handleSearchInput=(e)=>{
      setSearchInput(e.target.value)
    }
    
    const handleDeleteUser=async(userid)=>{
      deleteUser(userid).then(()=>{
        setUser(user.filter(user=>user._id !==userid))
        console.log('user deleted sucessfully');
      }).catch(error=>console.error(error))
    }

    const userdatas = user.filter(user => {
      const searchInputLower = searchInput.toLowerCase();
      const emailMatch = user.email.toLowerCase().includes(searchInputLower);
      const nameMatch = user.name.toLowerCase().includes(searchInputLower);
      const mobMatch = user.mob.toString().includes(searchInputLower);
    
      return emailMatch || nameMatch || mobMatch;
    });
    

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
    <div style={{alignItems:'center', justifyContent:'center', display:'flex', paddingTop:'50px', flexDirection:'column'}}>
        <h2>USER DETAILS</h2>
        <MDBCol md="3">
          <MDBInput hint="Search" type="text" containerClass="mt-0" value={searchInput} onChange={handleSearchInput} />
        </MDBCol>
        <Table striped bordered hover variant="dark" style={{width:'600px', borderRadius:'10px '}}>
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Emali</th>
              <th>Mobile No.</th>
              <th>Update</th>
            </tr>
          </thead>
          <tbody>
            {userdatas.map(user=>(
              <tr key={user._id}>
              <td>{user._id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.mob}</td>
              <td style={{ textAlign:'center'}}>
                <FontAwesomeIcon icon={faTrash} style={{color: "#ffffff",}} onClick={()=>handleDeleteUser(user._id)} />
                <FontAwesomeIcon icon={faUserPen} style={{color: "#ffffff", paddingLeft:'20px'}} onClick={()=>navigate(`/admin/edituser/${user._id}`)} />
              </td>
            </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </Fragment>
  );
}

export default AdminHome;