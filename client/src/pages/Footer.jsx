import React from 'react'
import '../css/footer.css'

const Footer = () => {
  return (
    <footer className="row row-cols-1 row-cols-sm-2 row-cols-md-4 py-5 m-0 border-top">
      <div className="col d-flex pb-2 align-items-center justify-content-center gap-3 link-dark text-decoration-none">
        <p className="text-light text-opacity-75">ResumeAi © 2024</p>
      </div>
      <div className="col pb-4">
        <h5 className='text-light text-opacity-75 footer-items'> Connect with us on Social Media</h5>
        <ul className="nav social-icons flex-column">
          <li className="nav-item mb-2 ">
            <div href="#" className="nav-link p-0 pt-2  link-opacity-50 link-light gap-3 d-flex ">
              <a href="#" className='link-opacity-50 link-light'><i className="fa-brands fa-facebook"> </i></a>
              <a href="#" className='link-opacity-50 link-light'><i className="fa-brands fa-instagram"></i></a>
              <a href="#" className='link-opacity-50 link-light'><i className="fa-brands fa-linkedin"></i></a>
            </div>
          </li>
          <li className="nav-item mb-2 ">
            <div href="#" className="nav-link p-0  pt-2 ps-2 link-opacity-50 link-light d-flex gap-3">
              <a href="#" className='link-opacity-50 link-light'><i className="fa-brands fa-x-twitter"></i></a>
              <a href="#" className='link-opacity-50 link-light'><i className="fa-brands fa-youtube"></i></a>
            </div>
          </li>
        </ul>
      </div>

      <div className="col pb-4">
        <h5 className='text-light text-opacity-75 footer-items'>Our Company</h5>
        <ul className="nav flex-column ">
          <li className="nav-item mb-2"><a href="#" className="nav-link p-0 footer-items link-opacity-50 link-light">About Us</a></li>
          <li className="nav-item mb-2"><a href="#" className="nav-link p-0 footer-items link-opacity-50 link-light">Blogs</a></li>
          <li className="nav-item mb-2"><a href="#" className="nav-link p-0 footer-items link-opacity-50 link-light">FAQ</a></li>
          <li className="nav-item mb-2"><a href="#" className="nav-link p-0 footer-items link-opacity-50 link-light">Contact Us</a></li>
        </ul>
      </div>

      <div className="col pb-4">
        <h5 className='text-light text-opacity-75 footer-items'>Terms & Conditions</h5>
        <ul className="nav flex-column footer-items">
          <li className="nav-item mb-2"><a href="#" className="nav-link footer-items p-0 link-opacity-50 link-light">Terms of Service</a></li>
          <li className="nav-item mb-2"><a href="#" className="nav-link footer-items p-0 link-opacity-50 link-light">Privacy</a></li>
        </ul>
      </div>
    </footer>

  )
}

export default Footer