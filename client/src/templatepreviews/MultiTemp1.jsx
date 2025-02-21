import React, { useEffect, useRef, useState } from 'react';
import '../css/MultiTemp1.css';

const MultiTemp1 = ({ formData }) => {
  const [pages, setPages] = useState([]);
  const containerRef = useRef(null);
  const [debug, setDebug] = useState({ heights: [] });
  
  const A4_WIDTH = 794;
  const A4_HEIGHT = 1123;
  const PAGE_PADDING = 40;
  const CONTENT_WIDTH = A4_WIDTH - (PAGE_PADDING * 2);
  const CONTENT_HEIGHT = A4_HEIGHT - (PAGE_PADDING * 2) - 40; // Subtract additional 40px for page number and safety margin
  
  const measureTextHeight = (text, width, styles) => {
    const measurer = document.createElement('div');
    measurer.className = 'M1-content'; // Add the same class as content container
    Object.assign(measurer.style, {
      width: `${width}px`,
      position: 'absolute',
      visibility: 'hidden',
      padding: '0',
      margin: '0',
      border: '0',
      ...styles
    });
    measurer.innerHTML = text;
    document.body.appendChild(measurer);
    const height = Math.ceil(measurer.getBoundingClientRect().height);
    document.body.removeChild(measurer);
    return height;
  };

  const splitProjectOrExperience = (item, type) => {
    const elements = [];
    
    const headerContent = `
      <div class="M1-item-header" style="margin: 0; padding: 0;">
        <h4>${type === 'experience' ? `${item.role} - ${item.company}` : item.name}</h4>
        <span>${type === 'experience' ? `${item.stDate} - ${item.endDate}` : 
          `${item.startDate || '20XX'} - ${item.endDate || 'Present'}`}</span>
      </div>
    `;
    
    const headerHeight = measureTextHeight(headerContent, CONTENT_WIDTH, {
      marginTop: '0',
      marginBottom: '5px'
    });
    
    elements.push({
      content: headerContent,
      height: headerHeight + 5, // Add marginBottom
      type: `${type}-header`,
      isStart: true,
      debug: { type: 'header', measured: headerHeight }
    });

    const description = item.description || '';
    const paragraphs = description.split('\n').filter(p => p.trim());

    paragraphs.forEach((paragraph, idx) => {
      const paraContent = `<p class="M1-description" style="margin: 0; padding: 0;">${paragraph}</p>`;
      const marginBottom = idx === paragraphs.length - 1 ? 20 : 10;
      const paraHeight = measureTextHeight(paraContent, CONTENT_WIDTH);
      
      elements.push({
        content: paraContent,
        height: paraHeight + marginBottom,
        type: `${type}-description`,
        isEnd: idx === paragraphs.length - 1,
        debug: { type: 'paragraph', measured: paraHeight, withMargin: paraHeight + marginBottom }
      });
    });

    return elements;
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
        content: formData.education.map(item => `
          <div class="M1-item">
            <div class="M1-item-header">
              <h4>${item.degree}</h4>
              <span>${item.stYear} - ${item.endYear}</span>
            </div>
            <p>${item.institution}</p>
          </div>
        `).join(''),
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
    let currentHeight = 0;
    const debugHeights = [];

    // Add header to first page with precise measurement
    const headerContent = `
      <div class="M1-header" style="margin: 0; padding: 0;">
        <h1 class="M1-name">${formData.personalInfo?.name || 'YOUR NAME'}</h1>
        <h2 class="M1-title">${formData.personalInfo?.title || 'PROFESSIONAL TITLE'}</h2>
        <div class="M1-divider"></div>
        <div class="M1-contact">
          <span>${formData.personalInfo?.email || ''}</span>
          <span class="M1-separator">•</span>
          <span>${formData.personalInfo?.phone || ''}</span>
          <span class="M1-separator">•</span>
          <span>${formData.personalInfo?.adress || ''}</span>
        </div>
      </div>
    `;
    
    const headerHeight = measureTextHeight(headerContent, CONTENT_WIDTH);
    currentHeight = headerHeight + 30; // Header + margin
    currentPage.push({
      content: headerContent,
      height: headerHeight,
      type: 'header',
      debug: { type: 'header', height: headerHeight }
    });
    debugHeights.push({ type: 'header', height: headerHeight, currentHeight });

    const addElementToPage = (element) => {
      const newHeight = currentHeight + element.height;
      debugHeights.push({
        type: element.type,
        elementHeight: element.height,
        currentHeight: currentHeight,
        newHeight: newHeight,
        contentHeight: CONTENT_HEIGHT,
        wouldOverflow: newHeight > CONTENT_HEIGHT
      });

      if (newHeight > CONTENT_HEIGHT) {
        newPages.push(currentPage);
        currentPage = [];
        currentHeight = 0;
      }
      
      currentPage.push(element);
      currentHeight += element.height;
    };

    sections.forEach(section => {
      if (!section.content) return;

      // Add section title with precise measurement
      const titleContent = `<h3 class="M1-section-title" style="margin: 0; padding: 0;">${section.title}</h3>`;
      const titleHeight = measureTextHeight(titleContent, CONTENT_WIDTH);
      const titleElement = {
        type: 'title',
        content: section.title,
        height: titleHeight + 15, // Title + margin
        debug: { type: 'title', measured: titleHeight }
      };
      addElementToPage(titleElement);

      // Split and add section content
      if (section.type === 'experience' || section.type === 'projects') {
        section.content.forEach(item => {
          const elements = splitProjectOrExperience(item, section.type);
          elements.forEach(element => addElementToPage(element));
        });
      } else if (Array.isArray(section.content)) {
        const listContent = `<ul style="margin: 0; padding-left: 20px;">
          ${section.content.map(item => `<li>${item}</li>`).join('')}
        </ul>`;
        const listHeight = measureTextHeight(listContent, CONTENT_WIDTH);
        addElementToPage({
          content: listContent,
          height: listHeight + 15,
          type: section.type,
          debug: { type: 'list', measured: listHeight }
        });
      } else if (section.content) {
        const contentHeight = measureTextHeight(section.content, CONTENT_WIDTH);
        addElementToPage({
          content: section.content,
          height: contentHeight + 15,
          type: section.type,
          debug: { type: 'content', measured: contentHeight }
        });
      }
    });

    if (currentPage.length > 0) {
      newPages.push(currentPage);
    }

    setDebug({ heights: debugHeights });
    setPages(newPages);
  };

  useEffect(() => {
    createPages();
  }, [formData]);

  const renderContent = (item) => {
    if (item.type === 'title') {
      return <h3 className="M1-section-title">{item.content}</h3>;
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
      {/* Debug info - remove in production */}
      <div style={{ display: 'none' }}>
        {JSON.stringify(debug, null, 2)}
      </div>
    </div>
  );
};

export default MultiTemp1;