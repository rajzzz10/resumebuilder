import React, { useState } from 'react';

const Experience = ({ formData, handleChange }) => {
    const [experienceFields, setExperienceFields] = useState(formData || []);

    const addExperience = () => {
        setExperienceFields([...experienceFields, { role: '', company: '' , description : '', stDate: '', endDate: '' }]);
    };

    const removeExperience = (index) => {
        const newFields = experienceFields.filter((_, i) => i !== index);
        setExperienceFields(newFields);
        handleChange('experience', null, newFields); // update parent state
    };

    const handleFieldChange = (index, field, value) => {
        const newFields = [...experienceFields];
        newFields[index][field] = value;
        setExperienceFields(newFields);
        handleChange('experience', null, newFields); // update parent state
    };

    return (
        <div>
            {experienceFields.map((experience, index) => (
                <div key={index} className="experience-section">
                    <div className="row">
                        {/* Role and Company - First row */}
                        <div className="col">
                            <div className="form-floating mb-3">
                                <input
                                    id={`role-${index}`}
                                    className="form-control"
                                    type="text"
                                    placeholder="Role"
                                    value={experience.role}
                                    onChange={(e) => handleFieldChange(index, 'role', e.target.value)}
                                />
                                <label htmlFor={`role-${index}`}>Role</label>
                            </div>

                            <div className="form-floating mb-3">
                                <input
                                    id={`company-${index}`}
                                    className="form-control"
                                    type="text"
                                    placeholder="Company"
                                    value={experience.company}
                                    onChange={(e) => handleFieldChange(index, 'company', e.target.value)}
                                />
                                <label htmlFor={`company-${index}`}>Company</label>
                            </div>
                            <div className="form-floating mb-3">
                                <textarea
                                    id={`description-${index}`}
                                    className="form-control"
                                    style={{height:'100px'}}
                                    type="text"
                                    placeholder="description"
                                    value={experience.description}
                                    onChange={(e) => handleFieldChange(index, 'description', e.target.value)}
                                />
                                <label htmlFor={`description-${index}`}>Description</label>
                            </div>
                        </div>
                    </div>

                    {/* Start Date and End Date - Second row */}
                    <div className="row">
                        <div className="col-sm-6">
                            <label>Start Date</label>
                            <input
                                type="date"
                                className="form-control"
                                value={experience.stDate}
                                onChange={(e) => handleFieldChange(index, 'stDate', e.target.value)}
                            />
                        </div>
                        <div className="col-sm-6">
                            <label>End Date</label>
                            <input
                                type="date"
                                className="form-control"
                                value={experience.endDate}
                                onChange={(e) => handleFieldChange(index, 'endDate', e.target.value)}
                            />
                        </div>
                        <br />
                        <p className='fw-lighter'>*Dont mention End date if currently working in it.</p>
                    </div>

                    {/* Remove Button */}
                    <button type="button" className="btn btn-danger mt-2" onClick={() => removeExperience(index)}>
                        Remove
                    </button>
                </div>
            ))}

            {/* Add Experience Button */}
            <button type="button" className="btn btn-success mt-3" onClick={addExperience}>
                Add Experience
            </button>
        </div>
    );
};

export default Experience;
