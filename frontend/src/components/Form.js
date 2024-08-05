import React, { useState } from 'react';

const Form = ({ fileName }) => {
  const [formData, setFormData] = useState({});
  const userId = localStorage.getItem('userId');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch('http://localhost:5000/api/submit-form', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ fileName, formData, userId }), // Include userId in the request
    });
    const data = await response.json();
    if (data.success) {
      alert('Form submitted successfully!');
    } else {
      alert('Form submission failed');
    }
  };

  return (
    <div className="form-container">
      <h3>Form for {fileName}</h3>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Field1</label>
          <input type="text" name="field1" onChange={handleChange} required />
        </div>
        <div>
          <label>Field2</label>
          <input type="text" name="field2" onChange={handleChange} required />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Form;