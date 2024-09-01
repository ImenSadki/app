import React, { useEffect, useState } from 'react';

const formatFormData = (data) => {
  if (typeof data !== 'object' || data === null) {
    return data;
  }
  return Object.entries(data)
    .map(([key, value]) => `${key}: ${value}`)
    .join('\n');
};

const Library = () => {
  const [forms, setForms] = useState([]);
  const userId = localStorage.getItem('userId'); 

  useEffect(() => {
    const fetchForms = async () => {
      const response = await fetch(`http://localhost:5000/api/forms/${userId}`);
      const data = await response.json();
      setForms(data.forms);
    };
    fetchForms();
  }, [userId]);

  return (
    <div className="library-container">
      <h2>Library</h2>
      <table>
        <thead>
          <tr>
            <th>File Name</th>
            <th>Form Data</th>
          </tr>
        </thead>
        <tbody>
          {forms.map((form, index) => (
            <tr key={index}>
              <td>{form.fileName}</td>
              <td>
                <pre>{formatFormData(form.formData)}</pre>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Library;
