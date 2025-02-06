import React from 'react';
import '../css/FresherTemp2.css';

const FresherTemp2 = ({ formData }) => {
  return (
    <div className="modern-resume">
      <div className="resume-grid">
        {/* Left Column */}
        <div className="left-column">
          <div className="profile-section">
            {formData.personalInfo?.image && (
              <div className="profile-image">
                <img src={formData.personalInfo.image} alt="Profile" />
              </div>
            )}
            <h1 className="profile-name">
              {formData.personalInfo?.name || 'YOUR NAME'}
            </h1>
            <h2 className="profile-title">
              {formData.personalInfo?.title || 'Professional Title'}
            </h2>
          </div>

          <div className="profile-summary">
            <h3 className="section-heading">PROFILE SUMMARY</h3>
            <p>{formData.profSummary?.summary || 'Your professional summary here'}</p>
          </div>

          <div className="education-section">
            <h3 className="section-heading">EDUCATION</h3>
            {formData.education?.map((edu, index) => (
              <div key={index} className="education-item">
                <h4>{edu.institution || 'UNIVERSITY NAME'}</h4>
                <p>{edu.degree || 'Enter Your Degree'}</p>
                <div className="date">
                  {edu.stYear ? new Date(edu.stYear).getFullYear() : ''} - 
                  {edu.endYear ? new Date(edu.endYear).getFullYear() : 'Present'}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column */}
        <div className="right-column">
          <div className="skills-section">
            <h3 className="section-heading">PROFESSIONAL SKILLS</h3>
            <ul className="custom-list">
              {formData.skills?.map((skill, index) => (
                <li key={index}>{skill}</li>
              ))}
            </ul>
          </div>

          <div className="languages-section">
            <h3 className="section-heading">LANGUAGES</h3>
            <ul className="custom-list">
              {formData.otherDetails?.languages?.map((language, index) => (
                <li key={index}>{language}</li>
              ))}
            </ul>
          </div>

          <div className="hobbies-section">
            <h3 className="section-heading">HOBBIES & INTERESTS</h3>
            <ul className="custom-list">
              {formData.otherDetails?.hobbies?.map((hobby, index) => (
                <li key={index}>{hobby}</li>
              ))}
            </ul>
          </div>

          <div className="contact-section">
            <h3 className="section-heading">CONTACT</h3>
            <div className="contact-info">
              <p><i className="fas fa-phone"></i> {formData.personalInfo?.phone || '+0 123 456 789'}</p>
              <p><i className="fas fa-globe"></i> {formData.personalInfo?.website || 'www.yourwebsitename.com'}</p>
              <p><i className="fas fa-envelope"></i> {formData.personalInfo?.email || 'youremailaddress@mail.com'}</p>
              <p><i className="fas fa-map-marker-alt"></i> {formData.personalInfo?.address || '445, Mount Eden Road, Anytown, USA'}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FresherTemp2;