// FresherTemp3.jsx
import React from 'react';
import "../css/FresherTemp3.css"

const FresherTemp3 = ({ formData }) => {
  return (
    <div className="F3resume-container" id='resume'>
      {/* Left Column (Main Content) */}
      <div className="F3left-section">
        <div className="F3header">
          <h1 className="F3name">{formData.personalInfo?.name || 'Your Name'}</h1>
          <h2 className="F3job-title">{formData.personalInfo?.title || 'Professional Title'}</h2>
        </div>

        <div className="F3summary">
          <h3 className="F3section-title">Professional Summary</h3>
          <p>{formData.profSummary?.summary || 'Your professional summary here...'}</p>
        </div>

        <div className="F3education">
          <h3 className="F3section-title">Education</h3>
          {formData.education?.map((edu, index) => (
            <div key={index} className="F3education-item">
              <h4>{edu.degree || 'Degree Name'}</h4>
              <p className="F3institution">{edu.institution || 'Institution Name'}</p>
              <p className="F3education-date">
                {edu.stYear || '20XX'} - {edu.endYear || 'Present'}
              </p>
            </div>
          ))}
        </div>

        <div className="F3projects">
          <h3 className="F3section-title">Projects</h3>
          {formData.projects?.map((project, index) => (
            <div key={index} className="F3project-item">
              <h4>{project.name || 'Project Name'}</h4>
              <p className="F3project-date">
                {project.startDate || '20XX'} - {project.endDate || 'Present'}
              </p>
              <p className="F3project-description">{project.description || 'Project description'}</p>
              <hr />
            </div>
          ))}
        </div>

        <div className="F3skills">
          <h3 className="F3section-title">Skills</h3>
          <ul className="F3skills-list">
            {formData.skills?.map((skill, index) => (
              <li key={index}>{skill}</li>
            ))}
          </ul>
        </div>
      </div>

      {/* Right Column (Contact & Personal Info) */}
      <div className="F3right-section">
        <div className="F3photo-container">
          {formData.personalInfo?.image && (
            <img
              src={formData.personalInfo.image}
              alt="Profile"
              className="F3profile-photo"
            />
          )}
        </div>

        <div className="F3contact-info">
          <h3 className="F3section-title">Contact Details</h3>
          <p><i className="fas fa-phone"></i> {formData.personalInfo?.phone || '+0 123 456 789'}</p>
          <p><i className="fas fa-envelope"></i> {formData.personalInfo?.email || 'youremailaddress@mail.com'}</p>
          <p><i className="fas fa-map-marker-alt"></i> {formData.personalInfo?.adress || '445, Mount Eden Road, Anytown, USA'}</p>
        </div>

        <div className="F3languages">
          <h3 className="F3section-title">Languages</h3>
          <ul className="F3list-unstyled">
            {formData.otherDetails?.languages?.map((lang, index) => (
              <li key={index}>{lang}</li>
            ))}
          </ul>
        </div>

        <div className="F3hobbies">
          <h3 className="F3section-title">Hobbies</h3>
          <ul className="F3list-unstyled">
            {formData.otherDetails?.hobbies?.map((hobby, index) => (
              <li key={index}>{hobby}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default FresherTemp3;