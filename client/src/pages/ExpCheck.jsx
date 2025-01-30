import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/expCheck.css';

const ExpCheck = () => {
  const navigate = useNavigate();
 
  const [selectedExp, setSelectedExp] = useState('');

  const handleFormRedirect = () => {
    navigate('/choose-template');
  };

  const fresherDisc = () => {
    setSelectedExp('fresher');
  };

  const midDisc = () => {
    setSelectedExp('mid');
  };

  const seniorDisc = () => {
    setSelectedExp('senior');
  };

  // Dynamic description based on selected experience level
  const getDescription = () => {
    switch (selectedExp) {
      case 'fresher':
        return '<i>Typically less than 6 months experience. We\'ve got you! We\'ll help you find relevant experience to fill in your resume.</i>';
      case 'mid':
        return '<i>2-10 years of experience. Great! We\'ll highlight your achievements and skills to make your resume stand out.</i>';
      case 'senior':
        return '<i>More than 10 years of experience. Excellent! We\'ll showcase your expertise and leadership skills to demonstrate your value.</i>';
      default:
        return '';
    }
  };

  return (
    <div className='d-flex justify-content-center align-items-center workExpdiv'>
      <div className="workExp">
        <div className="expLogo text-center"><i className="fa-solid fa-briefcase fa-2xl " style={{ color: 'black' }}></i></div>
        <div className="text-center display-6 fw-bold pt-4">What's your level of professional experience?</div>
        <div className="expQn h4 text-center">Share your background to get tailored guidance.</div>

        <div className="btnGrpExp p-4 d-flex justify-content-center align-items-center w-100">
          <div className="btnGrp d-flex justify-content-around w-50">
            {/* Fresher Button */}
            <button
              className={`btn ${selectedExp === 'fresher' ? 'btn-dark' : 'btn-outline-dark'}`}
              onClick={fresherDisc}
            >
              Fresher
            </button>

            {/* Mid-Level Button */}
            <button
              className={`btn ${selectedExp === 'mid' ? 'btn-dark' : 'btn-outline-dark'}`}
              onClick={midDisc}
            >
              Mid-Level
            </button>

            {/* Senior Button */}
            <button
              className={`btn ${selectedExp === 'senior' ? 'btn-dark' : 'btn-outline-dark'}`}
              onClick={seniorDisc}
            >
              Senior
            </button>
          </div>
        </div>

        {/* Description Section */}
        <div
          className="description text-center"
          dangerouslySetInnerHTML={{ __html: getDescription() }}
        ></div>

        <div className="d-flex justify-content-center align-items-center m-4">
          <button className="btn btn-warning" onClick={handleFormRedirect}>
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExpCheck;
