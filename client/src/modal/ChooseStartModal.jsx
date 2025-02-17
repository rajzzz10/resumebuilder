import React, { useState } from "react";
import { Modal, Button, Form, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const ChooseStartModal = ({ show, handleClose, handleOptionSelect }) => {
  const [uploadMode, setUploadMode] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      alert("Please select a file first!");
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedFile);

    setLoading(true);
    try {
      const response = await fetch("http://localhost:5000/scan", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to scan resume");
      }

      const extractedData = await response.json();
      navigate("/form", { state: { scannedData: extractedData } }); 
    } catch (error) {
      console.error("Error scanning resume:", error);
      alert("Failed to scan the resume. Please try again.");
    } finally {
      setLoading(false);
    }
  };


  return (
    <Modal show={show} onHide={handleClose} centered >
      <Modal.Header closeButton >
        <Modal.Title className="pt-2 pb-2 ">Choose How You Want to Start</Modal.Title>
      </Modal.Header>
      <Modal.Body className="text-center ">
        {!uploadMode ? (
          <>
            <Button
              variant="secondary"
              className="w-100 mb-2"
              onClick={() => handleOptionSelect("scratch")}
            >
              Start from Scratch
            </Button>
            <Button
              variant="warning"
              className="w-100"
              onClick={() => setUploadMode(true)}
            >
              Scan Existing Resume
            </Button>
          </>
        ) : (
          <>
            <Form.Group controlId="formFile" className="mb-3">
              <Form.Label>Upload Your Resume (PDF/DOCX)</Form.Label>
              <Form.Control type="file" accept=".pdf,.doc,.docx" onChange={handleFileChange} />
            </Form.Group>
            <Button
              variant="success"
              className="w-100 mb-2"
              onClick={handleUpload}
              disabled={!selectedFile || loading}
            >
              {loading ? <Spinner animation="border" size="sm" /> : "Upload & Scan"}
            </Button>
            <Button variant="secondary" className="w-100" onClick={() => setUploadMode(false)}>
              Back
            </Button>
          </>
        )}
      </Modal.Body>
    </Modal>
  );
};

export default ChooseStartModal;
