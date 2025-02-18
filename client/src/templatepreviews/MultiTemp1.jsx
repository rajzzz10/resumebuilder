import React from 'react';
import '../css/MultiTemp1.css';

const MultiTemp1 = ({ formData }) => {
    // Helper function to check if a section has content
    const hasContent = (section) => {
        if (!section) return false;
        if (Array.isArray(section)) return section.length > 0;
        if (typeof section === 'object') return Object.keys(section).length > 0;
        return !!section;
    };

    // Splitting content into pages dynamically
    const createPages = () => {
        const sections = [];

        // Add sections based on the available formData
        if (formData.profSummary?.summary) {
            sections.push(
                <div className="M1-section">
                    <h3 className="M1-section-title">Professional Summary</h3>
                    <p className="M1-summary">{formData.profSummary.summary}</p>
                </div>
            );
        }

        if (hasContent(formData.personalInfo)) {
            sections.push(
                <div className="M1-section">
                    <h3 className="M1-section-title">Contact Information</h3>
                    <div className="M1-contact-grid">
                        {formData.personalInfo.email && (
                            <div className="M1-contact-item">
                                <span className="M1-icon">✉️</span>
                                <span>{formData.personalInfo.email}</span>
                            </div>
                        )}
                        {formData.personalInfo.phone && (
                            <div className="M1-contact-item">
                                <span className="M1-icon">📱</span>
                                <span>{formData.personalInfo.phone}</span>
                            </div>
                        )}
                        {formData.personalInfo.address && (
                            <div className="M1-contact-item">
                                <span className="M1-icon">📍</span>
                                <span>{formData.personalInfo.address}</span>
                            </div>
                        )}
                    </div>
                </div>
            );
        }

        if (hasContent(formData.projects)) {
            sections.push(
                <div className="M1-section">
                    <h3 className="M1-section-title">Projects</h3>
                    {formData.projects.map((project, index) => (
                        <div key={index} className="M1-project-item">
                            <h4 className="M1-project-title">{project.title}</h4>
                            <p className="M1-project-date">{project.date}</p>
                            <p className="M1-project-description">{project.description}</p>
                        </div>
                    ))}
                </div>
            );
        }

        if (hasContent(formData.education)) {
            sections.push(
                <div className="M1-section">
                    <h3 className="M1-section-title">Education</h3>
                    {formData.education.map((edu, index) => (
                        <div key={index} className="M1-education-item">
                            <h4>{edu.institution}</h4>
                            <p>{edu.degree}</p>
                            <p className="M1-date">{edu.stYear} - {edu.endYear}</p>
                        </div>
                    ))}
                </div>
            );
        }

        if (hasContent(formData.skills)) {
            sections.push(
                <div className="M1-section">
                    <h3 className="M1-section-title">Skills</h3>
                    <div className="M1-skills-grid">
                        {formData.skills.map((skill, index) => (
                            <div key={index} className="M1-skill-item">
                                <span className="M1-check">✓</span>
                                {skill}
                            </div>
                        ))}
                    </div>
                </div>
            );
        }

        const pages = [];
        let currentPage = [];
        let height = 0;
        const maxHeight = 1000; // Approximate max height per A4 page

        sections.forEach((section, index) => {
            if (height + 200 > maxHeight) {
                pages.push([...currentPage]);
                currentPage = [];
                height = 0;
            }
            currentPage.push(section);
            height += 200;
        });

        if (currentPage.length > 0) {
            pages.push([...currentPage]);
        }

        return pages;
    };

    return (
        <div className="M1-wrapper">
            {createPages().map((pageContent, index) => (
                <div key={index} className="M1-page">
                    {index === 0 && (
                        <div className="M1-header">
                            <h1 className="M1-name">{formData.personalInfo?.name || 'YOUR NAME'}</h1>
                            <h2 className="M1-job-title">{formData.personalInfo?.title || 'PROFESSIONAL TITLE'}</h2>
                        </div>
                    )}
                    <div className="M1-content">{pageContent}</div>
                </div>
            ))}
        </div>
    );
};

export default MultiTemp1;
