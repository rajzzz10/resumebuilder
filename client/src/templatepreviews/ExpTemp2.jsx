import React from 'react';
import '../css/ExpTemp2.css'

const ExpTemp2 = ({ formData }) => {
  return (
    <div className="E2-container" id='resume'>
      {/* Top Center Section */}
      <div className="E2-header">
        <div className="E2-photo-container">
          {formData.personalInfo?.image && (
            <img src={formData.personalInfo.image} alt="Profile" className="E2-profile-img" />
          )}
        </div>
        <h1 className="E2-name">{formData.personalInfo?.name || 'YOUR NAME'}</h1>
        <h2 className="E2-title">{formData.personalInfo?.title || 'PROFESSIONAL TITLE'}</h2>
      </div>
          <hr />
      <div className="E2-main-content">
        {/* Left Section */}
        <div className="E2-left-section">
          <div className="E2-section">
            <h3 className="E2-section-title">Professional Summary</h3>
            <p className="E2-summary">
              {formData.profSummary?.summary || 'Your professional summary here...'}
            </p>
          </div>

          <div className="E2-section">
            <h3 className="E2-section-title">Contact Details</h3>
            <div className="E2-contact-info">
              <div className="E2-contact-item">
                <span className="E2-contact-label">Email:</span>
                <span className="E2-contact-value">{formData.personalInfo?.email || 'email@example.com'}</span>
              </div>
              <div className="E2-contact-item">
                <span className="E2-contact-label">Phone:</span>
                <span className="E2-contact-value">{formData.personalInfo?.phone || '+1 234 567 890'}</span>
              </div>
              <div className="E2-contact-item">
                <span className="E2-contact-label">Address:</span>
                <span className="E2-contact-value">{formData.personalInfo?.adress || 'Your Address'}</span>
              </div>
            </div>
          </div>

          <div className="E2-section">
            <h3 className="E2-section-title">Skills</h3>
            <div className="E2-skills-list">
              {formData.skills?.map((skill, index) => (
                <div key={index} className="E2-skill-item">
                  <span className="E2-skill-name">{skill}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Section */}
        <div className="E2-right-section">
          <div className="E2-section">
            <h3 className="E2-section-title">Experience</h3>
            {formData.experience?.map((exp, index) => (
              <div key={index} className="E2-experience-item">
                <div className="E2-experience-header">
                  <h4 className="E2-role">{exp.role || 'Position'}</h4>
                  <p className="E2-company">{exp.company || 'Company Name'}</p>
                  <p className="E2-date">{exp.startDate || '20XX'} - {exp.endDate || 'Present'}</p>
                </div>
                <p className="E2-description">{exp.description || 'Job description...'}</p>
              </div>
            ))}
          </div>

          <div className="E2-section">
            <h3 className="E2-section-title">Education</h3>
            {formData.education?.map((edu, index) => (
              <div key={index} className="E2-education-item">
                <h4 className="E2-degree">{edu.degree || 'Degree'}</h4>
                <p className="E2-institution">{edu.institution || 'Institution Name'}</p>
                <p className="E2-year">{edu.stYear || '20XX'} - {edu.endYear || 'Present'}</p>
              </div>
            ))}
          </div>

          <div className="E2-section">
            <h3 className="E2-section-title">Languages</h3>
            <div className="E2-languages-list">
              {formData.otherDetails?.languages?.map((language, index) => (
                <li key={index} className="E2-language-item" style={{listStyle : 'square'}}>{language} </li>
              ))}
            </div>
          </div>

          <div className="E2-section">
            <h3 className="E2-section-title">Interests</h3>
            <div className="E2-interests-list">
              {formData.otherDetails?.hobbies?.map((hobby, index) => (
                <li style={{listStyle:'square'}} key={index} >{hobby}</li>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExpTemp2;