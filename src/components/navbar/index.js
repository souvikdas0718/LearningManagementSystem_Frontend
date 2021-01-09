import React, { useState } from "react";
import { Navbar, Nav, Modal, Button } from "react-bootstrap";
import axios from 'axios'
import {withRouter} from 'react-router-dom'

function Navigation(props) {
  const [show, setShow] = useState(false)
  const handleSubmit = () => {
    // return ()
    const URI = "https://85f85vax0l.execute-api.us-east-1.amazonaws.com/test";
    axios({
      url: URI,
    })
      .then((res) => {
        console.log("PASS");
        setShow(true)
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleLogout = () => {
    const email = localStorage.getItem('email')
    console.log(email);
    axios({
      url: 'https://do3vuuv41l.execute-api.us-east-1.amazonaws.com/login/logout',
      method: "POST",
      data: {email:email},
    })
      .then((res) => {
        localStorage.clear()
        console.log(res);
        props.history.push('/login')
      })
      .catch(({ response }) => {
        console.log(response);
      });
  }
  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand href="/">Learning Management System</Navbar.Brand>
        <Nav className="ml-auto">
          <Nav.Link href="/login">Login</Nav.Link>
          <Nav.Link href="/signup">Signup</Nav.Link>
          <Nav.Link href="/FAQ">FAQ</Nav.Link>
          <Nav.Link href="/chat">Create Chat Topic</Nav.Link>
          <Nav.Link href="/chatmain">Chat</Nav.Link>
          <Nav.Link href="/wordcloud">Data</Nav.Link>
          <Nav.Link onClick={handleSubmit}>Sentiment</Nav.Link>
          <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
        </Nav>
      </Navbar>
      {
        show && (<Modal.Dialog>
        <Modal.Header closeButton>
          <Modal.Title>Analysis</Modal.Title>
        </Modal.Header>
      
        <Modal.Body>
          <p>Analysis Done.</p>
        </Modal.Body>
      </Modal.Dialog>)
      }
    </>
  );
}

export default withRouter(Navigation);
