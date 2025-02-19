import React, { useEffect, useRef, useState } from 'react';
import '../css/MultiTemp1.css';

const MultiTemp1 = ({ formData }) => {
    const [pageContents, setPageContents] = useState([]);
    const contentRef = useRef(null);

    const A4_HEIGHT_PX = 1123; // 297mm in pixels at 96 DPI
    const HEADER_HEIGHT = 150; // Reduced header height for minimalist design

    useEffect(() => {
        if (contentRef.current) {
            setTimeout(() => {
                const contentElements = Array.from(contentRef.current.children);
                console.log("Detected elements:", contentElements.map(el => el.dataset.sectionType));
    
                let currentPage = [];
                let currentHeight = HEADER_HEIGHT;
                let pages = [];
    
                contentElements.forEach((element, index) => {
                    console.log("Processing section:", element.dataset.sectionType);
    
                    const elementContent = {
                        type: element.dataset.sectionType,
                        content: element.innerHTML,
                        key: index
                    };
    
                    if (currentHeight + element.offsetHeight > A4_HEIGHT_PX) {
                        pages.push(currentPage);
                        currentPage = [elementContent];
                        currentHeight = HEADER_HEIGHT + element.offsetHeight;
                    } else {
                        currentPage.push(elementContent);
                        currentHeight += element.offsetHeight;
                    }
                });
    
                if (currentPage.length > 0) {
                    pages.push(currentPage);
                }
    
                setPageContents(pages);
            }, 100); // Delay to ensure DOM updates
        }
    }, [formData]);
    


    const PageContainer = ({ children, pageNumber }) => (
        <div className="M1-page">
            {children}
            <div className="M1-page-number">Page {pageNumber}</div>
        </div>
    );

    const Header = ({ personalInfo }) => (
        <div className="M1-header">
            <h1 className="M1-name">{personalInfo?.name || 'YOUR NAME'}</h1>
            <h2 className="M1-title">{personalInfo?.title || 'PROFESSIONAL TITLE'}</h2>
            <div className="M1-divider"></div>
        </div>
    );

    const Section = ({ title, children }) => (
        children && (
            <div className="M1-section">
                <h3 className="M1-section-title">{title}</h3>
                <div className="M1-section-content">
                    {children}
                </div>
            </div>
        )
    );

    const ContactInfo = ({ personalInfo }) => (
        <div className="M1-contact">
            <span>{personalInfo?.email}</span>
            <span className="M1-separator">•</span>
            <span>{personalInfo?.phone}</span>
            <span className="M1-separator">•</span>
            <span>{personalInfo?.adress}</span>
        </div>
    );

    const renderSectionContent = (type, content) => {
        switch (type) {
            case 'summary':
                return (
                    <Section title="Professional Summary">
                        <p>{formData.profSummary?.summary}</p>
                    </Section>
                );
            case 'experience':
                return (
                    <Section title="Experience">
                        {formData.experience?.map((exp, index) => (
                            <div key={index} className="M1-item">
                                <div className="M1-item-header">
                                    <h4>{exp.role}</h4>
                                    <span>{exp.startDate} - {exp.endDate}</span>
                                </div>
                                <p className="M1-company">{exp.company}</p>
                                <ul>
                                    {exp.description}
                                </ul>
                            </div>
                        ))}
                    </Section>
                );
            case 'projects':
                return (
                    <Section title="Projects">
                        {formData.projects?.map((project, index) => (
                            <div key={index} className="M1-item">
                                <div className="M1-item-header">
                                    <h4>{project.title}</h4>
                                    <span>{project.date}</span>
                                </div>
                                <p>{project.description}</p>
                            </div>
                        ))}
                    </Section>
                );
            case 'education':
                return (
                    <Section title="Education">
                        {formData.education?.map((edu, index) => (
                            <div key={index} className="M1-item">
                                <div className="M1-item-header">
                                    <p>{edu.degree}</p>
                                    <span>{edu.stYear} - {edu.endYear}</span>
                                </div>
                                <p>{edu.institution}</p>
                            </div>
                        ))}
                    </Section>
                );
            case 'skills':
                return (
                    <Section title="Skills">
                        {formData.skills?.map((skill, index) => (
                            <div key={index} className="M1-item">
                                <div className="M1-item-header">
                                <span className="C1-check-icon">✓</span>
                                {skill}
                                </div>
                            </div>
                        ))}
                    </Section>
                );
            // Add other sections as needed
            default:
                return null;
        }
    };

    return (
        <div className="M1-container">
            {/* Hidden content for measurement */}
            {/* Hidden content for measurement */}
            <div ref={contentRef} style={{ position: 'absolute', visibility: 'hidden' }}>
                <div data-section-type="summary">
                    <Section title="Professional Summary">
                        <p>{formData.profSummary?.summary}</p>
                    </Section>
                </div>
                <div data-section-type="experience">
                    <Section title="Experience">
                        {formData.experience?.map((exp, index) => (
                            <div key={index} className="M1-item">
                                <h4>{exp.role}</h4>
                                <span>{exp.startDate} - {exp.endDate}</span>
                                <p>{exp.company}</p>
                            </div>
                        ))}
                    </Section>
                </div>
                <div data-section-type="projects">
                    <Section title="Projects">
                        {formData.projects?.map((project, index) => (
                            <div key={index} className="M1-item">
                                <h4>{project.title}</h4>
                                <span>{project.date}</span>
                                <p>{project.description}</p>
                            </div>
                        ))}
                    </Section>
                </div>
                <div data-section-type="education">
                    <Section title="Education">
                        {formData.education?.map((edu, index) => (
                            <div key={index} className="M1-item">
                                <h4>{edu.institution}</h4>
                                <span>{edu.stYear} - {edu.endYear}</span>
                                <p>{edu.degree}</p>
                            </div>
                        ))}
                    </Section>
                </div>
            </div>


            {/* Visible pages */}
            {pageContents.map((pageContent, pageIndex) => (
                <PageContainer key={pageIndex} pageNumber={pageIndex + 1}>
                    {pageIndex === 0 && (
                        <>
                            <Header personalInfo={formData.personalInfo} />
                            <ContactInfo personalInfo={formData.personalInfo} />
                        </>
                    )}
                    <div className="M1-content">
                        {pageContent.map((section) => (
                            <div key={section.key}>
                                {renderSectionContent(section.type, section.content)}
                            </div>
                        ))}
                    </div>
                </PageContainer>
            ))}
        </div>
    );
};

export default MultiTemp1;