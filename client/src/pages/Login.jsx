import React, { useState } from 'react'
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import '../css/signin.css';
import '../App.css'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import MyNavbar from './Navbar';


const Login = () => {
  const navigate = useNavigate()
  let [formData, setFormData] = useState({
    email: '',
    password: ''
  })

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/login', formData);
      // Store token in localStorage
      localStorage.setItem("token", response.data.token);
      alert(response.data.message);
    } catch (e) {
      alert(e.response?.data?.message || "Login Failed");
    }
  }
  return (
    <>
    <MyNavbar />
      <div className="signinPage row d-flex justify-content-evenly m-0">
        <div className="signin-section col-sm-6 d-flex justify-content-center align-items-center ">
          <div className="signinRightBox">

            <div className='text-center p-3 fs-3'>Welcome Back</div>
            <form onSubmit={handleLogin}>
              <FloatingLabel
                controlId="floatingInput"
                label="Email address"
                className="mb-3"
              >
                <Form.Control
                  name='email'
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="name@example.com" />
              </FloatingLabel>
              <FloatingLabel
                controlId="floatingPassword"
                label="Password"
              >
                <Form.Control
                  name='password'
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Password" />
              </FloatingLabel>

              <button type='submit' className='btn btn-warning mt-5 full-width fs-5' >Login</button>
            </form>

            <div className="signinRightfooter text-center full-width pt-5">
              <p><a className="link-opacity-75 " href="#">Forgot Password?</a></p>
              <div className='d-flex gap-3 justify-content-center'>
                <span>Not have Account?</span><p><a className="link-opacity-75 " href="/signin">Sign in</a></p>
              </div>


            </div>
          </div>
        </div>

        <div className="signin-section col-sm-6 d-flex justify-content-center align-items-center ">
          <div className="signinLeftBox">
            <div className="signinLeftTitle fs-4 fw-medium ">Unlock Your Potential with Expert-Approved Templates
            </div>
            <div className="signinLeftFeatures ">
              <div className="signinLeftFeatures1 d-flex fs-5 pt-4 ">
                <span><i className="fa-solid fa-piggy-bank ">
                </i></span>
                <p className='ms-3'>Craft Your Dream Resume in Minutes
                </p>
              </div>
              <div className="signinLeftFeatures2 d-flex fs-5 ">
                <i className="fa-solid fa-rocket"></i>
                <p className='ms-3'>Take the Leap to Your Dream Career
                </p>
              </div>
            </div>
            <div className="signinLeftfooter">
              Get inspired by 200+ Free Resume Examples and Templates
            </div>

          </div>
        </div>
      </div>
    </>
  )
}

export default Login