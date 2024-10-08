import React from 'react';
import { useLocation } from 'react-router-dom';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import '../css/resumeTemp1.css'; // Add this for custom styling

const ResumePreview = () => {
    const location = useLocation();
    const formData = location.state?.formData || {};

    const handleDownload = () => {
        const input = document.getElementById('resume');
        html2canvas(input, { scale: 2 }).then((canvas) => {  // Increase scale for better quality
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF('p', 'mm', 'a4');

            const imgWidth = pdf.internal.pageSize.getWidth();
            const pageHeight = pdf.internal.pageSize.getHeight();
            const imgHeight = (canvas.height * imgWidth) / canvas.width; // Maintain aspect ratio

            let heightLeft = imgHeight;

            let position = 0;

            pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
            heightLeft -= pageHeight;

            while (heightLeft >= 0) {
                position = heightLeft - imgHeight;
                pdf.addPage();
                pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
                heightLeft -= pageHeight;
            }

            pdf.save('resume.pdf');
        });
    };


    return (
        <div className="resume-container">
            <div id="resume" className="resume">
                {/* Header Section with Name and Contact Info */}
                <header className="resume-header">
                    <h1 className="name">{formData.personalInfo?.name}</h1>
                    <div className="contact-info">
                        <p><strong>Email:</strong> {formData.personalInfo?.email}</p>
                        <p><strong>Phone:</strong> {formData.personalInfo?.phone}</p>
                    </div>
                </header>

                <div className="resume-content">
                    {/* Professional Summary Section */}
                    <section className="section">
                        <h2 className="section-title">Professional Summary</h2>
                        <p className="summary-text">{formData.profSummary?.summary}</p>
                    </section>

                    {/* Education Section */}
                    <section className="section">
                        <h2 className="section-title">Education</h2>
                        {formData.education.map((edu, index) => (
                            <div className="education-item" key={index}>
                                <h3>{edu.degree}</h3>
                                <p>{edu.institution}</p>
                                <p>{new Date(edu.stYear).toLocaleDateString()} - {edu.endYear ? new Date(edu.endYear).toLocaleDateString() : 'Present'}</p>
                            </div>
                        ))}
                    </section>

                    {/* Experience Section */}
                    <section className="section">
                        <h2 className="section-title">Experience</h2>
                        {formData.experience.map((exp, index) => (
                            <div className="experience-item" key={index}>
                                <h3>{exp.role}</h3>
                                <p>{exp.company}</p>
                                <p>{new Date(exp.stDate).toLocaleDateString()} - {exp.endDate ? new Date(exp.endDate).toLocaleDateString() : 'Present'}</p>
                            </div>
                        ))}
                    </section>

                    {/* Skills Section */}
                    <section className="section">
                        <h2 className="section-title">Skills</h2>
                        <div className="skills-container">
                            <ul className="skills-list">
                                {formData.skills.map((skill, index) => (
                                    <li key={index} className="skill-item">{skill}</li>
                                ))}
                            </ul>
                        </div>
                    </section>

                    {/* Certifications Section */}
                    <section className="section">
                        <h2 className="section-title">Certifications</h2>
                        <p>{formData.certificate?.certification}</p>
                        <p>{formData.certificate?.placeOfCert}</p>
                    </section>
                </div>
            </div>

            <div className="download-btn">
                <button onClick={handleDownload}>Download as PDF</button>
            </div>
        </div>
    );
};

export default ResumePreview;