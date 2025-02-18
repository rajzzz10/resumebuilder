import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MyNavbar from '../pages/Navbar';
import Home from '../pages/Home';
import Signin from '../pages/Signin';
import Login from '../pages/Login';
import Form from '../pages/Form';
import ResumePreview from '../pages/ResumePreview';
import ExpCheck from '../pages/ExpCheck';
import { CheckProvider } from '../context/checkContext';
import FresherTemplate from '../pages/FresherTemplate';
import ExpTemplate from '../pages/ExpTemplate';
import CertTemplate from '../pages/CertTemplate';
// import MultiPage from '../pages/MultiPage';

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <CheckProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path='/resume-preview' element={<ResumePreview/>}/>
        <Route path="/signin" element={<Signin />} />
        <Route path="/login" element={<Login />} />
        <Route path="/form" element={<Form />} />
        <Route path='/exp-check' element={<ExpCheck/>}/>
        <Route path='/choose-template/fresher' element={<FresherTemplate/>} />
        <Route path='/choose-template/mid-level' element={<ExpTemplate/>} />
        <Route path='/choose-template/expert' element={<CertTemplate/>} />
        {/* <Route path='/multipage-temp' element={<MultiPage />} /> */}
      </Routes>
      </CheckProvider>
    </BrowserRouter>
  );
};

export default AppRoutes;
