import React from 'react';
import '../css/ExpTemp3.css'

const ExpTemp3 = ({ formData }) => {
  return (
    <div className="E3-container" id='resume'>
      {/* Left Section - Dark Background */}
      <div className="E3-left-section">
        <div className="E3-photo-container">
          {formData.personalInfo?.image && (
            <img src={formData.personalInfo.image} alt="Profile" className="E3-profile-img" />
          )}
        </div>

        <div className="E3-section">
          <h3 className="E3-section-title">EDUCATION</h3>
          <div className="E3-education">
            {formData.education?.map((edu, index) => (
              <div key={index} className="E3-education-item">
                <h6>{edu.degree || 'Degree'}</h6>
                <p className="E3-institution">{edu.institution || 'Name Of Your University'}</p>
                <p className="E3-year">{edu.stYear || '20XX'} - {edu.endYear || 'Present'}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="E3-section">
          <h3 className="E3-section-title">Hobbies</h3>
          <div className="E3-references">
          {formData.otherDetails?.hobbies?.map((hobby, index) => (
              <li style={{listStyle:'square'}}><span key={index} className="E3-skill-item">{hobby}</span></li>
            ))}
          </div>
        </div>

        <div className="E3-section">
          <h3 className="E3-section-title">Languages Known</h3>
          <div className="E3-references">
          {formData.otherDetails?.languages?.map((lang, index) => (
              <li style={{listStyle:'square'}}><span key={index} className="E3-skill-item">{lang}</span></li>
            ))}
          </div>
        </div>

        <div className="E3-contact-section">
          <div className="E3-contact-item">
            <div className="E3-contact-label">Phone</div>
            <div className="E3-contact-value">{formData.personalInfo?.phone || '+000 123 456 789'}</div>
          </div>
          <div className="E3-contact-item">
            <div className="E3-contact-label">Email</div>
            <div className="E3-contact-value">{formData.personalInfo?.email || 'urname@gmail.com'}</div>
          </div>
          <div className="E3-contact-item">
            <div className="E3-contact-label">Address</div>
            <div className="E3-contact-value">{formData.personalInfo?.adress || 'Your Street Address, City/Zip Code'}</div>
          </div>
        </div>
      </div>

      {/* Right Section - White Background */}
      <div className="E3-right-section">
        <div className="E3-header">
          <h1 className="E3-name">{formData.personalInfo?.name || 'YOUR NAME'} </h1>
          <h2 className="E3-title">{formData.personalInfo?.title || 'PROFESSIONAL TITLE'}</h2>
        </div>

        <div className="E3-section">
          <h3 className="E3-section-title">ABOUT ME</h3>
          <p className="E3-about-text">
            {formData.profSummary?.summary || 'Your professional summary here...'}
          </p>
        </div>

        <div className="E3-section">
          <h3 className="E3-section-title">WORK EXPERIENCE</h3>
          <div className="E3-experience">
            {formData.experience?.map((exp, index) => (
              <div key={index} className="E3-experience-item">
                <div className="E3-experience-header">
                  <span className="E3-date">{exp.startDate || '20XX'}-{exp.endDate || 'Present'}</span>
                  <div className="E3-position-details">
                    <h4>{exp.role || 'JOB POSITION HERE'}</h4>
                    <p className="E3-company">{exp.company || 'Company Name'} </p>
                  </div>
                </div>
                <p className="E3-description">{exp.description || 'Job description here...'}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="E3-section">
          <h3 className="E3-section-title">SOFTWARE SKILL</h3>
          <div className="E3-skills">
            {formData.skills?.map((skill, index) => (
              <div key={index} className="E3-skill-item">
                <span className="E3-skill-name">{skill}</span>
                <div className="E3-skill-bar">
                  <div className="E3-skill-level"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExpTemp3;