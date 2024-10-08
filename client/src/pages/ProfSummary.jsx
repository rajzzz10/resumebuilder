import React from 'react';

const ProfSummary = ({ formData, handleChange }) => {
    return (
        <div className='form-floating'>
            <div className="form-floating mb-3">
                <input 
                    type='text'
                    className="form-control" 
                    id="floatingInput"
                    value={formData.summary || ""}
                    onChange={(e) => handleChange('profSummary', 'summary', e.target.value)} 
                    placeholder="name@example.com" />
                <label htmlFor="floatingInput">Professional Summary</label>
            </div>
        </div>
    );
};

export default ProfSummary;