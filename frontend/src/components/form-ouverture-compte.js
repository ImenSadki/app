import React, { useState } from 'react';

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
      alert('Please fill in all fields before proceeding to the next section.');
    }
  };

  const isCurrentSectionComplete = () => {
    const requiredFields = {
        1: [
            'idClient', 'sigle', 'formeJuridique', 'dateCreation', 'nationalite', 'paysSiegeSocial', 'villeSiegeSocial',
            'typeEnregistrement', 'numeroEnregistrement', 'codeNif', 'adresse', 'boitePostale', 'telephone', 'email',
            'secteurActivite', 'capital', 'chiffreAffaire', 'effectif'
        ],
        2: [
            'nomPrenoms', 'dateNaissance', 'lieuNaissance', 'nationaliteAdmin', 'domicileLegal', 'partSociale'
        ],
        3: [
            'nomPrenomsDirigeants', 'dateNaissanceDirigeants', 'lieuNaissanceDirigeants', 'nationaliteDirigeants', 'domicileLegalDirigeants',
            
            'nomPrenomsDirigeants', 'dateNaissanceDirigeants', 'lieuNaissanceDirigeants', 'nationaliteDirigeants', 'domicileLegalDirigeants'
        ],
        4: [
            'activitesPrevues', 'activitesReellementExercees', 'chiffreAffaireN1', 'anneeN1', 'chiffreAffaireN2', 'chiffreAffaireN3'
        ],
        5: [
            'documentsRecus', 'provenance', 'recommandationTiers', 'nom'
        ],
        6: [
            'signature'
        ],
    };

    const currentFields = requiredFields[currentSection] || [];
    return currentFields.every(field => formData[field]);
};




const generateXML = () => {
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
    ${currentSection === 2 ? `
    <Administrator>
        <FullName>${formData.nomPrenoms || ''}</FullName>
        <DateOfBirth>${formData.dateNaissance || ''}</DateOfBirth>
        <PlaceOfBirth>${formData.lieuNaissance || ''}</PlaceOfBirth>
        <Nationality>${formData.nationaliteAdmin || ''}</Nationality>
        <LegalResidence>${formData.domicileLegal || ''}</LegalResidence>
        <SocialShare>${formData.partSociale || ''}</SocialShare>
    </Administrator>
    ` : ''}
    
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
    
    <!-- Section 6: Signature -->
    <Signature>${formData.signature || ''}</Signature>
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
  };

  return (
    <div className="form-container">
      <h3>Formulaire d'Ouverture de Compte</h3>
      <form onSubmit={handleSubmit}>

        {/* Section 1: Détails du compte */}
        {currentSection === 1 && (
          <div className="form-fields">
            <h4 style={{ textAlign: 'center' }}>IDENTIFICATION</h4>
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
              <input type="number" name="capital" onChange={handleChange} required />
            </label>
            <label>
              Chiffre d'affaire
              <input type="number" name="chiffreAffaire" onChange={handleChange} required />
            </label>
            <label>
              Effectif
              <input type="number" name="effectif" onChange={handleChange} required />
            </label>
          </div>
        )}

       
        {currentSection === 2 && (
          <div className="form-fields">
            <h4 style={{ textAlign: 'center' }}> ACTIONNAIRES / ASSOCIES</h4>
            <label>
              Nom et prénoms
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
              Part sociale
              <input type="text" name="partSociale" onChange={handleChange} required />
            </label>
          </div>
        )}

       
        {currentSection === 3 && (
          <div className="form-fields">
 <h4 style={{ textAlign: 'center' }}>ADMINISTRATEURS</h4>

            <label>
              Nom et prénoms
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

            <h4 style={{ textAlign: 'center' }}>DIRIGEANTS</h4>
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
          </div>
        )}

        {/* Section 4: Origine des Capitaux Confies */}
        {currentSection === 4 && (
          <div className="form-fields">
             
             <h4 style={{ textAlign: 'center' }}>ORIGINE DES CAPITAUX CONFIES</h4>

            <label>
              Activités prévues
              <input type="text" name="activitesPrevues" onChange={handleChange} required />
            </label>
            <label>
              Activités réellement exercées
              <input type="text" name="activitesReellementExercees" onChange={handleChange} required />
            </label>
            <h5 style={{ textAlign: 'center' }}> Chiffre d’affaires des trois derniers exercices</h5>
           
            <label>
              Chiffre d'affaires N-1
              <input type="number" name="chiffreAffaireN1" onChange={handleChange} required />
            </label>
            <label>
              Année N-1
              <input type="number" name="anneeN1" onChange={handleChange} required />
            </label>
            <label>
              Chiffre d'affaires N-2
              <input type="number" name="chiffreAffaireN2" onChange={handleChange} required />
            </label>
            <label>
              Chiffre d'affaires N-3
              <input type="number" name="chiffreAffaireN3" onChange={handleChange} required />
            </label>
          </div>
        )}

        {/* Section 5: Pièces Jointes */}
        {currentSection === 5 && (
          <div className="form-fields">

<h4 style={{ textAlign: 'center' }}> PIECES JOINTES</h4>
            <label>
            Documents reçus
              <input type="text" name="documentsRecus" onChange={handleChange} required />
            </label>
            <h4 style={{ textAlign: 'center' }}> ORIGINE DE L’ENTREE EN RELATION</h4>
            
            <label>
              Provenance
              <input type="text" name="provenance" onChange={handleChange} required />
            </label>
            <label>
              Recommandation d'un tiers
              <input type="text" name="recommandationTiers" onChange={handleChange} required />
            </label>
            <h5 style={{ textAlign: 'center' }}>  Apporteur d’affaire</h5>
            <label>
              Nom
              <input type="text" name="nom" onChange={handleChange} required />
            </label>
          </div>
        )}

        {/* Section 6: Signature */}
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
              Signature
              <input type="text" name="signature" onChange={handleChange} required />
            </label>
          </div>
        )}

        <div className="form-navigation">
          {currentSection > 1 && <button type="button" onClick={() => setCurrentSection(currentSection - 1)}>Previous</button>}
          {currentSection < 6 && <button type="button" onClick={handleNext}>Next</button>}
          {currentSection === 6 && <button type="submit">Submit</button>}
        </div>
      </form>
    </div>
  );
};

export default FormOuvertureCompte;
