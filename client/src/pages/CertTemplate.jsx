import React, { useState } from 'react';
import { Button, Container, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useCheck } from '../context/checkContext'; 
import '../css/chooseTemp.css';

const CertTemplate = () => {
  const { updateCheckState } = useCheck();
  const navigate = useNavigate();
  
  const templates = [
    { id: 1, name: 'Template 1', image: '/templateImages/certified-Templates/certTemp1.jpg', hasImage: true },
    { id: 2, name: 'Template 2', image: '/templateImages/certified-Templates/certTemp2.jpg', hasImage: true },
    { id: 3, name: 'Template 3', image: '/templateImages/certified-Templates/certTemp3.jpg', hasImage: true },
    { id: 4, name: 'Template 4', image: '/templateImages/certified-Templates/certTemp4.png', hasImage: true },
    // Add more templates as needed
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const templatesToShow = 3;

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? templates.length - templatesToShow : prevIndex - 1));
  };
  
  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + templatesToShow >= templates.length ? 0 : prevIndex + 1));
  };
  

  const handleTemplateSelection = (template) => {
    updateCheckState({ hasImage: template.hasImage, selectedTemplate: template }); // Store entire template object
    navigate('/form'); // Redirect to form page
  };

  return (
    <Container className="d-flex flex-column align-items-center py-4">
      <h2 className="text-center mb-3 text-warning fw-bolder">Choose an Expert Resume Template</h2>
      <p className="text-center mb-4">Select one of our templates designed for experts.</p>
      <div className="template-slider d-flex align-items-center position-relative w-100">
        <Button variant="warning" size="lg" className="prev-btn" onClick={handlePrev}>‹</Button>
        <Row className="w-100">
          {templates.slice(currentIndex, currentIndex + templatesToShow).map((template) => (
            <Col key={template.id} xs={12} md={4} className="template-card mb-4">
              <img src={template.image} alt={template.name} className="img-fluid template-image" />
              <div className="text-center mt-2">
              <Button variant="warning" onClick={() => handleTemplateSelection(template)}>
                  Select {template.name}
                </Button>
              </div>
            </Col>
          ))}
        </Row>
        <Button variant="warning" size="lg" className="next-btn" onClick={handleNext}>›</Button>
      </div>
    </Container>
  );
};

export default CertTemplate;
