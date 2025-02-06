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
            <div className="modern-resume" id='resume'>
                <div className="resume-grid">
                    {/* Left Column */}
                    <div className="left-column">
                        <div className="profile-section">
                            {formData.personalInfo?.image && (
                                <div className="profile-image">
                                    <img src={formData.personalInfo.image} alt="Profile" />
                                </div>
                            )}
                        </div>

                        <div className="profile-summary">
                            <h3 className="section-heading">PROFILE SUMMARY</h3>
                            <p>{formData.profSummary?.summary || 'Your professional summary here'}</p>
                        </div>

                        <div className="education-section">
                            <h3 className="section-heading">EDUCATION</h3>
                            {formData.education?.map((edu, index) => (
                                <div key={index} className="education-item">
                                    <h4>{edu.institution || 'UNIVERSITY NAME'}</h4>
                                    <p>{edu.degree || 'Enter Your Degree'}</p>
                                    <div className="date">
                                        {edu.stYear ? new Date(edu.stYear).getFullYear() : ''} -
                                        {edu.endYear ? new Date(edu.endYear).getFullYear() : 'Present'}
                                    </div>
                                    <hr />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right Column */}
                    <div className="right-column">
                        <h1 className="profile-name">
                            {formData.personalInfo?.name || 'YOUR NAME'}
                        </h1>
                        <h2 className="profile-title">
                            {formData.personalInfo?.title || 'Professional Title'}
                        </h2>

                        <div className="skills-section">
                            <h3 className="section-heading">PROFESSIONAL SKILLS</h3>
                            <ul className="custom-list">
                                {formData.skills?.map((skill, index) => (
                                    <li key={index}>{skill}</li>
                                ))}
                            </ul>
                        </div>

                        <div className="languages-section">
                            <h3 className="section-heading">LANGUAGES</h3>
                            <ul className="custom-list">
                                {formData.otherDetails?.languages?.map((language, index) => (
                                    <li key={index}>{language}</li>
                                ))}
                            </ul>
                        </div>

                        <div className="hobbies-section">
                            <h3 className="section-heading">HOBBIES & INTERESTS</h3>
                            <ul className="custom-list">
                                {formData.otherDetails?.hobbies?.map((hobby, index) => (
                                    <li key={index}>{hobby}</li>
                                ))}
                            </ul>
                        </div>

                        <div className="contact-section">
                            <h3 className="section-heading">CONTACT</h3>
                            <div className="contact-info">
                                <p><i className="fas fa-phone"></i> {formData.personalInfo?.phone || '+0 123 456 789'}</p>
                                <p><i className="fas fa-envelope"></i> {formData.personalInfo?.email || 'youremailaddress@mail.com'}</p>
                                <p><i className="fas fa-map-marker-alt"></i> {formData.personalInfo?.adress || '445, Mount Eden Road, Anytown, USA'}</p>
                            </div>
                        </div>
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