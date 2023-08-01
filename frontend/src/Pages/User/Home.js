import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { Fragment } from 'react';
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import './home.css'


function App() {

    const navigate=useNavigate()
    const dispatch=useDispatch()
    const {id,name,email,mob}=useSelector(state=>state.user)
    const handleLogIn=()=>{
        navigate('/login')
    }

  return (
    <div className='home'>
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container fluid>
        <Navbar.Brand href="#">USER HOME</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '200px' }}
            navbarScroll
          >
            <Nav.Link>Home</Nav.Link>
          </Nav>
            {localStorage.getItem('token') ? <Form className='d-flex align-items-center'>
                <Nav.Link>Signed as: <span style={{fontWeight:'bold'}}>{name}</span></Nav.Link>
                <Link className='px-3' to={'/profile'}><FontAwesomeIcon icon={faUser} /></Link>
                </Form> : <Button variant="outline-success" className='mx-3' onClick={handleLogIn}>LogIn</Button>}

        </Navbar.Collapse>
      </Container>
    </Navbar>
    </div>
  );
}

export default App;