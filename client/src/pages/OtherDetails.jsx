import React, { useState, useContext } from 'react';
import { CheckContext } from '../context/checkContext';

const OtherDetails = ({ formData, handleChange }) => {
  const { checkState } = useContext(CheckContext);
  
  // Initialize languages and hobbies from formData or set as empty arrays
  const [language, setLanguage] = useState('');
  const [hobby, setHobby] = useState('');

  const addLanguage = () => {
    if (language && !formData.languages.includes(language)) {
      const updatedLanguages = [...formData.languages, language];
      handleChange('otherDetails', 'languages', updatedLanguages);
      setLanguage(''); // Reset the input field
    }
  };

  const removeLanguage = (lang) => {
    const updatedLanguages = formData.languages.filter(language => language !== lang);
    handleChange('otherDetails', 'languages', updatedLanguages);
  };

  const addHobby = () => {
    if (hobby && !formData.hobbies.includes(hobby)) {
      const updatedHobbies = [...formData.hobbies, hobby];
      handleChange('otherDetails', 'hobbies', updatedHobbies);
      setHobby(''); // Reset the input field
    }
  };

  const removeHobby = (hobbyToRemove) => {
    const updatedHobbies = formData.hobbies.filter(h => h !== hobbyToRemove);
    handleChange('otherDetails', 'hobbies', updatedHobbies);
  };

  return (
    <div>
      {/* Languages Known Section */}
      <div className="language-section">
        <div className="form-floating mb-3">
          <input
            id="language-input"
            className="form-control"
            type="text"
            value={language}
            onChange={(e) => setLanguage(e.target.value)} // Update the local state
            placeholder="Add a Language"
          />
          <label htmlFor="language-input">Add a Language</label>
        </div>
        <button type="button" className="btn btn-success mt-2" onClick={addLanguage}>
          Add Language
        </button>
      </div>

      {/* Display Added Languages */}
      <div className="language-buttons d-flex flex-wrap gap-2">
        {formData.languages.map((language, index) => (
          <button
            key={index}
            type="button"
            className="btn btn-danger mt-2"
            onClick={() => removeLanguage(language)}
          >
            {language} <span>X</span>
          </button>
        ))}
      </div>

      {/* Hobbies Section */}
      <div className="hobby-section mt-4">
        <div className="form-floating mb-3">
          <input
            id="hobby-input"
            className="form-control"
            type="text"
            value={hobby}
            onChange={(e) => setHobby(e.target.value)} // Update the local state
            placeholder="Add a Hobby"
          />
          <label htmlFor="hobby-input">Add a Hobby</label>
        </div>
        <button type="button" className="btn btn-success mt-2" onClick={addHobby}>
          Add Hobby
        </button>
      </div>

      {/* Display Added Hobbies */}
      <div className="hobby-buttons d-flex flex-wrap gap-2">
        {formData.hobbies.map((hobby, index) => (
          <button
            key={index}
            type="button"
            className="btn btn-danger mt-2"
            onClick={() => removeHobby(hobby)}
          >
            {hobby} <span>X</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default OtherDetails;
