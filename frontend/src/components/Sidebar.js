import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/App.css'; // Assurez-vous que le CSS pour Sidebar est dans ce fichier

const Sidebar = ({ onLibraryClick }) => {
  const navigate = useNavigate();
  const files = ['File1', 'File2', 'File3']; // Remplacez par vos noms de fichiers réels

  const handleFileClick = (fileName) => {
    navigate(`/form/${fileName}`); // Naviguer vers la page de formulaire
  };

  return (
    <div className="sidebar">
      <h3 className="sidebar-title">Files</h3>
      <ul className="sidebar-list">
        {files.map((file, index) => (
          <li key={index} className="sidebar-item">
            <button
              className="sidebar-button"
              onClick={() => handleFileClick(file)}
            >
              {file}
            </button>
          </li>
        ))}
      </ul>
      <button className="sidebar-library-button" onClick={onLibraryClick}>
        Library
      </button>
    </div>
  );
};

export default Sidebar;
