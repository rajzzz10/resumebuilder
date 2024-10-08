import React from 'react'
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import '../css/signin.css';
import '../App.css'


const Login = () => {
  return (
    <>
      <div className="signinPage row d-flex justify-content-evenly m-0">
        <div className="signin-section col-sm-6 d-flex justify-content-center align-items-center ">
          <div className="signinRightBox">

            <div className='text-center p-3 fs-3'>Welcome Back</div>
            <FloatingLabel
              controlId="floatingInput"
              label="Email address"
              className="mb-3"
            >
              <Form.Control type="email" placeholder="name@example.com" />
            </FloatingLabel>
            <FloatingLabel controlId="floatingPassword" label="Password">
              <Form.Control type="password" placeholder="Password" />
            </FloatingLabel>

            <button className='btn btn-warning mt-5 full-width fs-5' >Login</button>

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