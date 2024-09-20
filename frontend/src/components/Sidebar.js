import React from 'react';
import { useNavigate } from 'react-router-dom';
import { IoHomeSharp } from "react-icons/io5";
import '../styles/App.css';
import { FaFileAlt } from "react-icons/fa";

const Sidebar = ({ onLibraryClick }) => {
  const navigate = useNavigate();

  const files = ['Fiche de connaissance de client', 'Formulaire d’ouvarture de compte '];

  const handleFileClick = (fileName) => {
    if (fileName === 'Formulaire d’ouvarture de compte ') {
      navigate(`/form-ouverture-compte`);
    } else {
      navigate(`/form/${fileName}`);
    }
  };

  return (
    <div className="sidebar bg-dark text-light p-3">
      <h3 className="sidebar-title d-flex align-items-center mb-4">
        <IoHomeSharp className="me-2" /> Home
      </h3>
      <ul className="sidebar-list list-unstyled">
        {files.map((file, index) => (
          <li key={index} className="sidebar-item mb-3">
            <button 
              className="sidebar-button btn btn-outline-light d-flex align-items-center w-100"
              onClick={() => handleFileClick(file)}
            >
              <FaFileAlt className="me-2" />
              {file}
            </button>
          </li>
        ))}
      </ul>
      <button 
        className="sidebar-library-button btn btn-success w-100 mt-3" 
        onClick={onLibraryClick}
      >
        Library
      </button>
    </div>
  );
};

export default Sidebar;
