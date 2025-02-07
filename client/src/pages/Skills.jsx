
import React, { useState } from 'react';

const Skills = ({ formData, handleChange }) => {
  const [skillInput, setSkillInput] = useState("");
  const [skills, setSkills] = useState(formData || []);

  const addSkill = () => {
    if (skillInput) {
      const newSkills = [...skills, skillInput];
      setSkills(newSkills);
      handleChange('skills', null, newSkills); // update parent state
      setSkillInput("");
    }
  };

  const removeSkill = (skillToRemove) => {
    const newSkills = skills.filter(skill => skill !== skillToRemove);
    setSkills(newSkills);
    handleChange('skills', null, newSkills); // update parent state
  };

  return (
    <div>
      <div className="skill-section">
        <div className="form-floating mb-3">
          <input
            id="skill-input"
            className="form-control"
            type="text"
            placeholder="Add a Skill"
            value={skillInput}
            onChange={(e) => setSkillInput(e.target.value)}
          />
          <label htmlFor="skill-input">Add a Skill</label>
        </div>
        <button
          type="button"
          className="btn btn-success mt-2"
          onClick={addSkill}
        >
          Add Skill
        </button>
      </div>
      <div className="skill-buttons d-flex flex-wrap gap-2">
        {skills.map((skill, index) => (
          <button
            key={index}
            type="button"
            className="btn btn-danger mt-2"
            onClick={() => removeSkill(skill)}
          >
            {skill} <span>X</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default Skills;
