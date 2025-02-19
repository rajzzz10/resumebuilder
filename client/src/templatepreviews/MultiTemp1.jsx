import React, { useEffect, useRef, useState } from 'react';

const MultiTemp1 = ({ formData }) => {
  const [pages, setPages] = useState([]);
  const contentRef = useRef(null);

  const A4_HEIGHT = 1123; // A4 height in pixels
  const HEADER_HEIGHT = 150;
  const PAGE_PADDING = 40;
  const AVAILABLE_HEIGHT = A4_HEIGHT - (PAGE_PADDING * 2);

  useEffect(() => {
    const measureAndSplitContent = () => {
      if (!contentRef.current) return;

      // Get all content sections
      const sections = contentRef.current.querySelectorAll('.M1-section');
      let currentPage = [];
      let pages = [];
      let heightRemaining = AVAILABLE_HEIGHT - HEADER_HEIGHT; // Account for header on first page

      sections.forEach((section) => {
        const sectionHeight = section.offsetHeight;
        const sectionType = section.getAttribute('data-section-type');
        const sectionContent = section.innerHTML;

        // If section doesn't fit in current page
        if (heightRemaining < sectionHeight) {
          if (currentPage.length > 0) {
            pages.push([...currentPage]);
          }
          currentPage = [];
          heightRemaining = AVAILABLE_HEIGHT;
        }

        currentPage.push({
          type: sectionType,
          content: sectionContent,
          height: sectionHeight
        });
        heightRemaining -= sectionHeight;
      });

      if (currentPage.length > 0) {
        pages.push(currentPage);
      }

      setPages(pages);
    };

    // Delay measurement to ensure content is rendered
    setTimeout(measureAndSplitContent, 0);
  }, [formData]);

  const renderSection = (type, content) => {
    switch (type) {
      case 'summary':
        return (
          <div className="M1-section" data-section-type="summary">
            <h3 className="M1-section-title">Professional Summary</h3>
            <div className="M1-section-content">
              <p>{formData.profSummary?.summary}</p>
            </div>
          </div>
        );

      case 'experience':
        return (
          <div className="M1-section" data-section-type="experience">
            <h3 className="M1-section-title">Experience</h3>
            <div className="M1-section-content">
              {formData.experience?.map((exp, index) => (
                <div key={index} className="M1-item">
                  <div className="M1-item-header">
                    <h4>{exp.role}</h4>
                    <span>{exp.startDate} - {exp.endDate}</span>
                  </div>
                  <p className="M1-company">{exp.company}</p>
                  <div className="M1-description">{exp.description}</div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'projects':
        return (
          <div className="M1-section" data-section-type="projects">
            <h3 className="M1-section-title">Projects</h3>
            <div className="M1-section-content">
              {formData.projects?.map((project, index) => (
                <div key={index} className="M1-item">
                  <div className="M1-item-header">
                    <h4>{project.title}</h4>
                    <span>{project.date}</span>
                  </div>
                  <p>{project.description}</p>
                </div>
              ))}
            </div>
          </div>
        );

      case 'education':
        return (
          <div className="M1-section" data-section-type="education">
            <h3 className="M1-section-title">Education</h3>
            <div className="M1-section-content">
              {formData.education?.map((edu, index) => (
                <div key={index} className="M1-item">
                  <div className="M1-item-header">
                    <h4>{edu.degree}</h4>
                    <span>{edu.stYear} - {edu.endYear}</span>
                  </div>
                  <p>{edu.institution}</p>
                </div>
              ))}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  const Header = ({ personalInfo }) => (
    <div className="M1-header">
      <h1 className="M1-name">{personalInfo?.name || 'YOUR NAME'}</h1>
      <h2 className="M1-title">{personalInfo?.title || 'PROFESSIONAL TITLE'}</h2>
      <div className="M1-divider"></div>
      <div className="M1-contact">
        <span>{personalInfo?.email}</span>
        <span className="M1-separator">•</span>
        <span>{personalInfo?.phone}</span>
        <span className="M1-separator">•</span>
        <span>{personalInfo?.address}</span>
      </div>
    </div>
  );

  return (
    <div className="M1-container">
      {/* Hidden content for measurement */}
      <div ref={contentRef} style={{ position: 'absolute', visibility: 'hidden', width: '794px' }}>
        {renderSection('summary')}
        {renderSection('experience')}
        {renderSection('projects')}
        {renderSection('education')}
      </div>

      {/* Visible pages */}
      {pages.map((pageContent, pageIndex) => (
        <div key={pageIndex} className="M1-page">
          {pageIndex === 0 && <Header personalInfo={formData.personalInfo} />}
          <div className="M1-content">
            {pageContent.map((section, sectionIndex) => (
              <div
                key={sectionIndex}
                className="M1-section"
                dangerouslySetInnerHTML={{ __html: section.content }}
              />
            ))}
          </div>
          <div className="M1-page-number">Page {pageIndex + 1}</div>
        </div>
      ))}
    </div>
  );
};

export default MultiTemp1;