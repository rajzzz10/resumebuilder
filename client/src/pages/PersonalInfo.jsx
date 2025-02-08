import React, { useContext } from 'react';
import { CheckContext } from '../context/checkContext';

const PersonalInfo = ({ formData, handleChange }) => {
    const { checkState } = useContext(CheckContext);
    const { hasImage } = checkState;

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onloadend = () => {
            handleChange('personalInfo', 'image', reader.result); // Store the Base64 string
        };
        reader.readAsDataURL(file);
    };

    return (
        <div className='form-floating formBox'>
            <div className="form-floating mb-3">
                <input 
                    type="text" 
                    className="form-control" 
                    id="floatingInput" 
                    value={formData.name || ""} 
                    onChange={(e) => handleChange('personalInfo', 'name', e.target.value)} 
                    placeholder="name@example.com" 
                    required/>
                <label htmlFor="floatingInput">Name <span className='red'>*</span></label>
            </div>
            <br />
            <div className="form-floating mb-3">
                <input 
                    type="text" 
                    className="form-control" 
                    id="floatingInput" 
                    value={formData.title || ""} 
                    onChange={(e) => handleChange('personalInfo', 'title', e.target.value)} 
                    placeholder="name@example.com" 
                    required/>
                <label htmlFor="floatingInput">Job title <span className='red'>*</span></label>
            </div>
            <br />
            <div className="form-floating mb-3">
                <input 
                    type="email" 
                    className="form-control" 
                    id="floatingInput" 
                    value={formData.email || ""} 
                    onChange={(e) => handleChange('personalInfo', 'email', e.target.value)} 
                    placeholder="name@example.com" required/>
                <label htmlFor="floatingInput">Email address <span className='red'>*</span></label>
            </div>
            <br />
            <div className="form-floating mb-3">
                <input 
                    type="text" 
                    className="form-control" 
                    id="floatingInput" 
                    value={formData.phone || ""} 
                    onChange={(e) => handleChange('personalInfo', 'phone', e.target.value)} 
                    placeholder="name@example.com" required/>
                <label htmlFor="floatingInput">Mobile no <span className='red'>*</span></label>
            </div>
            <br />
            <div className="form-floating mb-3">
                <input 
                    type="text" 
                    className="form-control" 
                    id="floatingInput" 
                    value={formData.adress || ""} 
                    onChange={(e) => handleChange('personalInfo', 'adress', e.target.value)} 
                    placeholder="name@example.com" required/>
                <label htmlFor="floatingInput">Address <span className='red'>*</span></label>
            </div>
            <br />
            {/* Conditionally render the image input field */}
            {hasImage && (
                <div className="form-floating mb-3">
                    <input 
                        type="file" 
                        className="form-control" 
                        id="floatingInputImage" 
                        accept="image/*"
                        onChange={handleImageChange}// Handle image input change
                    />
                    <label htmlFor="floatingInputImage">Upload your photo</label>
                </div>
            )}
        </div>
    );
};

export default PersonalInfo;
