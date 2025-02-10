import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PersonalInfo from './PersonalInfo';
import Education from './Education';
import Experience from './Experience';
import Certificate from './Certificate';
import ProfSummary from './ProfSummary';
import Skills from './Skills';
import { useCheck } from '../context/checkContext';
import '../css/form.css';
import FresherTemp2 from '../templatepreviews/FresherTemp2';
import OtherDetails from './OtherDetails';
import CertTemp3 from '../templatepreviews/CertTemp3';
import MyNavbar from './Navbar';
import Projects from './Projects';
import FresherTemp3 from '../templatepreviews/FresherTemp3';
import FresherTemp1 from '../templatepreviews/FresherTemp1';
import FresherTemp4 from '../templatepreviews/FresherTemp4';
import NoTemplates from './NoTemplates';
import ExpTemp1 from '../templatepreviews/ExpTemp1';
import ExpTemp3 from '../templatepreviews/ExpTemp3';
import ExpTemp2 from '../templatepreviews/ExpTemp2';

const Form = () => {
    const navigate = useNavigate();
    const { checkState } = useCheck();
    const { hasExperience, hasCertification, selectedTemplate ,hasProject} = checkState;

    // Form State
    const [formData, setFormData] = useState({
        personalInfo: { name: '', title: '', email: '', phone: '', adress: '' },
        profSummary: { summary: '' },
        education: [{ degree: '', institution: '', year: '' }],
        projects: hasProject ? [{ name: '', startDate: '', endDate: '', description: '' }] : [],
        experience: hasExperience ? [{ jobTitle: '', company: '', years: '', description: '' }] : [],
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
        ...(hasProject ? [{ title: 'Projects', component: <Projects formData={formData.projects} handleChange={handleChange} /> }] : []),
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
    
        // Extracting values for validation
        const { personalInfo, education, skills, otherDetails } = formData;
        const { name, email, phone, adress } = personalInfo;
    
        // Validation checks
        if (
            !name.trim() || 
            !email.trim() || 
            !phone.trim() || 
            !adress.trim() || 
            education.length === 0 || 
            skills.length === 0 || 
            otherDetails.languages.length === 0 || 
            otherDetails.hobbies.length === 0
        ) {
            alert('Please fill all required fields (*) before submitting.');
            return; // Stop submission if validation fails
        }
    
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

    const renderTemplatePreview = () => {
        if (!selectedTemplate) return null;

        const { id, name } = selectedTemplate;

        if (name.includes('Fresher Template')) {
            switch (id) {
                case 1: return <FresherTemp1 formData={formData} />;
                case 2: return <FresherTemp2 formData={formData} />;
                case 3: return <FresherTemp4 formData={formData} />;
                case 4: return <FresherTemp3 formData={formData} />;
                default: return null;
            }
        }
        else if (name.includes('Experienced Template')) {
            switch (id) {
                case 1: return <ExpTemp1 formData={formData}  />;
                case 2: return <ExpTemp2 formData={formData}  />;
                case 3: return <ExpTemp3 formData={formData} />;
                default: return <NoTemplates/>;
            }
        }
        else if (name.includes('Certified Template')) {
            switch (id) {
                case 3: return <CertTemp3 formData={formData} />;
                // case 2: return <ExpTemp2 />;
                default: return  <NoTemplates/>;;
            }
        }

        return  <NoTemplates/>;;
    };

    return (
        <>
            <MyNavbar />
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
                    <small>Live Resume preview is available on larger screens but your Resume is getting ready in background . Fill all your details .</small>
                </div>
            </div>
        </>
    );
};

export default Form;
