// components/FormPage.js
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Form from './Form'; // Assurez-vous que vous avez ce composant Form

const FormPage = () => {
  const { fileName } = useParams(); // Récupère le nom du fichier depuis l'URL
  const navigate = useNavigate(); // Utilisé pour naviguer entre les routes

  const goToLibrary = () => {
    navigate('/library');
  };

  return (
    <div className="form-page">
      <h1>Form for {fileName}</h1>
      <Form fileName={fileName} />
      <button onClick={goToLibrary} className="go-to-library-button">
        Go to Library
      </button>
    </div>
  );
};

export default FormPage;
