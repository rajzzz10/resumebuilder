import React from 'react';
import "../css/CertTemp2.css"

const CertTemp2 = ({ formData }) => {
  return (
    <div className="C2-container" id='resume'>
      {/* Top Section with Image, Name, Title, and Contact */}
      <div className="C2-header">
        <div className="C2-header-left">
          <div className="C2-photo-container">
            {formData.personalInfo?.image && (
              <img src={formData.personalInfo.image} alt="Profile" className="C2-profile-img" />
            )}
          </div>
          <div className="C2-name-title">
            <h1 className="C2-name">{formData.personalInfo?.name || 'YOUR NAME'}</h1>
            <h2 className="C2-title">{formData.personalInfo?.title || 'PROFESSIONAL TITLE'}</h2>
          </div>
        </div>
        <div className="C2-contact-info">
          <div className="C2-contact-item">
            <span className="C2-contact-label">Address:</span>
            <span className="C2-contact-value">{formData.personalInfo?.adress || 'Your Address'}</span>
          </div>
          <div className="C2-contact-item">
            <span className="C2-contact-label">Phone:</span>
            <span className="C2-contact-value">{formData.personalInfo?.phone || '+1 234 567 890'}</span>
          </div>
          <div className="C2-contact-item">
            <span className="C2-contact-label">Email:</span>
            <span className="C2-contact-value">{formData.personalInfo?.email || 'email@example.com'}</span>
          </div>
        </div>
      </div>

      {/* Main Content Sections */}
      <div className="C2-main-content">
        <section className="C2-section">
          <h3 className="C2-section-title">Summary</h3>
          <div className="C2-summary">
            {formData.profSummary?.summary || 'Your professional summary here...'}
          </div>
        </section>

        <section className="C2-section">
          <h3 className="C2-section-title">Skill Highlights</h3>
          <div className="C2-skills-grid">
            {formData.skills?.map((skill, index) => (
              <div key={index} className="C2-skill-item">• {skill}</div>
            ))}
          </div>
        </section>

        <section className="C2-section">
          <h3 className="C2-section-title">Experience</h3>
          {formData.experience?.map((exp, index) => (
            <div key={index} className="C2-experience-item">
              <div className="C2-experience-header">
                <h4>{exp.role || 'Position'}</h4>
                <span className="C2-date">{exp.stDate || '20XX'} to {exp.endDate || 'Present'}</span>
              </div>
              <p className="C2-company">{exp.company || 'Company Name'}</p>
              <p className="C2-description">{exp.description || 'Job description...'}</p>
            </div>
          ))}
        </section>

        <section className="C2-section">
          <h3 className="C2-section-title">Education</h3>
          {formData.education?.map((edu, index) => (
            <div key={index} className="C2-education-item">
              <h4>{edu.degree || 'Degree'}</h4>
              <p className="C2-institution">{edu.institution || 'Institution Name'}</p>
              <p className='C2-year'>{new Date(edu.stYear).toLocaleDateString()} - {edu.endYear ? new Date(edu.endYear).toLocaleDateString() : 'Present'}</p>
            </div>
          ))}
        </section>

        <section className="C2-section">
          <h3 className="C2-section-title">Languages</h3>
          <div className="C2-languages-list">
            {formData.otherDetails?.languages?.map((language, index) => (
              <div key={index} className="C2-language-item">{language}</div>
            ))}
          </div>
        </section>

        <section className="C2-section">
          <h3 className="C2-section-title">Certifications</h3>
          <div className="C2-certifications-list">
          <p className='fw-bold'>{formData.certificate?.certification}</p>
          <p>({formData.certificate?.placeOfCert})</p>
          </div>
        </section>

        <section className="C2-section">
          <h3 className="C2-section-title">Hobbies</h3>
          <div className="C2-hobbies-list">
            {formData.otherDetails?.hobbies?.map((hobby, index) => (
              <div key={index} className="C2-hobby-item">{hobby}</div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default CertTemp2;