import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MyNavbar from '../pages/Navbar';
import Home from '../pages/Home';
import Signin from '../pages/Signin';
import Login from '../pages/Login';
import Form from '../pages/Form';
import ChooseTemp from '../pages/ChooseTemp';
import ResumePreview from '../pages/ResumePreview';
import ExpCheck from '../pages/ExpCheck';


const AppRoutes = () => {
  return (
    <BrowserRouter>
      <MyNavbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path='/resume-preview' element={<ResumePreview/>}/>
        <Route path="/signin" element={<Signin />} />
        <Route path="/login" element={<Login />} />
        <Route path="/form" element={<Form />} />
        <Route path='/exp-check' element={<ExpCheck/>}/>
        <Route path='/choose-template' element={<ChooseTemp/>} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
