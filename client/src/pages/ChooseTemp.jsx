import React, { useState } from 'react';
import { Button, Container, Row, Col } from 'react-bootstrap';
import '../css/chooseTemp.css';

const ChooseTemp = () => {
  const templates = [
    { id: 1, name: 'Template 1', image: '/templateImages/temp.webp', link: '/form' }, 
    { id: 2, name: 'Template 2', image: '/templateImages/temp2.webp', link: '/form' },
    { id: 3, name: 'Template 3', image: '/templateImages/temp3.webp', link: '/form' },
    { id: 4, name: 'Template 4', image: '/templateImages/temp.webp', link: '/form' },
    { id: 5, name: 'Template 5', image: '/templateImages/temp2.webp', link: '/form' },
    { id: 6, name: 'Template 6', image: '/templateImages/temp.webp', link: '/form' },
    { id: 7, name: 'Template 7', image: '/templateImages/temp2.webp', link: '/form' },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const templatesToShow = 3;

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? templates.length - templatesToShow : prevIndex - 1));
  };
  
  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + templatesToShow >= templates.length ? 0 : prevIndex + 1));
  };
  

  return (
    <Container className="d-flex flex-column align-items-center py-4">
      <h2 className="text-center mb-3 text-warning fw-bolder">Choose a Resume Template</h2>
      <p className="text-center mb-4">Select one of our expertly designed resume templates to kickstart your job application.</p>
      <div className="template-slider d-flex align-items-center position-relative w-100">
        <Button variant="warning" size="lg" className="prev-btn" onClick={handlePrev}>‹</Button>
        <Row className="w-100">
          {templates.slice(currentIndex, currentIndex + templatesToShow).map((template) => (
            <Col key={template.id} xs={12} md={4} className="template-card mb-4">
              <img src={template.image} alt={template.name} className="img-fluid template-image" />
              <div className="text-center mt-2">
                <Button variant="warning" onClick={() => window.location.href = template.link}>
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

export default ChooseTemp;
