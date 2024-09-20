import React, { useEffect, useState } from 'react';
import '../styles/App.css'; // Assurez-vous que vous avez un fichier CSS pour ajouter des styles personnalisés

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
  const [loading, setLoading] = useState(true); // Gestion du chargement
  const [error, setError] = useState(null); // Gestion des erreurs
  const userId = localStorage.getItem('userId');

  useEffect(() => {
    const fetchForms = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/forms/${userId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch forms');
        }
        const data = await response.json();
        setForms(data.forms);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchForms();
  }, [userId]);

  if (loading) {
    return <div>Loading...</div>; 
  }

  if (error) {
    return <div>Error: {error}</div>; 
  }

  return (
    <div className="library-container container mt-4">
      <h2 className="mb-4">Library</h2>
      {forms.length === 0 ? (
        <p>No forms available.</p> 
      ) : (
        <table className="table table-bordered">
          <thead className="thead-dark">
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
      )}
    </div>
  );
};

export default Library;
