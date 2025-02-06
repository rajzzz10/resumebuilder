import React from 'react';
import { useLocation } from 'react-router-dom';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import '../css/resumeTemp1.css';
import '../css/FresherTemp2.css';

const ResumePreview = () => {
    const location = useLocation();
    const formData = location.state?.formData || {};

    const handleDownload = () => {
        const input = document.getElementById('resume');
        html2canvas(input, { scale: 2 }).then((canvas) => {
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF('p', 'mm', 'a4');
    
            const imgWidth = pdf.internal.pageSize.getWidth();
            const imgHeight = (canvas.height * imgWidth) / canvas.width; // Maintain aspect ratio
    
            if (imgHeight > pdf.internal.pageSize.getHeight()) {
                pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, pdf.internal.pageSize.getHeight());
            } else {
                pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
            }
    
            pdf.save('resume.pdf');
        });
    };
    


    return (
        <div className="resume-container" >
             <div id="resume" className="resume">
                <div className='left-section'>
                    <div className='image-container'>
                        <img src={formData.personalInfo?.image} alt="Profile" />
                    </div>

                    <div className='resume-content-left'>
                        {/* Contact Info */}
                        <section>
                            <div className="contact-info">
                                <h2 className="section-title">Contact</h2>
                                <p><i className="fas fa-envelope"></i> {formData.personalInfo?.email || 'youremailaddress@mail.com'}</p>
                                <p><i className="fas fa-phone"></i> {formData.personalInfo?.phone || '+0 123 456 789'}</p>
                                <p><i className="fas fa-map-marker-alt"></i> {formData.personalInfo?.adress || 'Mumbai , India'}</p>
                            </div>
                        </section>

                        {/* Skills Section */}
                        <section className="section">
                            <h2 className="section-title">Skills Summary</h2>
                            <ul className="custom-list">
                                {formData.skills.map((skill, index) => (
                                    <li key={index}>{skill}</li>
                                ))}
                            </ul>
                        </section>

                        {/* Certifications Section */}
                        <section className="section cert">
                            <h2 className="section-title">Certifications</h2>
                            <p className='fw-bold'>{formData.certificate?.certification}</p>
                            <p>{formData.certificate?.placeOfCert}</p>
                        </section>

                        <section className="section">
                            <h2 className="section-title">Languages</h2>
                            <ul className='custom-list'>
                                {formData.otherDetails?.languages?.map((language, index) => (
                                    <li key={index}>{language}</li>
                                ))}
                            </ul>
                        </section>
                    </div>
                </div>

                <div className='right-section'>
                    {/* Header Section with Name and Job Title */}
                    <header className="resume-header">
                        <h1 className="name">{formData.personalInfo?.name || 'YOUR NAME'}</h1>
                        <h3 className="job-title">{formData.personalInfo?.title || 'Professional Title'}</h3>
                    </header>

                    <div className="resume-content-right">
                        {/* Professional Summary */}
                        <section className="section">
                            <h2 className="section-title">Professional Summary</h2>
                            <p className="summary-text">{formData.profSummary?.summary}</p>
                        </section>

                        {/* Experience */}
                        <section className="section">
                            <h2 className="section-title">Work Experience</h2>
                            {formData.experience.map((exp, index) => (
                                <div className="experience-item" key={index}>
                                    <h3>{exp.role}</h3>
                                    <p>{exp.company}</p>
                                    <p>{new Date(exp.stDate).toLocaleDateString()} - {exp.endDate ? new Date(exp.endDate).toLocaleDateString() : 'Present'}</p>
                                </div>
                            ))}
                        </section>

                        {/* Education */}
                        <section className="section">
                            <h2 className="section-title">Education History</h2>
                            {formData.education.map((edu, index) => (
                                <div className="education-item" key={index}>
                                    <h3>{edu.degree}</h3>
                                    <p>{edu.institution}</p>
                                    <p>{new Date(edu.stYear).toLocaleDateString()} - {edu.endYear ? new Date(edu.endYear).toLocaleDateString() : 'Present'}</p>
                                </div>
                            ))}
                        </section>
                        {/* Hobbies Section */}
                        <section className="section">
                            <h2 className="section-title">Hobbies</h2>
                            <ul>
                                {formData.otherDetails?.hobbies?.map((hobby, index) => (
                                    <li key={index}>{hobby}</li>
                                ))}
                            </ul>
                        </section>
                    </div>
                </div>
            </div>

            <div className="download-btn">
                <button onClick={handleDownload}>Download as PDF</button>
            </div>
        </div>
    );
};

export default ResumePreview;