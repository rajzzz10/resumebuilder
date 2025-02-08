import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faUser, 
  faGraduationCap, 
  faBriefcase, 
  faPhone, 
  faEnvelope, 
  faLocationDot,
  faCode,
  faLanguage,
  faHeart
} from '@fortawesome/free-solid-svg-icons';
import '../css/FresherTemp4.css'

const FresherTemp4 = ({ formData }) => {
  return (
    <div className="F4-container" id='resume'>
      {/* Left Section */}
      <div className="F4-left-section">
        <div className="F4-photo-container">
          {formData.personalInfo?.image && (
            <img src={formData.personalInfo.image} alt="Profile" className="F4-profile-img" />
          )}
        </div>

        <div className="F4-section">
          <h3 className="F4-section-title">
            <FontAwesomeIcon icon={faUser} className="F4-icon" />
            About Me
          </h3>
          <p className="F4-about">
            {formData.profSummary?.summary || 'Your professional summary here...'}
          </p>
        </div>

        <div className="F4-section">
          <h3 className="F4-section-title">
            <FontAwesomeIcon icon={faPhone} className="F4-icon" />
            Contact
          </h3>
          <div className="F4-contact-details">
            <p><FontAwesomeIcon icon={faPhone} className="F4-icon-small" /> {formData.personalInfo?.phone || '+0 123 456 789'}</p>
            <p><FontAwesomeIcon icon={faEnvelope} className="F4-icon-small" /> {formData.personalInfo?.email || 'email@example.com'}</p>
            <p><FontAwesomeIcon icon={faLocationDot} className="F4-icon-small" /> {formData.personalInfo?.adress || 'Your Address'}</p>
          </div>
        </div>

        <div className="F4-section">
          <h3 className="F4-section-title">
            <FontAwesomeIcon icon={faCode} className="F4-icon" />
            Skills
          </h3>
          <div className="F4-skills">
            {formData.skills?.map((skill, index) => (
              <span key={index} className="F4-skill-tag">{skill}</span>
            ))}
          </div>
        </div>

        <div className="F4-section">
          <h3 className="F4-section-title">
            <FontAwesomeIcon icon={faLanguage} className="F4-icon" />
            Languages
          </h3>
          <div className="F4-languages">
            {formData.otherDetails?.languages?.map((lang, index) => (
              <span key={index} className="F4-language-item">{lang}</span>
            ))}
          </div>
        </div>
      </div>

      {/* Right Section */}
      <div className="F4-right-section">
        <div className="F4-header">
          <h1 className="F4-name">{formData.personalInfo?.name || 'Your Name'}</h1>
          <h2 className="F4-title">{formData.personalInfo?.title || 'Professional Title'}</h2>
        </div>

        <div className="F4-section">
          <h3 className="F4-section-title">
            <FontAwesomeIcon icon={faGraduationCap} className="F4-icon" />
            Education
          </h3>
          <div className="F4-education">
            {formData.education?.map((edu, index) => (
              <div key={index} className="F4-education-item">
                <h4>{edu.degree || 'Degree Name'}</h4>
                <p className="F4-institution">{edu.institution || 'Institution Name'}</p>
                <p className="F4-year">{edu.stYear || '20XX'} - {edu.endYear || 'Present'}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="F4-section">
          <h3 className="F4-section-title">
            <FontAwesomeIcon icon={faBriefcase} className="F4-icon" />
            Projects
          </h3>
          <div className="F4-projects">
            {formData.projects?.map((project, index) => (
              <div key={index} className="F4-project-item">
                <h4>{project.name || 'Project Name'}</h4>
                <p className="F4-date">{project.startDate || '20XX'} - {project.endDate || 'Present'}</p>
                <p className="F4-description">{project.description || 'Project description'}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="F4-section">
          <h3 className="F4-section-title">
            <FontAwesomeIcon icon={faHeart} className="F4-icon" />
            Hobbies
          </h3>
          <div className="F4-hobbies">
            {formData.otherDetails?.hobbies?.map((hobby, index) => (
              <li key={index} className="F4-hobby-tag">{hobby}  </li>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FresherTemp4;