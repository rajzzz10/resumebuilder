import React, { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import {  useNavigate } from 'react-router-dom';
import '../App.css';

const MyNavbar = () => {
  const [isSignin, setIsSignIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsSignIn(!!token); // Convert token to boolean
  }, []); // Runs only once on mount

  const handleLogout = () => {
    const confirmLogout = window.confirm('Are you sure you want to log out?');
    if (confirmLogout) {
      localStorage.removeItem('token');
      setIsSignIn(false); // Update state after logout
      navigate('/'); // Redirect to homepage
    }
  };

  return (
    <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary navbar border-bottom">
      <Container>
        <Navbar.Brand href="/">ResumeAi</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto"></Nav>
          {!isSignin ? (
            <Nav>
              <Nav.Link href="/signin">Signin</Nav.Link>
              <Button href="/login" variant="btn btn-warning">Login</Button>
            </Nav>
          ) : (
            <Nav>
              <Button onClick={handleLogout} variant="btn btn-danger">Logout</Button>
            </Nav>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default MyNavbar;
