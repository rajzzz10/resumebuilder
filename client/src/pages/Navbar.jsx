import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import '../App.css'

const MyNavbar = () => {
  return (
    <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary navbar border-bottom">
      <Container>
        <Navbar.Brand href="/">ResumeAi</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
          </Nav>
          <Nav>
            <Nav.Link href="/signin">Signin</Nav.Link>
            <Nav.Link href="/login">Login</Nav.Link>
            <Button variant="btn btn-warning" href='/exp-check'>Get Started Now</Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>

  );
};

export default MyNavbar;
