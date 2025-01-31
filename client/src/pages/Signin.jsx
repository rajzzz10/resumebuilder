import React, { useEffect, useState } from 'react'
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import '../css/signin.css';
import '../App.css'
import Footer from './Footer';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';


const Signin = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  })
  const navigate = useNavigate()

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  // Handle Form Submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api/register", formData);
      alert(response.data.message)
      navigate('/login')
    } catch (error) {
      alert(error.response?.data?.message || "Registration Failed");
    }
  };

  return (
    <>
      <div className="signinPage row d-flex justify-content-evenly m-0">
        <div className="signin-section col-sm-6 d-flex justify-content-center align-items-center ">
          <div className="signinRightBox">
            <div className='text-center p-3 fs-3'>Create an Account</div>
            <Form onSubmit={handleSubmit}>
              <FloatingLabel
                controlId="floatingInput"
                label="Your Name"
                className="mb-3"
                
              >
                <Form.Control
                name="name" 
                  type="text"
                  placeholder="Enter your Name"
                  value={formData.name}
                  onChange={handleChange} />
              </FloatingLabel>
              <FloatingLabel
                controlId="floatingInput2"
                label="Email address"
                className="mb-3"
              >
                <Form.Control type="email" name="email"  value={formData.email}
                  onChange={handleChange} placeholder="name@example.com" />
              </FloatingLabel>
              <FloatingLabel controlId="floatingPassword" label="Password">
                <Form.Control type="password" name="password"  value={formData.password}
                  onChange={handleChange} placeholder="Password" />
              </FloatingLabel>

              <button type='submit' className='btn btn-warning mt-5 full-width fs-5' >Signin</button>
            </Form>


            <div className='d-flex gap-3 justify-content-center mt-5'>
              <span>Already have an Account</span><p><a className="link-opacity-75 " href="/login">Login</a></p>
            </div>
          </div>
        </div>

        <div className="signin-section d-flex justify-content-center col-sm-6 align-items-center ">
          <div className="signinLeftBox">
            <div className="signinLeftTitle fs-4 fw-medium ">Unlock Your Potential with Expert-Approved Templates
            </div>
            <div className="signinLeftFeatures ">
              <div className="signinLeftFeatures1 d-flex fs-5 pt-3 ">
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
              Get inspired by 50+ Free Resume Examples and Templates
            </div>

          </div>
        </div>
      </div>
    </>
  )
}

export default Signin