import React, { useState } from 'react';

const FormOuvertureCompte = () => {
  const [formData, setFormData] = useState({});
  const [currentSection, setCurrentSection] = useState(1);
  const userId = localStorage.getItem('userId');
  const [fileName] = useState('FormOuvertureCompte'); // Define the name of the file

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleNext = () => {
    setCurrentSection(currentSection + 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch('http://localhost:5000/api/submit-form',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ fileName, formData, userId }), 
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
      <h3>Formulaire d'Ouverture de Compte</h3>
      <form onSubmit={handleSubmit}>

        {/* Section 1: Détails du compte */}
        {currentSection === 1 && (
          <div className="form-fields">
            <label>
              ID du client
              <input type="text" name="idClient" onChange={handleChange} required />
            </label>
            <label>
              Sigle
              <input type="text" name="sigle" onChange={handleChange} required />
            </label>
            <label>
              Forme juridique
              <input type="text" name="formeJuridique" onChange={handleChange} required />
            </label>
            <label>
              Date de création
              <input type="date" name="dateCreation" onChange={handleChange} required />
            </label>
            <label>
              Nationalité
              <input type="text" name="nationalite" onChange={handleChange} required />
            </label>
            <label>
              Pays siège social
              <input type="text" name="paysSiegeSocial" onChange={handleChange} required />
            </label>
            <label>
              Ville siège social
              <input type="text" name="villeSiegeSocial" onChange={handleChange} required />
            </label>
            <label>
              Type d'enregistrement
              <input type="text" name="typeEnregistrement" onChange={handleChange} required />
            </label>
            <label>
              Numéro d'enregistrement
              <input type="text" name="numeroEnregistrement" onChange={handleChange} required />
            </label>
            <label>
              Code NIF
              <input type="text" name="codeNif" onChange={handleChange} required />
            </label>
            <label>
              Adresse
              <input type="text" name="adresse" onChange={handleChange} required />
            </label>
            <label>
              Boite postale
              <input type="text" name="boitePostale" onChange={handleChange} required />
            </label>
            <label>
              Téléphone
              <input type="text" name="telephone" onChange={handleChange} required />
            </label>
            <label>
              E-mail
              <input type="email" name="email" onChange={handleChange} required />
            </label>
            <label>
              Secteur d'activité
              <input type="text" name="secteurActivite" onChange={handleChange} required />
            </label>
            <label>
              Capital
              <input type="text" name="capital" onChange={handleChange} required />
            </label>
            <label>
              Chiffre d'affaire
              <input type="text" name="chiffreAffaire" onChange={handleChange} required />
            </label>
            <label>
              Effectif
              <input type="text" name="effectif" onChange={handleChange} required />
            </label>
            <button type="button" onClick={handleNext}>
              Next
            </button>
          </div>
        )}

        {/* Section 2: Administrateurs */}
        {currentSection === 2 && (
          <div className="form-fields">
            <h4 style={{ textAlign: 'center' }}>Administrateur</h4>
            <label>
              Nom et prénom(s)
              <input type="text" name="nomPrenoms" onChange={handleChange} required />
            </label>
            <label>
              Date de naissance
              <input type="date" name="dateNaissance" onChange={handleChange} required />
            </label>
            <label>
              Lieu de naissance
              <input type="text" name="lieuNaissance" onChange={handleChange} required />
            </label>
            <label>
              Nationalité
              <input type="text" name="nationaliteAdmin" onChange={handleChange} required />
            </label>
            <label>
              Domicile légal
              <input type="text" name="domicileLegal" onChange={handleChange} required />
            </label>
            <label>
              Part sociale éventuelle (%)
              <input type="number" name="partSociale" onChange={handleChange} required />
            </label>
            <button type="button" onClick={handleNext}>
              Next
            </button>
          </div>
        )}

        {/* Section 3: Dirigeants */}
        {currentSection === 3 && (
          <div className="form-fields">
            <h4 style={{ textAlign: 'center' }}>Dirigeant</h4>
            <label>
              Nom et prénom(s)
              <input type="text" name="nomPrenomsDirigeants" onChange={handleChange} required />
            </label>
            <label>
              Date de naissance
              <input type="date" name="dateNaissanceDirigeants" onChange={handleChange} required />
            </label>
            <label>
              Lieu de naissance
              <input type="text" name="lieuNaissanceDirigeants" onChange={handleChange} required />
            </label>
            <label>
              Nationalité
              <input type="text" name="nationaliteDirigeants" onChange={handleChange} required />
            </label>
            <label>
              Domicile légal
              <input type="text" name="domicileLegalDirigeants" onChange={handleChange} required />
            </label>
            <button type="button" onClick={handleNext}>
              Next
            </button>
          </div>
        )}

        {/* Section 4: Origine des Capitaux Confies */}
        {currentSection === 4 && (
          <div className="form-fields">
            <h4 style={{ textAlign: 'center' }}>Origine des capitaux confies</h4>
            <label>
              Activités prévues
              <input type="text" name="activitesPrevues" onChange={handleChange} required />
            </label>
            <label>
              Activités réellement exercées
              <input type="text" name="activitesReellementExercees" onChange={handleChange} required />
            </label>


            
            <h4 style={{ textAlign: 'center' }}>Fournisseur des transformateurs électriques</h4>
            <label>
              aaaaaa
              <input type="text" name="activitesPrevues" onChange={handleChange} required />
            </label>

          


            <button type="submit">Submit</button>
          </div>
        )}

      </form>
    </div>
  );
};

export default FormOuvertureCompte;
