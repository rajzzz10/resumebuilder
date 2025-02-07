import React from 'react';
import "../css/FresherTemp1.css"

const FresherTemp1 = ({ formData }) => {
  return (
    <div className="F1resume-container" id='resume'>
      {/* Left Section */}
      <div className="F1left-section">
        <div className="F1photo-container">
          {formData.personalInfo?.image && (
            <img 
              src={formData.personalInfo.image} 
              alt="Profile"
              className="F1profile-photo"
            />
          )}
        </div>

        <div className="F1contact-info">
          <h3 className="F1section-title">Contact Info</h3>
          <div className="F1contact-item">
            <i className="fas fa-envelope"></i>
            <span>{formData.personalInfo?.email || 'example@email.com'}</span>
          </div>
          <div className="F1contact-item">
            <i className="fas fa-phone"></i>
            <span>{formData.personalInfo?.phone || '+1 234 567 890'}</span>
          </div>
          <div className="F1contact-item">
            <i className="fas fa-map-marker-alt"></i>
            <span>{formData.personalInfo?.adress || 'City, Country'}</span>
          </div>
        </div>

        <div className="F1languages">
          <h3 className="F1section-title">Languages</h3>
          <div className="F1language-grid">
            {formData.otherDetails?.languages?.map((lang, index) => (
              <span key={index} className="F1language-item">{lang}</span>
            ))}
          </div>
        </div>

        <div className="F1skills">
          <h3 className="F1section-title">Skills</h3>
          <div className="F1skills-grid">
            {formData.skills?.map((skill, index) => (
              <span key={index} className="F1skill-item">{skill}</span>
            ))}
          </div>
        </div>

        <div className="F1interests">
          <h3 className="F1section-title">Interests</h3>
          <div className="F1interests-grid">
            {formData.otherDetails?.hobbies?.map((hobby, index) => (
              <span key={index} className="F1interest-item">{hobby}</span>
            ))}
          </div>
        </div>
      </div>

      {/* Right Section */}
      <div className="F1right-section">
        <div className="F1header">
          <h1 className="F1name">{formData.personalInfo?.name || 'Your Name'}</h1>
          <h2 className="F1job-title">{formData.personalInfo?.title || 'Professional Title'}</h2>
        </div>

        <div className="F1about">
          <h3 className="F1section-title">Career Objective</h3>
          <p>{formData.profSummary?.summary || 'Your career objective here...'}</p>
        </div>

        <div className="F1education">
          <h3 className="F1section-title">Academic Background</h3>
          {formData.education?.map((edu, index) => (
            <div key={index} className="F1education-item">
              <h4>{edu.degree || 'Degree Name'}</h4>
              <p className="F1institution">{edu.institution || 'Institution Name'}</p>
              <p className="F1education-date">
                {edu.stYear || '20XX'} - {edu.endYear || 'Present'}
              </p>
            </div>
          ))}
        </div>

        <div className="F1projects">
          <h3 className="F1section-title">Internships & Projects</h3>
          {formData.projects?.map((project, index) => (
            <div key={index} className="F1project-item">
              <h4>{project.name || 'Project Name'}</h4>
              <p className="F1project-date">
                {project.startDate || '20XX'} - {project.endDate || 'Present'}
              </p>
              <p className="F1project-description">{project.description || 'Project description'}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FresherTemp1;