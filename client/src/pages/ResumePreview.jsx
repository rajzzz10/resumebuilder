import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import Temp1 from '../templatepreviews/temp1';
import FresherTemp2 from '../templatepreviews/FresherTemp2';
import '../css/resumeTemp1.css';
import '../css/FresherTemp2.css';
import CertTemp3 from '../templatepreviews/CertTemp3';
import MyNavbar from './Navbar';

const ResumePreview = () => {
    const location = useLocation();
    const { formData, selectedTemplate } = location.state || {};

    const renderTemplatePreview = () => {
        if (!selectedTemplate) return null;

        const { id, name } = selectedTemplate;

        if (name.includes('Fresher Template')) {
            switch (id) {
                case 2: return <FresherTemp2 formData={formData} />;
                case 3: return <FresherTemp3 formData={formData} />;
                default: return null;
            }
        } else if (name.includes('Certified Template')) {
            switch (id) {
                case 3: return <CertTemp3 formData={formData} />;
                default: return null;
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
                <button className="btn btn-warning" onClick={handleDownload}>Download as PDF</button>
            </div>
            <div className="resume-container">
                <div>
                    {renderTemplatePreview()}
                </div>

            </div>
        </>
    );
};

export default ResumePreview;
