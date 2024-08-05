import React, { useState, useEffect } from 'react';
import { RiLogoutCircleRLine } from "react-icons/ri";
import Sidebar from './Sidebar';
import Dashboard from './Dashboard'; // Importation du Dashboard
//import Library from './Library'; // Importation du Library pour obtenir les données statistiques
import '../styles/App.css'; // Assurez-vous que le CSS pour Home est dans ce fichier
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [stats, setStats] = useState([]); // État pour les statistiques
  const navigate = useNavigate();

  useEffect(() => {
    // Fonction pour récupérer les données de la bibliothèque pour les statistiques
    const fetchFormStats = async () => {
      const response = await fetch('http://localhost:5000/api/forms');
      const data = await response.json();

      // Exemple de statistique : nombre total de formulaires
      const fileCount = data.forms.length;

      // Préparer les statistiques pour le graphique
      const formattedStats = [
        { month: 'Total', count: fileCount }
      ];

      setStats(formattedStats);
    };

    fetchFormStats();
  }, []);

  const handleFileClick = (fileName) => {
    setSelectedFile(fileName);
  };

  const handleLibraryClick = () => {
    navigate('/library');
  };

  const handleLogoutClick = () => {
    // Remettre l'état d'authentification à false
    localStorage.removeItem('isAuthenticated');
    navigate('/login');
  };

  return (
    <div className="home-container">
      <div className="header">
        <div className="header-content">
          <button onClick={handleLogoutClick} className="logout-button">Logout</button>
          <RiLogoutCircleRLine />
        </div>
      </div>
      <Sidebar onFileClick={handleFileClick} onLibraryClick={handleLibraryClick} />
      <div className="main-content">
        <div className="content-header">
          <h1 className="content-title">
            {selectedFile ? `Editing ${selectedFile}` : 'Welcome!'}
          </h1>
        </div>
        <div className="content-body">
          <Dashboard selectedFile={selectedFile} stats={stats} />
        </div>
      </div>
    </div>
  );
};

export default Home;
