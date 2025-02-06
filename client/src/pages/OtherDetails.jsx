import React, { useState } from 'react';

const OtherDetails = ({ formData, handleChange }) => {
  const [hobbyInput, setHobbyInput] = useState('');
  const [hobbies, setHobbies] = useState(formData.hobbies || []);

  const [languageInput, setLanguageInput] = useState('');
  const [languages, setLanguages] = useState(formData.languages || []);

  const addHobby = () => {
    if (hobbyInput) {
      const newHobbies = [...hobbies, hobbyInput];
      setHobbies(newHobbies);
      handleChange('otherDetails', 'hobbies', newHobbies);
      setHobbyInput('');
    }
  };

  const removeHobby = (hobbyToRemove) => {
    const newHobbies = hobbies.filter(hobby => hobby !== hobbyToRemove);
    setHobbies(newHobbies);
    handleChange('otherDetails', 'hobbies', newHobbies);
  };

  const addLanguage = () => {
    if (languageInput) {
      const newLanguages = [...languages, languageInput];
      setLanguages(newLanguages);
      handleChange('otherDetails', 'languages', newLanguages);
      setLanguageInput('');
    }
  };

  const removeLanguage = (languageToRemove) => {
    const newLanguages = languages.filter(lang => lang !== languageToRemove);
    setLanguages(newLanguages);
    handleChange('otherDetails', 'languages', newLanguages);
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
            placeholder="Add a Language"
            value={languageInput}
            onChange={(e) => setLanguageInput(e.target.value)}
          />
          <label htmlFor="language-input">Add a Language</label>
        </div>
        <button type="button" className="btn btn-success mt-2" onClick={addLanguage}>
          Add Language
        </button>
      </div>

      {/* Display Added Languages */}
      <div className="language-buttons">
        {languages.map((language, index) => (
          <button key={index} type="button" className="btn btn-danger mt-2" onClick={() => removeLanguage(language)}>
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
            placeholder="Add a Hobby"
            value={hobbyInput}
            onChange={(e) => setHobbyInput(e.target.value)}
          />
          <label htmlFor="hobby-input">Add a Hobby</label>
        </div>
        <button type="button" className="btn btn-success mt-2" onClick={addHobby}>
          Add Hobby
        </button>
      </div>

      {/* Display Added Hobbies */}
      <div className="hobby-buttons">
        {hobbies.map((hobby, index) => (
          <button key={index} type="button" className="btn btn-danger mt-2" onClick={() => removeHobby(hobby)}>
            {hobby} <span>X</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default OtherDetails;
