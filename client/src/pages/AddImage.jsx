import React from 'react';

const AddImage = ({ formData, handleChange }) => {
    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                handleChange('addImage', null, reader.result); // Save image data (base64) to formData
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className="form-floating formBox">
            <div className="mb-3">
                <label htmlFor="imageUpload" className="form-label">Upload Image</label>
                <input 
                    type="file" 
                    className="form-control" 
                    id="imageUpload" 
                    accept="image/*"
                    onChange={handleImageUpload} 
                />
            </div>
            {formData.addImage && (
                <div className="image-preview mt-3">
                    <img src={formData.addImage} alt="Uploaded Preview" style={{ width: '100%', height: 'auto' }} />
                </div>
            )}
        </div>
    );
};

export default AddImage;
