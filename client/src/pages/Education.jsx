
import React, { useState } from 'react';

const Education = ({ formData, handleChange }) => {
  const [educationFields, setEducationFields] = useState(formData || []);

  const addEducation = () => {
    setEducationFields([...educationFields, { degree: '', institution: '', stYear: '', endYear: '' }]);
  };

  const removeEducation = (index) => {
    const newFields = educationFields.filter((_, i) => i !== index);
    setEducationFields(newFields);
    handleChange('education', null, newFields); // update parent state
  };

  const handleFieldChange = (index, field, value) => {
    const newFields = [...educationFields];
    newFields[index][field] = value;
    setEducationFields(newFields);
    handleChange('education', null, newFields); // update parent state
  };

  return (
    <div>
      {educationFields.map((education, index) => (
        <div key={index} className="education-section">
          <div className="row">
            {/* Degree and Institution - First row */}
            <div className="col">
              <div className="form-floating mb-3">
                <input
                  id={`degree-${index}`}
                  className="form-control"
                  type="text"
                  placeholder="Degree"
                  value={education.degree}
                  onChange={(e) => handleFieldChange(index, 'degree', e.target.value)}
                />
                <label htmlFor={`degree-${index}`}>Degree <span className='red'>*</span></label>
                <span className='fw-lighter ps-2'>Ex - Bsc (Physics)</span>
              </div>
              <div className="form-floating mb-3">
                <input
                  id={`institution-${index}`}
                  className="form-control"
                  type="text"
                  placeholder="Institution"
                  value={education.institution}
                  onChange={(e) => handleFieldChange(index, 'institution', e.target.value)}
                />
                <label htmlFor={`institution-${index}`}>Institution <span className='red'>*</span></label>
              </div>
            </div>
          </div>
          {/* Start Year and End Year - Second row */}
          <div className="row">
            <div className="col-sm-6">
              <label>Start Year <span className='red'>*</span></label>
              <input
                type="date"
                className="form-control"
                value={education.stYear}
                onChange={(e) => handleFieldChange(index, 'stYear', e.target.value)}
              />
            </div>
            <div className="col-sm-6">
              <label>End Year </label>
              <input
                type="date"
                className="form-control"
                value={education.endYear}
                onChange={(e) => handleFieldChange(index, 'endYear', e.target.value)}
              />
            </div>
          </div>
          {/* Remove Button */}
          <button
            type="button"
            className="btn btn-danger mt-2"
            onClick={() => removeEducation(index)}
          >
            Remove
          </button>
          <hr />
        </div>
        
      ))}
      {/* Add Education Button */}
      <button
        type="button"
        className="btn btn-success mt-3"
        onClick={addEducation}
      >
        Add Education
      </button>
    </div>
  );
};

export default Education;

