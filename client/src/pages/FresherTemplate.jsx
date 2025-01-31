import React, { useState } from 'react';
import { Button, Container, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useCheck } from '../context/checkContext'; 
import '../css/chooseTemp.css';

const FresherTemplate = () => {
  const { updateCheckState } = useCheck();
  const navigate = useNavigate();
  
  const templates = [
    { id: 1, name: 'Template 1', image: '/templateImages/freshers-Templates/fresherTemp1.webp', hasImage: true },
    { id: 2, name: 'Template 2', image: '/templateImages/freshers-Templates/fresherTemp2.webp', hasImage: true },
    { id: 3, name: 'Template 2', image: '/templateImages/freshers-Templates/fresherTemp3.webp', hasImage: true },
    // Add more templates as needed
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const templatesToShow = 3;

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - templatesToShow + templates.length) % templates.length);
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + templatesToShow) % templates.length);
  };

  const handleTemplateSelection = (hasImage) => {
    updateCheckState({ hasImage });
    navigate('/form'); // Redirect to form page
  };

  return (
    <Container className="d-flex flex-column align-items-center py-4">
      <h2 className="text-center mb-3 text-warning fw-bolder">Choose a Fresher Resume Template</h2>
      <p className="text-center mb-4">Select one of our templates designed for freshers.</p>
      <div className="template-slider d-flex align-items-center position-relative w-100">
        <Button variant="warning" size="lg" className="prev-btn" onClick={handlePrev}>‹</Button>
        <Row className="w-100">
          {templates.slice(currentIndex, currentIndex + templatesToShow).map((template) => (
            <Col key={template.id} xs={12} md={4} className="template-card mb-4">
              <img src={template.image} alt={template.name} className="img-fluid template-image" />
              <div className="text-center mt-2">
                <Button variant="warning" onClick={() => handleTemplateSelection(template.hasImage)}>
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

export default FresherTemplate;
