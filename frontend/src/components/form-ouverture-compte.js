import React, { useState } from 'react';

const FormOuvertureCompte = () => {
  const [formData, setFormData] = useState({});
  const [currentSection, setCurrentSection] = useState(1);
  const userId = localStorage.getItem('userId');
  const [fileName] = useState('FormOuvertureCompte'); 

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
    const response = await fetch('http://localhost:5000/api/submit-form', { 
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


  const isCurrentSectionComplete = () => {
    // Liste des champs requis pour chaque section
    const requiredFields = {
      1: [
        ' ID du client', 'Sigle', 'Forme juridique', 'Date de création', 'Nationalité', ' Pays siège social', 'Ville siège social', 'Type d enregistrement',  ' Numéro d enregistrement'  , 'Code NIF'  , 'Adresse'  ,'Boite postale'  ,' Téléphone'  ,' E-mail' ,' Secteur d activité'  ,'Capital'  , 'Chiffre d affaire' ,'Effectif'  ,
      ],
      2: [
        ' Nom et prénom(s)', 'Date de naissance', ' Lieu de naissance', 'Nationalité', 'Domicile légal', 'Part sociale éventuelle (%)',
      ],
      3: [
        ' Nom et prénom(s)', 'Date de naissance', ' Lieu de naissance', 'Nationalité', ' Domicile légal',
      ],
      4: [
        'Activités prévues', ' Activités réellement exercées', '  N-1' ,  '   Année N-1' , ' N-2' , ' N-3',
      ],
      5: [
        ' Documents reçus', ' Provenance', 'Recommandation d’un tiers', 
      ],
      6: [
        'signature', 
      ],
    };

    return requiredFields[currentSection].every((field) => formData[field]);
  };




 const generateXML = () =>{ 
    return `


<AccountOpening>
    <!-- Section 1: Détails du compte -->
    <ClientID>${formData.idClient || ''}</ClientID>
    <Acronym>${formData.sigle || ''}</Acronym>
    <LegalForm>${formData.formeJuridique || ''}</LegalForm>
    <CreationDate>${formData.dateCreation || ''}</CreationDate>
    <Nationality>${formData.nationalite || ''}</Nationality>
    <CountryHeadquarters>${formData.paysSiegeSocial || ''}</CountryHeadquarters>
    <HeadquartersCity>${formData.villeSiegeSocial || ''}</HeadquartersCity>
    <RecordType>${formData.typeEnregistrement || ''}</RecordType>
    <RegistrationNumber>${formData.numeroEnregistrement || ''}</RegistrationNumber>
    <NifCode>${formData.codeNif || ''}</NifCode>
    <Address>${formData.adresse || ''}</Address>
    <POBox>${formData.boitePostale || ''}</POBox>
    <Phone>${formData.telephone || ''}</Phone>
    <Email>${formData.email || ''}</Email>
    <Sector>${formData.secteurActivite || ''}</Sector>
    <Capital>${formData.capital || ''}</Capital>
    <Revenue>${formData.chiffreAffaire || ''}</Revenue>
    <Employees>${formData.effectif || ''}</Employees>
    
    <!-- Section 2: Administrateurs -->
    <Administrator>
        <FullName>${formData.nomPrenoms || ''}</FullName>
        <DateOfBirth>${formData.dateNaissance || ''}</DateOfBirth>
        <PlaceOfBirth>${formData.lieuNaissance || ''}</PlaceOfBirth>
        <Nationality>${formData.nationaliteAdmin || ''}</Nationality>
        <LegalResidence>${formData.domicileLegal || ''}</LegalResidence>
        <SocialShare>${formData.partSociale || ''}</SocialShare>
    </Administrator>
    
    <!-- Section 3: Dirigeants -->
    <Executive>
        <FullName>${formData.nomPrenomsDirigeants || ''}</FullName>
        <DateOfBirth>${formData.dateNaissanceDirigeants || ''}</DateOfBirth>
        <PlaceOfBirth>${formData.lieuNaissanceDirigeants || ''}</PlaceOfBirth>
        <Nationality>${formData.nationaliteDirigeants || ''}</Nationality>
        <LegalResidence>${formData.domicileLegalDirigeants || ''}</LegalResidence>
    </Executive>
    
    <!-- Section 4: Origine des Capitaux Confies -->
    <CapitalOrigin>
        <PlannedActivities>${formData.activitesPrevues || ''}</PlannedActivities>
        <ActualActivities>${formData.activitesReellementExercees || ''}</ActualActivities>
        <RevenueLastYear>
            <N1>${formData.chiffreAffaireN1 || ''}</N1>
            <YearN1>${formData.anneeN1 || ''}</YearN1>
            <N2>${formData.chiffreAffaireN2 || ''}</N2>
            <N3>${formData.chiffreAffaireN3 || ''}</N3>
        </RevenueLastYear>
    </CapitalOrigin>
    
    <!-- Section 5: Pièces Jointes -->
    <AttachedDocuments>
        <DocumentsReceived>${formData.documentsRecus || ''}</DocumentsReceived>
    </AttachedDocuments>
    <OriginOfEntry>
        <Source>${formData.provenance || ''}</Source>
        <ThirdPartyRecommendation>${formData.recommandationTiers || ''}</ThirdPartyRecommendation>
    </OriginOfEntry>
    <BusinessIntroducer>
        <Name>${formData.nom || ''}</Name>
    </BusinessIntroducer>
</AccountOpening>

    return requiredFields[currentSection].every((field) => formData[field]);
  `;
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


            
            <h4 style={{ textAlign: 'center' }}>Chiffre d’affaires des trois derniers exercices</h4>
            <label>
            N-1
              <input type="text" name="activitesPrevues" onChange={handleChange} required />
            </label>

            <label>
            Année N-1
              <input type="text" name="activitesPrevues" onChange={handleChange} required />
            </label>

            <label>
            N-2
              <input type="text" name="activitesPrevues" onChange={handleChange} required />
            </label>

            <label>
            N-3
              <input type="text" name="activitesPrevues" onChange={handleChange} required />
            </label>

            <button type="button" onClick={handleNext}>
              Next
            </button>
          </div>
        )}


            {currentSection === 5 && (
          <div className="form-fields">
            <h4 style={{ textAlign: 'center' }}>PIECES JOINTES</h4>
            <label>
            Documents reçus
              <input type="text" name=" Documents reçus" onChange={handleChange} required />
            </label>
          
            <h4 style={{ textAlign: 'center' }}> ORIGINE DE L’ENTREE EN RELATION</h4>
           
            <label>
            Provenance
              <input type="text" name=" Provenance" onChange={handleChange} required />
            </label>
            <label>
            Recommandation d’un tiers
              <input type="text" name=" Recommandation d’un tiers" onChange={handleChange} required />
            </label>

            <h4 style={{ textAlign: 'center' }}> Apporteur d’affaire</h4>

            <label>
            Nom
              <input type="text" name=" Nom" onChange={handleChange} required />
            </label>



            <button type="button" onClick={handleNext}>
              Next
            </button>
          </div>
        )}






{currentSection === 6 && (
          <div className="form-fields">
           
            <p>         Nous demandons l’ouverture d’un compte au nom de notre société : SOGUIREFEL et nous confirmons que les 
informations ci-dessus sont exactes.
Toutes nos instructions seront signées par les mandataires désignés ci-haut.
DECLARATIONS
Le(s) soussignés déclarent se porter garant vis-à-vis de VISTA BANK pour toutes les conséquences pouvant 
découler d’éventuelles plaintes des membres de la société ou de leurs ayant droit concernant leur droit aux 
fonds déposés ou à la gestion de ceux-ci.
Ils déclarent expressément que les avoirs que la société détient auprès de VISTA BANK ne sont pas leur 
propriété et qu’ils n’assument la responsabilité que pour le compte de la société.
Ils reconnaissent qu’en cas décès, leurs héritiers ne peuvent prétendre à aucun droit sur les sommes déposées.
D’autres part, les soussignés certifient :
- Que les avoirs qui seront déposés sur le compte proviennent d’une activité légale et les comptes 
susvisés ne seront pas utilisés aux fins de blanchissement de capitaux
- Que les renseignements figurant sur ce document, ainsi que les annexes, sont complets, exacts et 
sincères
- Avoir reçu et lu les conditions générales et accepté toutes leurs clauses
- Agir pour compte propre de la société, et dans le cas contraire, ils déclareront à VISTA BANK l’identité 
des tiers pour lesquels ils agissent
- S’engage à signaler immédiatement toute modification d’une des informations fournies
Sous peine de parjure, j’(nous) atteste(ons) que :
 Les renseignements fournis dans ce formulaire sont véridiques, exacts et compets,
 Je(nous) suis(sommes) le(s) bénéficiaires véritable(s) (ou que je suis autorisé à signer au nom du 
bénéficiaire véritable) de tous les comptes aux quels ce formulaire fait référence.
Lieu : conakry
        </p>
            <label>
             signature 
              <input type="text" name="signature " onChange={handleChange} required />
            </label>
           
            
           
           
          </div>
        )}




          

<div className="form-buttons">
         
          {currentSection === 6 && (
            <button type="submit">Submit</button>
          )}
        </div>
      </form>
    </div>
  );
};
export default FormOuvertureCompte;
