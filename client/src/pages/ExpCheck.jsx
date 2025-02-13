import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCheck } from '../context/checkContext'; // Import the context
import '../css/expCheck.css';
import MyNavbar from './Navbar';
import Footer from './Footer';

const ExpCheck = () => {
  const { updateCheckState } = useCheck(); // Access context
  const navigate = useNavigate();
  const [selectedExp, setSelectedExp] = useState('');

  const handleFormRedirect = () => {
    // Navigate to the appropriate template page based on experience selection
    if (selectedExp === 'fresher') {
      updateCheckState({ hasExperience: false, hasCertification: false });
      navigate('/choose-template/fresher');
    } else if (selectedExp === 'mid') {
      updateCheckState({ hasExperience: true, hasCertification: false });
      navigate('/choose-template/mid-level');
    } else if (selectedExp === 'expert') {
      updateCheckState({ hasExperience: true, hasCertification: true });
      navigate('/choose-template/expert');
    }
  };

  const fresherDisc = () => setSelectedExp('fresher');
  const midDisc = () => setSelectedExp('mid');
  const expertDisc = () => setSelectedExp('expert');

  const getDescription = () => {
    switch (selectedExp) {
      case 'fresher':
        return '<i>No prior experience. We\'ll help you craft a resume with a strong focus on skills, education, and projects.</i>';
      case 'mid':
        return '<i>2-5 years of experience. We\'ll emphasize your work history, achievements, and technical skills.</i>';
      case 'expert':
        return '<i>5+ years of experience with relevant certifications. We\'ll showcase your expertise, leadership, and industry impact.</i>';
      default:
        return '';
    }
};


  return (
    <>
      <MyNavbar />
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

              {/* Expert Button */}
              <button
                className={`btn ${selectedExp === 'expert' ? 'btn-dark' : 'btn-outline-dark'}`}
                onClick={expertDisc}
              >
                Expert
              </button>
            </div>
          </div>

          {/* Description Section */}
          <div
            className="description text-center"
            dangerouslySetInnerHTML={{ __html: getDescription() }}
          ></div>

          <div className="d-flex justify-content-center align-items-center m-4">
            <button className="btn btn-warning" onClick={handleFormRedirect} disabled={!selectedExp}>
              Submit
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ExpCheck;
