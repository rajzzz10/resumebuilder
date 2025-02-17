import React, { useState, useEffect } from "react";
import { Button, Container, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useCheck } from "../context/checkContext";
import "../css/chooseTemp.css";
import ChooseStartModal from "../modal/ChooseStartModal";

const FresherTemplate = () => {
  const { updateCheckState } = useCheck();
  const navigate = useNavigate();

  const templates = [
    { id: 1, name: "Fresher Template 1", image: "/templateImages/freshers-Templates/fresherTemp1.webp", hasImage: true, hasProject: true },
    { id: 2, name: "Fresher Template 2", image: "/templateImages/freshers-Templates/fresherTemp2.webp", hasImage: true, hasProject: false },
    { id: 3, name: "Fresher Template 3", image: "/templateImages/freshers-Templates/FresherTemp4.jpg", hasImage: true, hasProject: true },
    { id: 4, name: "Fresher Template 4", image: "/templateImages/freshers-Templates/fresherTemp3.webp", hasImage: true, hasProject: true },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [templatesToShow, setTemplatesToShow] = useState(3);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const updateTemplatesToShow = () => {
      if (window.innerWidth < 770) {
        setTemplatesToShow(1);
      } else {
        setTemplatesToShow(3);
      }
    };

    updateTemplatesToShow();
    window.addEventListener("resize", updateTemplatesToShow);

    return () => {
      window.removeEventListener("resize", updateTemplatesToShow);
    };
  }, []);

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prevIndex) => prevIndex - 1);
    }
  };

  const handleNext = () => {
    if (currentIndex + templatesToShow < templates.length) {
      setCurrentIndex((prevIndex) => prevIndex + 1);
    }
  };

  const handleTemplateSelection = (template) => {
    setSelectedTemplate(template);
    setShowModal(true);
  };

  const handleOptionSelect = (option) => {
    setShowModal(false);
    updateCheckState({ hasImage: selectedTemplate.hasImage, hasProject: selectedTemplate.hasProject, selectedTemplate: selectedTemplate });

    if (option === "scratch") {
      navigate("/form");
    }
  };

  return (
    <Container className="d-flex flex-column align-items-center py-4">
      <h2 className="text-center mb-3 text-warning fw-bolder">
        Choose a Fresher Resume Template
      </h2>
      <p className="text-center mb-4">
        Select one of our templates designed for freshers.
      </p>
      <div className="template-slider d-flex align-items-center position-relative w-100">
        <Button
          variant="warning"
          size="lg"
          className="prev-btn"
          onClick={handlePrev}
          disabled={currentIndex === 0}
        >
          ‹
        </Button>
        <Row className="w-100 justify-content-center">
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
        <Button variant="warning" size="lg" className="next-btn" onClick={handleNext} disabled={currentIndex + templatesToShow >= templates.length}>›</Button>
      </div>
      <ChooseStartModal show={showModal} handleClose={() => setShowModal(false)} handleOptionSelect={handleOptionSelect} />
    </Container>
  );
};

export default FresherTemplate;
