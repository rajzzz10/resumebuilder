import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import FresherTemp2 from '../templatepreviews/FresherTemp2';
import '../css/resumeTemp1.css';
import '../css/FresherTemp2.css';
import CertTemp3 from '../templatepreviews/CertTemp3';
import MyNavbar from './Navbar';
import '../css/resumePreview.css'
import FresherTemp3 from '../templatepreviews/FresherTemp4';
import FresherTemp1 from '../templatepreviews/FresherTemp1';
import FresherTemp4 from '../templatepreviews/FresherTemp4';
import ExpTemp1 from '../templatepreviews/ExpTemp1';
import NoTemplates from './NoTemplates';
import ExpTemp3 from '../templatepreviews/ExpTemp3';
import ExpTemp2 from '../templatepreviews/ExpTemp2';
import CertTemp2 from '../templatepreviews/CertTemp2';

const ResumePreview = () => {
    const location = useLocation();
    const { formData, selectedTemplate } = location.state || {};

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
        } else if (name.includes('Experienced Template')) {
            switch (id) {
                case 1: return <ExpTemp1 formData={formData}  />;
                case 2: return <ExpTemp2 formData={formData}  />;
                case 3: return <ExpTemp3 formData={formData} />;
                default: return <NoTemplates/>;
            }
        }
        else if (name.includes('Certified Template')) {
            switch (id) {
                case 2: return <CertTemp2 formData={formData} />;
                case 3: return <CertTemp3 formData={formData} />;
                default: return <NoTemplates/>;
            }
        }

        return null;
    };

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
        <>
            <MyNavbar />
            <div className="download-btn">
                <button className="btn btn-warning mb-3" onClick={handleDownload}>Download as PDF</button>
            </div>
            <div className="resume-container ">
                <div>
                    {renderTemplatePreview()}
                </div>
            </div>
            
        </>
    );
};

export default ResumePreview;
