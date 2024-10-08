import React from 'react';


const Certificate = ({ formData, handleChange }) => {
  return (
    <div className='form-floating'>
      <div className="form-floating mb-3">
        <input
          type="text"
          className="form-control"
          id="floatingInput"
          value={formData.certification || ""}
          onChange={(e) => handleChange('certificate', 'certification', e.target.value)}
          placeholder="name@example.com" />
        <label htmlFor="floatingInput">Field of Certification</label>
      </div>
      <br />
      <div className="form-floating mb-3">
        <input
          type="email"
          className="form-control"
          id="floatingInput"
          value={formData.placeOfCert || ""}
          onChange={(e) => handleChange('certificate', 'placeOfCert', e.target.value)}
          placeholder="name@example.com" />
        <label htmlFor="floatingInput">Instituition</label>
      </div>
      <br />
    </div>
  );
};

export default Certificate;
