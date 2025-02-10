import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faPhone, 
  faEnvelope, 
  faLocationDot,
  faBriefcase,
  faGraduationCap,
  faCode,
  faLanguage,
  faUser,
  faHeart
} from '@fortawesome/free-solid-svg-icons';
import '../css/ExpTemp1.css'

const ExpTemp1 = ({ formData }) => {
  return (
    <div className="E1-container" id='resume'>
      {/* Left Section */}
      <div className="E1-left-section">
        <div className="E1-photo-container">
          {formData.personalInfo?.image && (
            <img src={formData.personalInfo.image} alt="Profile" className="E1-profile-img" />
          )}
        </div>

        <h1 className="E1-name">{formData.personalInfo?.name || 'Your Name'}</h1>
        <h2 className="E1-title">{formData.personalInfo?.title || 'Professional Title'}</h2>

        <div className="E1-section">
          <h3 className="E1-section-title">CONTACT</h3>
          <div className="E1-contact-details">
            <div className="E1-contact-item">
              <FontAwesomeIcon icon={faPhone} className="E1-icon" />
              <p>{formData.personalInfo?.phone || '+0 123 456 789'}</p>
            </div>
            <div className="E1-contact-item">
              <FontAwesomeIcon icon={faEnvelope} className="E1-icon" />
              <p>{formData.personalInfo?.email || 'email@example.com'}</p>
            </div>
            <div className="E1-contact-item">
              <FontAwesomeIcon icon={faLocationDot} className="E1-icon" />
              <p>{formData.personalInfo?.adress || 'Your Address'}</p>
            </div>
          </div>
        </div>

        <div className="E1-section">
          <h3 className="E1-section-title">PROFILE</h3>
          <p className="E1-profile-text">
            {formData.profSummary?.summary || 'Your professional summary here...'}
          </p>
        </div>
      </div>

      {/* Right Section */}
      <div className="E1-right-section">
        <div className="E1-section">
          <div className="E1-section-header">
            <h3 className="E1-section-title">WORK EXPERIENCE</h3>
          </div>
          <div className="E1-experience">
            {formData.experience?.map((exp, index) => (
              <div key={index} className="E1-experience-item">
                <h4>{exp.position || 'Position Name'}</h4>
                <div className="E1-date">{exp.startDate || '20XX'} - {exp.endDate || 'Present'}</div>
                <p className="E1-company">{exp.company || 'Company Name'}</p>
                <p className="E1-description">{exp.description || 'Job description'}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="E1-section">
          <div className="E1-section-header">
            <h3 className="E1-section-title">EDUCATION</h3>
          </div>
          <div className="E1-education">
            {formData.education?.map((edu, index) => (
              <div key={index} className="E1-education-item">
                <h4>{edu.institution || 'Institution Name'}</h4>
                <div className="E1-date">{edu.stYear || '20XX'} - {edu.endYear || 'Present'}</div>
                <p className="E1-degree">{edu.degree || 'Degree Name'}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="E1-section">
          <div className="E1-section-header">
            <h3 className="E1-section-title">SKILLS</h3>
          </div>
          <div className="E1-skills">
            {formData.skills?.map((skill, index) => (
              <span key={index} className="E1-skill-item">{skill}</span>
            ))}
          </div>
        </div>

        <div className="E1-section">
          <div className="E1-section-header">
            <h3 className="E1-section-title">LANGUAGES</h3>
          </div>
          <div className="E1-skills">
            {formData.otherDetails?.languages?.map((lang, index) => (
              <div key={index} className="E1-language-item">
                <span className="E1-skill-item">{lang.name || lang}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="E1-section">
          <div className="E1-section-header">
            <h3 className="E1-section-title">HOBBIES</h3>
          </div>
          <div className="E1-skills">
            {formData.otherDetails?.hobbies?.map((hobby, index) => (
              <span key={index} className="E1-skill-item">{hobby}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExpTemp1;