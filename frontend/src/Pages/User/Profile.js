import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logOutUser, setUserDetails } from '../../Redux/User/UserSlice';
import { useEffect, useState } from 'react';
import React from 'react';
import { MDBCol, MDBContainer, MDBRow, MDBCard, MDBCardTitle, MDBCardText, MDBCardBody, MDBCardImage, MDBBtn } from 'mdb-react-ui-kit';
import { UpdateImage } from '../../Api/UserApi';


function App() {

    const navigate=useNavigate()
    const dispatch=useDispatch()
    const {id,name,email,mob,image}=useSelector(state=>state.user)
    const [img,setImg]=useState('')
    const handleLogout=()=>{
        console.log('user logged out');
        localStorage.removeItem('token')
        dispatch(logOutUser({
            id:'',
            name:'',
            email:'',
            mob:'',
            is_admin:'',
            image:''
        }))
        navigate('/')
    }
    useEffect(()=>{
      console.log(image);
    })

    const updateImage=async(e)=>{
      e.preventDefault()
        const response= await UpdateImage(id,img)
        console.log(response);
        if(response.data.updated){
          console.log('updated');
          dispatch(setUserDetails({
            id:response.data.data._id,
            name:response.data.data.name,
            email:response.data.data.email,
            mob:response.data.data.mob,
            image:response.data.data.image
          }))
        }
    }

    const handleLogIn=()=>{
        navigate('/login')
    }

  return (
    <div style={{ backgroundImage:'url(https://images.unsplash.com/photo-1511649475669-e288648b2339?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1932&q=80)', backgroundPosition:'center', backgroundSize:'cover' }}>
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container fluid>
        <Navbar.Brand onClick={()=>{navigate('/')}}>USER PROFILE</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '200px' }}
            navbarScroll
          >
            <Nav.Link onClick={()=>{navigate('/')}}>Home</Nav.Link>
          </Nav>
          
            {localStorage.getItem('token') ? <Form className='d-flex align-items-center'>
                <Nav.Link><span style={{fontWeight:'bold'}}>{name}</span></Nav.Link>
                <Button variant="outline-success" className='mx-3' onClick={handleLogout}>LogOut</Button>
                </Form> : <Button variant="outline-success" className='mx-3' onClick={handleLogIn}>LogIn</Button>}

        </Navbar.Collapse>
      </Container>
    </Navbar>
        <div className="vh-100">
          <MDBContainer>
            <MDBRow className="justify-content-center">
              <MDBCol md="9" lg="7" xl="5" className="mt-5">
                <MDBCard style={{ borderRadius: '15px' }}>
                  <MDBCardBody className="p-4">
                    <div className="d-flex text-black">
                      <div className="flex-shrink-0">
                        <MDBCardImage
                          style={{ width: '180px', borderRadius: '10px' }}
                          src={ image ? `/images/${image}` : 'https://www.pngall.com/wp-content/uploads/5/User-Profile-PNG-Image.png'}
                          alt='Generic placeholder image'
                          fluid />
                      </div>
                      <div className="flex-grow-1 ms-3">
                        <MDBCardTitle>{name}</MDBCardTitle>
                        <MDBCardText>{id}</MDBCardText>
                        <MDBCardText>{email}</MDBCardText>
    
                        <div className="d-flex justify-content-start rounded-3 p-2 mb-2"
                          style={{ backgroundColor: '#efefef' }}>
                          <div>
                            <p className="small text-muted mb-1">Moblie</p>
                            <p className="mb-0">{mob}</p>
                          </div>
                          {/* <div className="px-3">
                            <p className="small text-muted mb-1">Followers</p>
                            <p className="mb-0">976</p>
                          </div>
                          <div>
                            <p className="small text-muted mb-1">Rating</p>
                            <p className="mb-0">8.5</p>
                          </div> */}
                        </div>
                        <div className="">
                        <Form.Control onChange={(e)=>setImg(e.target.files[0])} accept='image/*' type="file" /><br/>
                          <MDBBtn onClick={updateImage}>Update Image</MDBBtn>
                        </div>
                      </div>
                    </div>
                  </MDBCardBody>
                </MDBCard>
              </MDBCol>
            </MDBRow>
          </MDBContainer>
        </div>

    </div>
  );
}

export default App;