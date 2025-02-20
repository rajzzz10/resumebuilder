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
import MultiTemp1 from '../templatepreviews/MultiTemp1';

const ResumePreview = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { formData, selectedTemplate } = location.state || {};

    const handleMultipageDownload = async () => {
        const pages = document.querySelectorAll(".M1-page");
        const pdf = new jsPDF({
            orientation: "portrait",
            unit: "pt", // Use points for more precise measurements
            format: "a4"
        });
    
        // A4 dimensions in points (72 points per inch)
        const pageWidth = pdf.internal.pageSize.getWidth();
        const pageHeight = pdf.internal.pageSize.getHeight();
    
        for (let i = 0; i < pages.length; i++) {
            const page = pages[i];
            
            // Store original styles
            const originalStyles = {
                transform: page.style.transform,
                width: page.style.width,
                minHeight: page.style.minHeight,
                margin: page.style.margin
            };
    
            // Set temporary styles for capture
            page.style.transform = 'none';
            page.style.width = '794px';  // Match your CSS width
            page.style.minHeight = '1123px'; // Match your CSS height
            page.style.margin = '0';
    
            try {
                const canvas = await html2canvas(page, {
                    scale: 2, // Higher scale for better quality
                    useCORS: true,
                    logging: false,
                    width: 794, // Exact pixel width
                    height: 1123, // Exact pixel height
                    windowWidth: 794,
                    windowHeight: 1123,
                    onclone: (clonedDoc) => {
                        // Ensure the cloned element has the correct dimensions
                        const clonedPage = clonedDoc.querySelector('.M1-page');
                        if (clonedPage) {
                            clonedPage.style.width = '794px';
                            clonedPage.style.height = '1123px';
                        }
                    }
                });
    
                // Add new page if not first page
                if (i > 0) {
                    pdf.addPage();
                }
    
                // Calculate dimensions to maintain aspect ratio
                const imgData = canvas.toDataURL('image/png', 1.0);
                
                // Add image with exact A4 dimensions
                pdf.addImage(imgData, 'PNG', 0, 0, pageWidth, pageHeight, undefined, 'FAST');
    
                // Restore original styles
                Object.entries(originalStyles).forEach(([prop, value]) => {
                    page.style[prop] = value;
                });
    
            } catch (error) {
                console.error('Error generating PDF:', error);
            }
        }
    
        // Save the PDF
        pdf.save('multipageResume.pdf');
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
        else if (name.includes('Multipage Template')) {
            switch (id) {
                case 1: return <MultiTemp1 key={JSON.stringify(formData)} formData={formData} />;
                default: return <NoTemplates />;
            }
        }

        return null;
    };

    const handleDownload = () => {
        // If it's a multipage template, use the multipage download handler
        if (selectedTemplate?.name.includes('Multipage Template')) {
            handleMultipageDownload();
            return;
        }
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