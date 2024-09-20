import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/App.css'; 

const FormOuvertureCompte = () => {
  const [formData, setFormData] = useState({});
  const [currentSection, setCurrentSection] = useState(1);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleNext = () => {
    if (isCurrentSectionComplete()) {
      setCurrentSection(currentSection + 1);
    } else {
      alert('Veuillez remplir tous les champs avant de passer à la section suivante.');
    }
  };

  const isCurrentSectionComplete = () => {
    const requiredFields = {
      1: ['raisonSociale', 'formeJuridique', 'numeroRCCM', 'codeNIF', 'adresse', 'telephone', 'email', 'secteurActivite'],
      2: ['actionnaire', 'dateNaissance', 'lieuNaissance', 'nationalite', 'domicileLegal', 'dependance', 'niveau', 'partSociale'],
      3: ['nomPrenom', 'dateNaissanceAdmin', 'lieuNaissanceAdmin', 'nationaliteAdmin', 'domicileLegalAdmin', 'partSocialeAdmin'],
      // Ajoutez d'autres sections si nécessaire
    };

    return requiredFields[currentSection].every((field) => formData[field]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Logique de soumission (par exemple, génération d'un fichier XML)
  };

  return (
    <div className="container mt-5">
      <h3 className="text-center mb-4">Ouverture de Compte</h3>
      <form onSubmit={handleSubmit} className="shadow p-4 bg-light rounded">
        {currentSection === 1 && (
          <div className="section mb-4">
            <h4>Identification</h4>
            <div className="form-fields">
              {['raisonSociale', 'formeJuridique', 'numeroRCCM', 'codeNIF', 'adresse', 'telephone', 'email', 'secteurActivite'].map(field => (
                <div className="mb-3" key={field}>
                  <label className="form-label">{field.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}:</label>
                  <input type="text" name={field} className="form-control" onChange={handleChange} required />
                </div>
              ))}
            </div>
          </div>
        )}

        {currentSection === 2 && (
          <div className="section mb-4">
            <h4>Actionnaire / Associés</h4>
            <div className="form-fields">
              {['actionnaire', 'dateNaissance', 'lieuNaissance', 'nationalite', 'domicileLegal', 'dependance', 'niveau', 'partSociale'].map(field => (
                <div className="mb-3" key={field}>
                  <label className="form-label">{field.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}:</label>
                  <input type="text" name={field} className="form-control" onChange={handleChange} required />
                </div>
              ))}
            </div>
          </div>
        )}

        {currentSection === 3 && (
          <div className="section mb-4">
            <h4>Administrateurs</h4>
            <div className="form-fields">
              {['nomPrenom', 'dateNaissanceAdmin', 'lieuNaissanceAdmin', 'nationaliteAdmin', 'domicileLegalAdmin', 'partSocialeAdmin'].map(field => (
                <div className="mb-3" key={field}>
                  <label className="form-label">{field.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}:</label>
                  <input type="text" name={field} className="form-control" onChange={handleChange} required />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Ajoutez d'autres sections si nécessaire */}

        <div className="d-flex justify-content-between">
          {currentSection > 1 && (
            <button type="button" className="btn btn-secondary" onClick={() => setCurrentSection(currentSection - 1)}>
              Précédent
            </button>
          )}
          {currentSection < 3 ? (
            <button type="button" className="btn btn-primary" onClick={handleNext}>
              Suivant
            </button>
          ) : (
            <button type="submit" className="btn btn-success">
              Soumettre
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default FormOuvertureCompte;
