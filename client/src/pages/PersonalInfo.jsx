import React from 'react';

const PersonalInfo = ({ formData, handleChange }) => {
    return (
        <div className='form-floating formBox'>
            <div className="form-floating mb-3">
                <input 
                    type="text" 
                    className="form-control" 
                    id="floatingInput" 
                    value={formData.name || ""}
                    onChange={(e) => handleChange('personalInfo', 'name', e.target.value)} 
                    placeholder="name@example.com" />
                <label htmlFor="floatingInput">Name</label>
            </div>
            <br />
            <div className="form-floating mb-3">
                <input 
                    type="email" 
                    className="form-control" 
                    id="floatingInput" 
                    value={formData.email || ""}
                    onChange={(e) => handleChange('personalInfo', 'email', e.target.value)} 
                    placeholder="name@example.com" />
                <label htmlFor="floatingInput">Email address</label>
            </div>
            <br />
            <div className="form-floating mb-3">
                <input 
                    type="text" 
                    className="form-control" 
                    id="floatingInput" 
                    value={formData.phone || ""}
                    onChange={(e) => handleChange('personalInfo', 'phone', e.target.value)}
                    placeholder="name@example.com" />
                <label htmlFor="floatingInput">Mobile no-</label>
            </div>
            
        </div>
    );
};

export default PersonalInfo;
