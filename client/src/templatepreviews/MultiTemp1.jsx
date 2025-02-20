import React, { useEffect, useRef, useState } from 'react';
import '../css/MultiTemp1.css'
const MultiTemp1 = ({ formData }) => {
  const [pages, setPages] = useState([]);
  const containerRef = useRef(null);
  
  const A4_WIDTH = 794;
  const A4_HEIGHT = 1123;
  const PAGE_PADDING = 40;
  const HEADER_HEIGHT = 150;
  const CONTENT_WIDTH = A4_WIDTH - (PAGE_PADDING * 2);
  const CONTENT_HEIGHT = A4_HEIGHT - (PAGE_PADDING * 2);

  const measureTextHeight = (text, width, styles) => {
    const measurer = document.createElement('div');
    Object.assign(measurer.style, {
      width: `${width}px`,
      position: 'absolute',
      visibility: 'hidden',
      ...styles
    });
    measurer.innerHTML = text;
    document.body.appendChild(measurer);
    const height = measurer.offsetHeight;
    document.body.removeChild(measurer);
    return height;
  };

  const splitProjectOrExperience = (item, type) => {
    const elements = [];
    
    // Split header (title/role, dates)
    const headerContent = `
      <div class="M1-item-header">
        <h4>${type === 'experience' ? `${item.role} - ${item.company}` : item.name }</h4>
        <span>${type === 'experience' ? `${item.stDate} - ${item.endDate}` : 
          `${item.startDate || '20XX'} - ${item.endDate || 'Present'}`}</span>
      </div>
    `;
    const headerHeight = measureTextHeight(headerContent, CONTENT_WIDTH, {
      marginBottom: '5px'
    });
    elements.push({
      content: headerContent,
      height: headerHeight,
      type: `${type}-header`,
      isStart: true
    });

    // Company/subtitle (for experience)
    // if (type === 'experience' && item.company) {
    //   const companyContent = `<p class="M1-company">( Company/Instituition name - ${item.company} )</p>`;
    //   const companyHeight = measureTextHeight(companyContent, CONTENT_WIDTH );
    //   elements.push({
    //     content: companyContent,
    //     height: companyHeight,
    //     type: `${type}-company`
    //   });
    // }

    // Split description into paragraphs
    const description = item.description || '';
    const paragraphs = description.split('\n').filter(p => p.trim());

    paragraphs.forEach((paragraph, idx) => {
      const paraContent = `<p class="M1-description">${paragraph}</p>`;
      const paraHeight = measureTextHeight(paraContent, CONTENT_WIDTH,{
        marginBottom: idx === paragraphs.length - 1 ? '20px' : '10px'
      });
      elements.push({
        content: paraContent,
        height: paraHeight,
        type: `${type}-description`,
        isEnd: idx === paragraphs.length - 1
      });
    });

    return elements;
  };

  const splitContentIntoLines = (content, type, styles = {}) => {
    const elements = [];
    
    if (!content) return elements;

    if (type === 'experience' || type === 'projects') {
      content.forEach(item => {
        const splitElements = splitProjectOrExperience(item, type);
        elements.push(...splitElements);
      });
    } else if (Array.isArray(content)) {
      content.forEach(item => {
        const itemContent = renderItem(item, type);
        const height = measureTextHeight(itemContent, CONTENT_WIDTH, styles);
        elements.push({ content: itemContent, height, type });
      });
    } else {
      const height = measureTextHeight(content, CONTENT_WIDTH, styles);
      elements.push({ content, height, type });
    }
    
    return elements;
  };

  const renderItem = (item, type) => {
    switch (type) {
      case 'education':
        return `
          <div class="M1-item">
            <div class="M1-item-header">
              <h4>${item.degree}</h4>
              <span>${item.stYear} - ${item.endYear}</span>
            </div>
            <p>${item.institution}</p>
          </div>
        `;
      case 'skills':
      case 'languages':
      case 'hobbies':
        return `<li style="list-style: square; padding-right: 3px">${item}</li>`;
      default:
        return item;
    }
  };

  const createPages = () => {
    const sections = [
      {
        title: 'Professional Summary',
        content: formData.profSummary?.summary,
        type: 'summary'
      },
      {
        title: 'Experience',
        content: formData.experience,
        type: 'experience'
      },
      {
        title: 'Projects',
        content: formData.projects,
        type: 'projects'
      },
      {
        title: 'Education',
        content: formData.education,
        type: 'education'
      },
      {
        title: 'Skills',
        content: formData.skills,
        type: 'skills'
      },
      {
        title: 'Languages',
        content: formData.otherDetails?.languages,
        type: 'languages'
      },
      {
        title: 'Hobbies',
        content: formData.otherDetails?.hobbies,
        type: 'hobbies'
      }
    ];

    const newPages = [];
    let currentPage = [];
    let currentHeight = HEADER_HEIGHT;
    let currentSection = null;

    const addElementToPage = (element) => {
      if (currentHeight + element.height > CONTENT_HEIGHT) {
        newPages.push(currentPage);
        currentPage = [];
        currentHeight = 0;
      }
      
      currentPage.push(element);
      currentHeight += element.height;
    };

    sections.forEach(section => {
      if (!section.content) return;

      // Add section title
      const titleHeight = measureTextHeight(
        `<h3 class="M1-section-title">${section.title}</h3>`,
        CONTENT_WIDTH,
        { marginBottom: '15px' }
      );

      if (currentHeight + titleHeight > CONTENT_HEIGHT) {
        newPages.push(currentPage);
        currentPage = [];
        currentHeight = 0;
      }

      currentPage.push({
        type: 'title',
        content: section.title,
        height: titleHeight
      });
      currentHeight += titleHeight;
      currentSection = section.type;

      // Split and add section content
      const elements = splitContentIntoLines(section.content, section.type);
      
      elements.forEach(element => {
        addElementToPage(element);
      });
    });

    if (currentPage.length > 0) {
      newPages.push(currentPage);
    }

    setPages(newPages);
  };

  useEffect(() => {
    createPages();
  }, [formData]);

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
        <span>{personalInfo?.adress}</span>
      </div>
    </div>
  );

  const renderContent = (item) => {
    if (item.type === 'title') {
      return <h3 className="M1-section-title">{item.content} -</h3>;
    }
    return <div 
      dangerouslySetInnerHTML={{ __html: item.content }}
      className={item.isStart ? 'M1-item' : ''}
    />;
  };

  return (
    <div className="M1-container" ref={containerRef}>
      {pages.map((pageContent, pageIndex) => (
        <div key={pageIndex} className="M1-page">
          {pageIndex === 0 && <Header personalInfo={formData.personalInfo} />}
          <div className="M1-content">
            {pageContent.map((item, itemIndex) => (
              <div key={itemIndex} className="M1-section">
                {renderContent(item)}
              </div>
            ))}
          </div>
          <div className="M1-page-number">Page {pageIndex + 1}</div>
        </div>
      ))}
    </div>
  );
};

export default MultiTemp1;