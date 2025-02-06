import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PersonalInfo from './PersonalInfo';
import Education from './Education';
import Experience from './Experience';
import Certificate from './Certificate';
import ProfSummary from './ProfSummary';
import Skills from './Skills';
import Temp1 from '../templatepreviews/temp1';
import { useCheck } from '../context/checkContext';
import '../css/form.css';
import FresherTemp2 from '../templatepreviews/FresherTemp2';
import OtherDetails from './OtherDetails';
import CertTemp3 from '../templatepreviews/CertTemp3';

const Form = () => {
    const navigate = useNavigate();
    const { checkState } = useCheck();
    const { hasExperience, hasCertification, selectedTemplate } = checkState;

    // Form State
    const [formData, setFormData] = useState({
        personalInfo: { name: '', title: '', email: '', phone: '', adress: '' },
        profSummary: { summary: '' },
        education: [{ degree: '', institution: '', year: '' }],
        experience: hasExperience ? [{ jobTitle: '', company: '', years: '' }] : [],
        certificate: hasCertification ? { title: '', issuedBy: '' } : {},
        skills: [],
        otherDetails: { languages: [], hobbies: [] } // Now both are arrays
    });

    const handleChange = (section, field, value) => {
        if (section === 'otherDetails') {
            setFormData(prevState => ({
                ...prevState,
                otherDetails: {
                    ...prevState.otherDetails,
                    [field]: value
                }
            }));
        } else if (field === 'image') {
            setFormData(prevState => ({
                ...prevState,
                [section]: {
                    ...prevState[section],
                    [field]: value
                }
            }));
        } else if (Array.isArray(value)) {
            setFormData(prevState => ({
                ...prevState,
                [section]: value
            }));
        } else if (section === 'education') {
            setFormData(prevState => ({
                ...prevState,
                education: value
            }));
        } else {
            setFormData(prevState => ({
                ...prevState,
                [section]: {
                    ...prevState[section],
                    [field]: value
                }
            }));
        }
    };
    // Define form steps dynamically
    const formSteps = [
        { title: 'Personal Information', component: <PersonalInfo formData={formData.personalInfo} handleChange={handleChange} /> },
        { title: 'Professional Summary', component: <ProfSummary formData={formData.profSummary} handleChange={handleChange} /> },
        { title: 'Educational Details', component: <Education formData={formData.education} handleChange={handleChange} /> },
        { title: 'Skills', component: <Skills formData={formData.skills} handleChange={handleChange} /> },
        { title: 'Other Details', component: <OtherDetails formData={formData.otherDetails} handleChange={handleChange} /> },
        ...(hasExperience ? [{ title: 'Professional Journey', component: <Experience formData={formData.experience} handleChange={handleChange} /> }] : []),
        ...(hasCertification ? [{ title: 'Certification', component: <Certificate formData={formData.certificate} handleChange={handleChange} /> }] : []),
    ];

    const [page, setPage] = useState(0);
    const isLastPage = page === formSteps.length - 1;

    const nextPage = (e) => {
        e.preventDefault();
        if (!isLastPage) setPage(page + 1);
    };

    const prevPage = (e) => {
        e.preventDefault();
        if (page > 0) setPage(page - 1);
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
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
                // Pass the formData and selectedTemplate to the preview page
                navigate('/resume-preview', { 
                    state: { formData, selectedTemplate }
                });
            } else {
                console.error('Submission failed:', result);
            }
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    };
    

    useEffect(() => {
        console.log("Selected Templete", selectedTemplate)
    }, [])


    const renderTemplatePreview = () => {
        if (!selectedTemplate) return null;

        const { id, name } = selectedTemplate;

        if (name.includes('Fresher Template')) {
            console.log("Fresher");
            switch (id) {
                // case 1: return <FresherTemp1 />;
                case 2: return <FresherTemp2 formData={formData} />;
                default: return null;
            }
        }
        else if (name.includes('Experienced Template')) {
            console.log("Experienced");
            // switch (id) {
            //     case 1: return <MidTemp1 />;
            //     case 2: return <MidTemp2 />;
            //     default: return null;
            // }
        }
        else if (name.includes('Certified Template')) {
            console.log("Certified");
            switch (id) {
                case 3: return <CertTemp3 formData={formData} />;
                // case 2: return <ExpTemp2 />;
                default: return null;
            }
        }

        return null;
    };


    return (
        <div className="form-container">
            {/* Progress Bar */}
            {/* <div className="progress-container">
                <div className="progress-bar" style={{ width: `${(page / (formSteps.length - 1)) * 100}%` }}></div>
            </div> */}



            <div className="display-3 text-center mb-4">{formSteps[page].title}</div>

            {/* Top Navigation */}
            <div className="top-nav-buttons">
                <button onClick={prevPage} className="btn btn-dark" disabled={page === 0}>
                    Previous
                </button>
                {!isLastPage ? (
                    <button onClick={nextPage} className="btn btn-warning">
                        Next ({formSteps[page + 1]?.title})
                    </button>
                ) : (
                    <button onClick={handleSubmit} className="btn btn-success">
                        Submit
                    </button>
                )}
            </div>

            <div className="formDiv">
                <div className="form-left">
                    <form className="formComponents">
                        {formSteps[page].component}
                    </form>
                </div>

                <div className="form-right">
                    {renderTemplatePreview()}
                </div>
            </div>
            {/* Optional: Info message for smaller devices */}
            <div className="d-block d-lg-none text-center text-muted mt-3">
                <small>Live Resume preview is available on larger screens</small>
            </div>
        </div>
    );
};

export default Form;
