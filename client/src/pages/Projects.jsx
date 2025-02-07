import React, { useState } from 'react';

const Projects = ({ formData, handleChange }) => {
  const [projectFields, setProjectFields] = useState(formData || []);

  const addProject = () => {
    setProjectFields([...projectFields, { name: '', startDate: '', endDate: '', description: '' }]);
  };

  const removeProject = (index) => {
    const newFields = projectFields.filter((_, i) => i !== index);
    setProjectFields(newFields);
    handleChange('projects', null, newFields); // update parent state
  };

  const handleFieldChange = (index, field, value) => {
    const newFields = [...projectFields];
    newFields[index][field] = value;
    setProjectFields(newFields);
    handleChange('projects', null, newFields); // update parent state
  };

  return (
    <div>
      {projectFields.map((project, index) => (
        <div key={index} className="project-section">
          <div className="row">
            {/* Project Name */}
            <div className="col">
              <div className="form-floating mb-3">
                <input
                  id={`project-name-${index}`}
                  className="form-control"
                  type="text"
                  placeholder="Project Name"
                  value={project.name}
                  onChange={(e) => handleFieldChange(index, 'name', e.target.value)}
                />
                <label htmlFor={`project-name-${index}`}>Project Name</label>
              </div>
            </div>
          </div>
          {/* Start Date and End Date */}
          <div className="row">
            <div className="col-sm-6">
              <label>Start Date</label>
              <input
                type="date"
                className="form-control"
                value={project.startDate}
                onChange={(e) => handleFieldChange(index, 'startDate', e.target.value)}
              />
            </div>
            <div className="col-sm-6">
              <label>End Date</label>
              <input
                type="date"
                className="form-control"
                value={project.endDate}
                onChange={(e) => handleFieldChange(index, 'endDate', e.target.value)}
              />
            </div>
          </div>
          {/* Project Description */}
          <div className="row">
            <div className="col">
              <div className="form-floating mt-3">
                <textarea
                  id={`project-desc-${index}`}
                  className="form-control"
                  style={{ height: "200px" }}
                  placeholder="Project Description"
                  value={project.description}
                  onChange={(e) => handleFieldChange(index, 'description', e.target.value)}
                />
                <label htmlFor={`project-desc-${index}`}>Project Description</label>
              </div>
            </div>
          </div>
          {/* Remove Button */}
          <button
            type="button"
            className="btn btn-danger mt-2"
            onClick={() => removeProject(index)}
          >
            Remove
          </button>
        </div>
      ))}
      {/* Add Project Button */}
      <button
        type="button"
        className="btn btn-success mt-3"
        onClick={addProject}
      >
        Add Project
      </button>
    </div>
  );
};

export default Projects;
