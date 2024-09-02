import React from 'react';
import { useNavigate } from 'react-router-dom';
import { IoHomeSharp } from "react-icons/io5";
import '../styles/App.css';
import { FaFileAlt } from "react-icons/fa";

const Sidebar = ({ onLibraryClick }) => {
  const navigate = useNavigate();

  const files = ['Fiche de connaissance de client', 'Formulaire d’ouvarture de compte ', 'File3'];

  const handleFileClick = (fileName) => {
 
    if (fileName === 'Formulaire d’ouvarture de compte ') {

 

      navigate(`/form-ouverture-compte`); 
    } else {
      navigate(`/form/${fileName}`);
    }
  };

  return (
    <div className="sidebar">
      <h3 className="sidebar-title"><IoHomeSharp />Home</h3>
      <ul className="sidebar-list">
        {files.map((file, index) => (
          
          <li key={index} className="sidebar-item">
          
            <button className="sidebar-button" onClick={() => handleFileClick(file)}   >
            <FaFileAlt />
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
