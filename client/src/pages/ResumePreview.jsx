import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import FresherTemp2 from '../templatepreviews/FresherTemp2';
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
import CertTemp1 from '../templatepreviews/CertTemp1';
// import MultiTemp1 from '../templatepreviews/MultiTemp1';

const ResumePreview = () => {
    const location = useLocation();
    const navigate = useNavigate();
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
                case 1: return <ExpTemp1 formData={formData} />;
                case 2: return <ExpTemp2 formData={formData} />;
                case 3: return <ExpTemp3 formData={formData} />;
                default: return <NoTemplates />;
            }
        } else if (name.includes('Certified Template')) {
            switch (id) {
                case 1: return <CertTemp1 formData={formData} />;
                case 2: return <CertTemp2 formData={formData} />;
                case 3: return <CertTemp3 formData={formData} />;
                default: return <NoTemplates />;
            }
        } 
        // else if (name.includes('Multipage Template')) {
        //     switch (id) {
        //         case 1: return <MultiTemp1 formData={formData} />;
        //         default: return <NoTemplates />;
        //     }
        // }

        return null;
    };

    const handleDownload = () => {
        const input = document.getElementById('resume');

        input.style.transform = "scale(1)";
        input.style.transformOrigin = "top left";

        html2canvas(input, { scale: 2 }).then((canvas) => {
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF('p', 'mm', 'a4');

            const imgWidth = pdf.internal.pageSize.getWidth();
            const imgHeight = (canvas.height * imgWidth) / canvas.width;

            pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
            pdf.save('resume.pdf');

            // Restore the margin after download
            resumeElement.style.margin = originalMargin;

            // Restore the original scaling
            input.style.transform = "scale(0.5) translateX(50%)";
            input.style.transformOrigin = "top left";
        });
    };

    const handleEdit = () => {
        navigate('/form', { state: { formData, selectedTemplate } }); // Pass form data back
    };

    return (
        <>
            <MyNavbar />
            <div className="download-btn gap-3">
                <button className="btn btn-secondary mb-3" onClick={handleEdit}>Edit</button>
                <button className="btn btn-warning mb-3" onClick={handleDownload}>Download as PDF</button>
            </div>
            <div className="resume-container ">
                <div className="resume-preview p-0 m-0" id="resume">
                    {renderTemplatePreview()}
                </div>
            </div>
        </>
    );
};

export default ResumePreview;