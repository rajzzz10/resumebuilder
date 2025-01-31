import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PersonalInfo from './PersonalInfo';
import Education from './Education';
import Experience from './Experience';
import Certificate from './Certificate';
import ProfSummary from './ProfSummary';
import Skills from './Skills';
import ResumePreview from './ResumePreview';  // Import the ResumePreview component
import '../css/form.css';
import Temp1 from '../templatepreviews/temp1';
import Temp2 from '../templatepreviews/Temp2';
import { useCheck } from '../context/checkContext';

const Form = () => {
    const navigate = useNavigate();
    const formTitle = ['Personal Information', 'Professional Summary', 'Educational Details', 'Skills', 'Professional Journey', 'Certification'];
    const formDescription = ['How can Employers get in touch with you', 'Briefly highlight your career goals', 'List your relevant skills', 'Key skills & achievements in one frame', 'A showcase of your academic achievements, relevant courses, and institutions attended', 'List your work history, including job titles, company names, and accomplishments', 'Enter relevant industry certifications, licenses, or specialized training'];
    const [page, setPage] = useState(0);
    const [formData, setFormData] = useState({
        personalInfo: {},
        profSummary: {},
        education: [],
        experience: [],
        certificate: {},
        skills: []
    });
    const { checkState } = useCheck(); // Get context state
    const selectedTemplate = checkState.selectedTemplate;

    const renderTemplatePreview = () => {
        switch (selectedTemplate?.id) {
          case 1:
            return <Temp1 formData={formData} />;
          case 2:
            return <Temp2 formData={formData} />;
          case 3:
            return <Temp2 formData={formData} />; // Renders Temp2 for Template ID 3
          // Add additional cases as needed
          default:
            return null;
        }
      };      

    const nextPage = (e) => {
        e.preventDefault();
        setPage((page) => Math.min(page + 1, formTitle.length - 1));
    };

    const prevPage = (e) => {
        e.preventDefault();
        setPage((page) => Math.max(page - 1, 0));
    };

    const handleChange = (section, field, value) => {
        if (field === 'image') {
            // The value is the Base64 string of the image
            setFormData(prevState => ({
                ...prevState,
                [section]: { ...prevState[section], [field]: value }
            }));
        } else if (Array.isArray(value)) {
            setFormData(prevState => ({ ...prevState, [section]: value }));
        } else {
            setFormData(prevState => ({
                ...prevState,
                [section]: { ...prevState[section], [field]: value }
            }));
        }
    };


    const formComponents = () => {
        switch (page) {
            case 0: return <PersonalInfo formData={formData.personalInfo} handleChange={handleChange} />;
            case 1: return <ProfSummary formData={formData.profSummary} handleChange={handleChange} />;
            case 2: return <Education formData={formData.education} handleChange={handleChange} />;
            case 3: return <Skills formData={formData.skills} handleChange={handleChange} />;
            case 4: return <Experience formData={formData.experience} handleChange={handleChange} />;
            case 5: return <Certificate formData={formData.certificate} handleChange={handleChange} />;
            default: return null;
        }
    };

    const handleSubmit = async () => {
        console.log('Form Data:', formData);
        try {
            const response = await fetch('http://localhost:5000/api/form', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const result = await response.json();
            if (response.ok) {
                alert('Form submitted successfully!');
                navigate('/resume-preview', { state: { formData } });
            } else {
                console.error('Submission failed:', result);
            }
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    };

    return (
        <div className="container">
            {/* Progress Bar */}
            <div className="progress-container">
                <div className="progress-bar" style={{ width: `${(page / (formTitle.length - 1)) * 100}%` }}></div>
            </div>

            <div className="form">
                <div className="display-3 text-center">{formTitle[page]}</div>
                <div className="display-6 text-center pb-4">({formDescription[page]})</div>

                <div className="formDiv d-flex row p-0 m-0">
                    <div className="col-md-7 form-left p-4 mb-4 d-flex align-items-start flex-column">
                        <form className="formComponents mb-auto p-2">
                            {formComponents()}
                            <div className="formBtns d-flex gap-4 p-2 pt-4">
                                <button onClick={prevPage} className='btn btn-dark' disabled={page === 0}>Prev</button>
                                {formTitle.length - 1 === page ?
                                    <button type="button" className='btn btn-success' onClick={(e) => {
                                        e.preventDefault();
                                        handleSubmit();
                                    }}>Submit</button>
                                    : <button type="button" onClick={nextPage} className='btn btn-warning'>Next ({formTitle[page + 1]})</button>
                                }
                            </div>
                        </form>
                    </div>

                    {/* Right Side for Live Preview */}
                    <div className="col-md-5 form-right d-flex justify-content-center align-items-center m-0 p-0">
                        {/* Dynamic Resume Preview */}
                        {renderTemplatePreview()}
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Form;
