import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/App.css'; // Assurez-vous que ce fichier contient vos styles personnalisés

const Form = ({ fileName }) => {
  const [formData, setFormData] = useState({});
  const [currentSection, setCurrentSection] = useState(1); 
  const userId = localStorage.getItem('userId');

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
      alert('Please fill in all fields before proceeding to the next section.');
    }
  };

  const isCurrentSectionComplete = () => {
    const requiredFields = {
      1: [
        'raisonSociale', 'formeJuridique', 'numeroRCCM', 'codeNIF', 'adresse', 'telephone', 'email', 'secteurActivite',
      ],
      2: [
        'actionnaire', 'dateNaissance', 'lieuNaissance', 'nationalite', 'domicileLegal', 'dependance', 'niveau', 'partSociale',
      ],
      3: [
        'nomPrenom', 'dateNaissanceAdmin', 'lieuNaissanceAdmin', 'nationaliteAdmin', 'domicileLegalAdmin', 'partSocialeAdmin',
      ],
    };

    return requiredFields[currentSection].every((field) => formData[field]);
  };

  const generateXML = () => {
    return `
<AccountOpening>
    <ClientID>${userId || ''}</ClientID>
    <CompanyName>${formData.raisonSociale || ''}</CompanyName>
    <LegalForm>${formData.formeJuridique || ''}</LegalForm>
    <RegistrationNumber>${formData.numeroRCCM || ''}</RegistrationNumber>
    <NifCode>${formData.codeNIF || ''}</NifCode>
    <Address>${formData.adresse || ''}</Address>
    <Phone>${formData.telephone || ''}</Phone>
    <Email>${formData.email || ''}</Email>
    <Sector>${formData.secteurActivite || ''}</Sector>
    <Name>${formData.nomPrenom || ''}</Name>
    <DateOfBirth>${formData.dateNaissance || ''}</DateOfBirth>
    <PlaceOfBirth>${formData.lieuNaissance || ''}</PlaceOfBirth>
    <Nationality>${formData.nationalite || ''}</Nationality>
    <DomicileLegal>${formData.domicileLegal || ''}</DomicileLegal>
    <PartSocial>${formData.partSociale || ''}</PartSocial>
</AccountOpening>
    `;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const xmlData = generateXML();
    const blob = new Blob([xmlData], { type: 'application/xml' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = 'form-data.xml';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div className="container mt-5">
      <h3 className="text-center mb-4">Fiche de connaissance de client</h3>
      <form onSubmit={handleSubmit} className="shadow p-4 bg-light rounded">
        {currentSection === 1 && (
          <div className="section mb-4">
            <h4>Identification</h4>
            <div className="form-fields">
              <div className="mb-3">
                <label className="form-label">Raison Sociale:</label>
                <input type="text" name="raisonSociale" onChange={handleChange} className="form-control" required />
              </div>
              <div className="mb-3">
                <label className="form-label">Forme Juridique:</label>
                <input type="text" name="formeJuridique" onChange={handleChange} className="form-control" required />
              </div>
              <div className="mb-3">
                <label className="form-label">Numéro RCCM:</label>
                <input type="text" name="numeroRCCM" onChange={handleChange} className="form-control" required />
              </div>
              <div className="mb-3">
                <label className="form-label">Code NIF:</label>
                <input type="text" name="codeNIF" onChange={handleChange} className="form-control" required />
              </div>
              <div className="mb-3">
                <label className="form-label">Adresse:</label>
                <input type="text" name="adresse" onChange={handleChange} className="form-control" required />
              </div>
              <div className="mb-3">
                <label className="form-label">Téléphone:</label>
                <input type="text" name="telephone" onChange={handleChange} className="form-control" required />
              </div>
              <div className="mb-3">
                <label className="form-label">Email:</label>
                <input type="email" name="email" onChange={handleChange} className="form-control" required />
              </div>
              <div className="mb-3">
                <label className="form-label">Secteur d'Activité:</label>
                <input type="text" name="secteurActivite" onChange={handleChange} className="form-control" required />
              </div>
            </div>
          </div>
        )}

        {currentSection === 2 && (
          <div className="section mb-4">
            <h4>Actionnaire / Associés</h4>
            <div className="form-fields">
              <div className="mb-3">
                <label className="form-label">Actionnaire:</label>
                <input type="text" name="actionnaire" onChange={handleChange} className="form-control" required />
              </div>
              <div className="mb-3">
                <label className="form-label">Date de Naissance:</label>
                <input type="text" name="dateNaissance" onChange={handleChange} className="form-control" required />
              </div>
              <div className="mb-3">
                <label className="form-label">Lieu de Naissance:</label>
                <input type="text" name="lieuNaissance" onChange={handleChange} className="form-control" required />
              </div>
              <div className="mb-3">
                <label className="form-label">Nationalité:</label>
                <input type="text" name="nationalite" onChange={handleChange} className="form-control" required />
              </div>
              <div className="mb-3">
                <label className="form-label">Domicile Légal:</label>
                <input type="text" name="domicileLegal" onChange={handleChange} className="form-control" required />
              </div>
              <div className="mb-3">
                <label className="form-label">Dépendance:</label>
                <input type="text" name="dependance" onChange={handleChange} className="form-control" required />
              </div>
              <div className="mb-3">
                <label className="form-label">Niveau:</label>
                <input type="text" name="niveau" onChange={handleChange} className="form-control" required />
              </div>
              <div className="mb-3">
                <label className="form-label">Part Sociale %:</label>
                <input type="text" name="partSociale" onChange={handleChange} className="form-control" required />
              </div>
            </div>
          </div>
        )}

        {currentSection === 3 && (
          <div className="section mb-4">
            <h4>Administrateurs</h4>
            <div className="form-fields">
              <div className="mb-3">
                <label className="form-label">Nom et Prénom(s):</label>
                <input type="text" name="nomPrenom" onChange={handleChange} className="form-control" required />
              </div>
              <div className="mb-3">
                <label className="form-label">Date de Naissance:</label>
                <input type="text" name="dateNaissanceAdmin" onChange={handleChange} className="form-control" required />
              </div>
              <div className="mb-3">
                <label className="form-label">Lieu de Naissance:</label>
                <input type="text" name="lieuNaissanceAdmin" onChange={handleChange} className="form-control" required />
              </div>
              <div className="mb-3">
                <label className="form-label">Nationalité:</label>
                <input type="text" name="nationaliteAdmin" onChange={handleChange} className="form-control" required />
              </div>
              <div className="mb-3">
                <label className="form-label">Domicile Légal:</label>
                <input type="text" name="domicileLegalAdmin" onChange={handleChange} className="form-control" required />
              </div>
              <div className="mb-3">
                <label className="form-label">Part Sociale %:</label>
                <input type="text" name="partSocialeAdmin" onChange={handleChange} className="form-control" required />
              </div>
            </div>
          </div>
        )}

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

export default Form;
