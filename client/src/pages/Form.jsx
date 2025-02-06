import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PersonalInfo from './PersonalInfo';
import Education from './Education';
import Experience from './Experience';
import Certificate from './Certificate';
import ProfSummary from './ProfSummary';
import Skills from './Skills';
import Temp1 from '../templatepreviews/temp1';
import Temp2 from '../templatepreviews/Temp2';
import { useCheck } from '../context/checkContext';
import '../css/form.css';
import FresherTemp2 from '../templatepreviews/FresherTemp2';
import OtherDetails from './OtherDetails';

const Form = () => {
    const navigate = useNavigate();
    const { checkState } = useCheck();
    const { hasExperience, hasCertification, selectedTemplate } = checkState;

    // Form State
    const [formData, setFormData] = useState({
        personalInfo: { name: '',title: '', email: '', phone: '' },
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
                navigate('/resume-preview', { state: { formData } });
            } else {
                console.error('Submission failed:', result);
            }
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    };

    useEffect(()=>{
        console.log("Selected Templete",selectedTemplate)
    },[])

    

    // const renderTemplatePreview = () => {
    //     switch (selectedTemplate?.id) {
    //         case 2: return <Temp1 formData={formData} />; // Renders Temp1 for Experienced Template 2
    //         case 4: return <Temp2 formData={formData} />; // Renders Temp2 for Experienced Template 4
    //         default: return null; // Add other cases as needed
    //     }
    // };

    const renderTemplatePreview = () => {
        if (!selectedTemplate) return null;
    
        const { id, name } = selectedTemplate;
    
        if (name.includes('Fresher Template')) {
            console.log("Fresher");
            switch (id) {
                // case 1: return <FresherTemp1 />;
                case 2: return <FresherTemp2 formData={formData}/>;
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
                case 3: return <Temp2 formData={formData} />;
                // case 2: return <ExpTemp2 />;
                default: return null;
            }
        }
    
        return null;
    };


    return (
        <div className="container">
            {/* Progress Bar */}
            <div className="progress-container">
                <div className="progress-bar" style={{ width: `${(page / (formSteps.length - 1)) * 100}%` }}></div>
            </div>

            <div className="form">
                <div className="display-3 text-center">{formSteps[page].title}</div>

                <div className="formDiv d-flex row p-0 m-0">
                    <div className="col-md-7 form-left p-4 mb-4 d-flex align-items-start flex-column">
                        <form className="formComponents mb-auto p-2">
                            {formSteps[page].component}

                            <div className="formBtns d-flex gap-4 p-2 pt-4">
                                <button onClick={prevPage} className="btn btn-dark" disabled={page === 0}>Prev</button>
                                {isLastPage ? (
                                    <button type="button" className="btn btn-success" onClick={handleSubmit}>Submit</button>
                                ) : (
                                    <button type="button" onClick={nextPage} className="btn btn-warning">
                                        Next ({formSteps[page + 1]?.title || 'Submit'})
                                    </button>
                                )}
                            </div>
                        </form>
                    </div>

                    {/* Right Side for Live Preview */}
                    <div className="col-md-5 form-right d-flex justify-content-center align-items-center m-0 p-0">
                        {renderTemplatePreview()}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Form;
