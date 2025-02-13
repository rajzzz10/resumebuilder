import '../css/CertTemp1.css'
import React from 'react';

const CertTemp1 = ({ formData }) => {
    return (
        <div className="C1-container" id="resume">
            {/* Header Section with Wave Background */}
            <div className="C1-header">
                <div className="C1-header-content">
                    <div className="C1-title-section">
                        <h1 className="C1-name">{formData.personalInfo?.name || 'YOUR NAME'}</h1>
                        <h2 className="C1-title">{formData.personalInfo?.title || 'PROFESSIONAL TITLE'}</h2>
                    </div>
                    <div className="C1-profile-image">
                        {formData.personalInfo?.image && (
                            <img src={formData.personalInfo.image} alt="Profile" className="C1-photo" />
                        )}
                    </div>
                </div>
                <div className="C1-wave-pattern"></div>
            </div>

            <div className="C1-main-content">
                <div className="C1-left-column">
                    {/* Profile Section */}
                    <div className="C1-section">
                        <div className="C1-section-header">
                            <span className="C1-icon">👤</span>
                            <h3 className="C1-section-title">Profile</h3>
                        </div>
                        <div className="C1-section-content">
                            <p>{formData.profSummary?.summary || 'Your professional summary here...'}</p>
                        </div>
                    </div>

                    {/* Employment History */}
                    <div className="C1-section">
                        <div className="C1-section-header">
                            <span className="C1-icon">💼</span>
                            <h3 className="C1-section-title">Employment History</h3>
                        </div>
                        <div className="C1-section-content">
                            {formData.experience?.map((exp, index) => (
                                <div key={index} className="C1-experience-item">
                                    <h6>{exp.role}</h6>
                                    <p className="C1-company">{exp.company}</p>
                                    <p className="C1-date">{exp.startDate} - {exp.endDate}</p>
                                    <ul className="C1-responsibilities">
                                        {exp.description?.split('\n').map((desc, i) => (
                                            <li key={i}>{desc}</li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Skills Section */}
                    <div className="C1-section">
                        <div className="C1-section-header">
                            <span className="C1-icon">⚙️</span>
                            <h3 className="C1-section-title">Skills</h3>
                        </div>
                        <div className="C1-section-content">
                            <div className="C1-skills-list">
                                {formData.skills?.map((skill, index) => (
                                    <div key={index} className="C1-skill-item">
                                        <span className="C1-check-icon">✓</span>
                                        {skill}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="C1-section">
                        <div className="C1-section-header">
                            <span className="C1-icon">📋</span>
                            <h3 className="C1-section-title">Certifications </h3>
                        </div>
                        <div className="C1-section-content">
                            <span className='fw-bold'>{formData.certificate?.certification}</span> <span> - </span>
                            <span>{formData.certificate?.placeOfCert}</span>
                        </div>
                    </div>
                </div>

                <div className="C1-right-column">
                    {/* Contact Information */}
                    <div className="C1-contact-info">
                        <div className="C1-contact-item">
                            <span className="C1-contact-icon">✉️</span>
                            <span>{formData.personalInfo?.email}</span>
                        </div>
                        <div className="C1-contact-item">
                            <span className="C1-contact-icon">📱</span>
                            <span>{formData.personalInfo?.phone}</span>
                        </div>
                        <div className="C1-contact-item">
                            <span className="C1-contact-icon">📍</span>
                            <span>{formData.personalInfo?.adress}</span>
                        </div>
                    </div>

                    {/* Education Section */}
                    <div className="C1-section">
                        <div className="C1-section-header">
                            <span className="C1-icon">🎓</span>
                            <h3 className="C1-section-title">Education</h3>
                        </div>
                        <div className="C1-section-content">
                            {formData.education?.map((edu, index) => (
                                <div key={index} className="C1-education-item">
                                    <h6>{edu.institution}</h6>
                                    <p>{edu.degree}</p>
                                    <p className="C1-date">{edu.stYear} - {edu.endYear}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Languages Section */}
                    <div className="C1-section">
                        <div className="C1-section-header">
                            <span className="C1-icon">🌐</span>
                            <h3 className="C1-section-title">Languages</h3>
                        </div>
                        <div className="C1-section-content">
                            {formData.otherDetails?.languages?.map((lang, index) => (
                                <div key={index} className="C1-language-item">
                                    <span className="C1-language-name">{lang}</span>
                                    <div className="C1-language-level-bar">
                                        <div className="C1-level-fill"></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="C1-section">
                        <div className="C1-section-header">
                            <span className="C1-icon">🎨</span>
                            <h3 className="C1-section-title">Hobbies</h3>
                        </div>
                        <div className="C1-section-content">
                            {formData.otherDetails?.hobbies?.map((hobby, index) => (
                                <div key={index} className="C1-hobby-item">
                                    <li style={{listStyle : 'square' , paddingRight : '3px'}} className="C1-language-name">{hobby}</li>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CertTemp1;