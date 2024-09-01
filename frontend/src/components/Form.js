import React, { useState } from 'react';

const Form = ({ fileName }) => {
  const [formData, setFormData] = useState({});
  const [currentSection, setCurrentSection] = useState(1); // État pour suivre la section actuelle
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
    // Liste des champs requis pour chaque section
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
    <Acronym>${formData.formeJuridique || ''}</Acronym>
    <CountryHeadquarters></CountryHeadquarters>
    <HeadquartersCity></HeadquartersCity>
    <RecordType></RecordType>
    <POBox></POBox>
    <LegalForm>${formData.formeJuridique || ''}</LegalForm>
    <CreationDate></CreationDate>
    <Nationality>${formData.nationalite || ''}</Nationality>
    <RegistrationNumber>${formData.numeroRCCM || ''}</RegistrationNumber>
    <NifCode>${formData.codeNIF || ''}</NifCode>
    <Address>${formData.adresse || ''}</Address>
    <Phone>${formData.telephone || ''}</Phone>
    <Email>${formData.email || ''}</Email>
    <Sector>${formData.secteurActivite || ''}</Sector>
    <Capital></Capital>
    <Revenue></Revenue>
    <Employees></Employees>
    <Name>${formData.nomPrenom || ''}</Name>
    <Type></Type>
    <Nationality>${formData.nationaliteAdmin || ''}</Nationality>
    <NIF>${formData.codeNIF || ''}</NIF>
    <Address>${formData.adresse || ''}</Address>
    <Phone>${formData.telephone || ''}</Phone>
    <Email>${formData.email || ''}</Email>
    <Capital></Capital>
    <Name>${formData.nomPrenom || ''}</Name>
    <DateOfBirth>${formData.dateNaissance || ''}</DateOfBirth>
    <PlaceOfBirth>${formData.lieuNaissance || ''}</PlaceOfBirth>
    <Nationality>${formData.nationalite || ''}</Nationality>
    <DomicileLegal>${formData.domicileLegal || ''}</DomicileLegal>
    <PartSocial>${formData.partSociale || ''}</PartSocial>
    <Name>${formData.nomPrenom || ''}</Name>
    <DateOfBirth>${formData.dateNaissanceAdmin || ''}</DateOfBirth>
    <PlaceOfBirth>${formData.lieuNaissanceAdmin || ''}</PlaceOfBirth>
    <Nationality>${formData.nationaliteAdmin || ''}</Nationality>
    <DomicileLegal>${formData.domicileLegalAdmin || ''}</DomicileLegal>
</AccountOpening>
    `;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const xmlData = generateXML();
    const blob = new Blob([xmlData], { type: 'application/xml' });
    const url = URL.createObjectURL(blob);

    // Créer un lien pour télécharger le fichier XML
    const a = document.createElement('a');
    a.href = url;
    a.download = 'form-data.xml';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);

    // Optionnel : envoyer les données XML au serveur
    /*
    const response = await fetch('http://localhost:5000/api/submit-form', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/xml',
      },
      body: xmlData,
    });
    const data = await response.json();
    if (data.success) {
      alert('Form submitted successfully!');
    } else {
      alert('Form submission failed');
    }
    */
  };

  return (
    <div className="form-container">
      <h3>Fiche de connaissance de client</h3>
      <form onSubmit={handleSubmit}>
        {currentSection === 1 && (
          <div className="section">
            <h4>Identification</h4>
            <div className="form-fields">
              <label>
                Raison Sociale:
                <input type="text" name="raisonSociale" onChange={handleChange} required />
              </label>
              <label>
                Forme Juridique:
                <input type="text" name="formeJuridique" onChange={handleChange} required />
              </label>
              <label>
                Numéro RCCM:
                <input type="text" name="numeroRCCM" onChange={handleChange} required />
              </label>
              <label>
                Code NIF:
                <input type="text" name="codeNIF" onChange={handleChange} required />
              </label>
              <label>
                Adresse:
                <input type="text" name="adresse" onChange={handleChange} required />
              </label>
              <label>
                Téléphone:
                <input type="text" name="telephone" onChange={handleChange} required />
              </label>
              <label>
                Email:
                <input type="email" name="email" onChange={handleChange} required />
              </label>
              <label>
                Secteur d'Activité:
                <input type="text" name="secteurActivite" onChange={handleChange} required />
              </label>
            </div>
          </div>
        )}

        {currentSection === 2 && (
          <div className="section">
            <h4>Actionnaire / Associés</h4>
            <div className="form-fields">
              <label>
                Actionnaire:
                <input type="text" name="actionnaire" onChange={handleChange} required />
              </label>
              <label>
                Date de Naissance:
                <input type="text" name="dateNaissance" onChange={handleChange} required />
              </label>
              <label>
                Lieu de Naissance:
                <input type="text" name="lieuNaissance" onChange={handleChange} required />
              </label>
              <label>
                Nationalité:
                <input type="text" name="nationalite" onChange={handleChange} required />
              </label>
              <label>
                Domicile Légal:
                <input type="text" name="domicileLegal" onChange={handleChange} required />
              </label>
              <label>
                Dépendance:
                <input type="text" name="dependance" onChange={handleChange} required />
              </label>
              <label>
                Niveau:
                <input type="text" name="niveau" onChange={handleChange} required />
              </label>
              <label>
                Part Sociale %:
                <input type="text" name="partSociale" onChange={handleChange} required />
              </label>
            </div>
          </div>
        )}

        {currentSection === 3 && (
          <div className="section">
            <h4>Administrateurs</h4>
            <div className="form-fields">
              <label>
                Nom et Prénom(s):
                <input type="text" name="nomPrenom" onChange={handleChange} required />
              </label>
              <label>
                Date de Naissance:
                <input type="text" name="dateNaissanceAdmin" onChange={handleChange} required />
              </label>
              <label>
                Lieu de Naissance:
                <input type="text" name="lieuNaissanceAdmin" onChange={handleChange} required />
              </label>
              <label>
                Nationalité:
                <input type="text" name="nationaliteAdmin" onChange={handleChange} required />
              </label>
              <label>
                Domicile Légal:
                <input type="text" name="domicileLegalAdmin" onChange={handleChange} required />
              </label>
              <label>
                Part Sociale éventuelle (%):
                <input type="text" name="partSocialeAdmin" onChange={handleChange} required />
              </label>
            </div>
          </div>
        )}

        <div className="form-buttons">
          {currentSection < 3 && (
            <button type="button" onClick={handleNext}>Next</button>
          )}
          {currentSection === 3 && (
            <button type="submit">Submit</button>
          )}
        </div>
      </form>
    </div>
  );
};

export default Form;
