import React, { useState, useEffect } from 'react';
import { RiLogoutCircleRLine } from "react-icons/ri";
import Sidebar from './Sidebar';
import Dashboard from './Dashboard'; 
import '../styles/App.css'; 
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [stats, setStats] = useState([]); 
  const navigate = useNavigate();

  useEffect(() => {

    const fetchStats = async () => {
      try {
        const formResponse = await fetch('http://localhost:5000/api/forms');
        const formData = await formResponse.json();
        const fileCount = formData.forms.length;

        const userResponse = await fetch('http://localhost:5000/api/users/count');
        const userData = await userResponse.json();
        const userCount = userData.count;

        const formattedStats = [
          { label: 'Total Files', fileCount: fileCount },
          { label: 'Total Users', userCount: userCount }
        ];

        setStats(formattedStats);
      } catch (error) {
        console.error('Failed to fetch statistics:', error);
      }
    };

    fetchStats();
  }, []);

  const handleFileClick = (fileName) => {
    setSelectedFile(fileName);
  };

  const handleLibraryClick = () => {
    navigate('/library');
  };

  const handleLogoutClick = () => {
   
    localStorage.removeItem('isAuthenticated');
    navigate('/login');
  };

  return (
    <div className="home-container">
      <div className="header">
        <div className="header-content">
       
          <button onClick={handleLogoutClick} className="logout-button"   >Logout       <RiLogoutCircleRLine /></button>
          
        </div>
      </div>
      <Sidebar onFileClick={handleFileClick} onLibraryClick={handleLibraryClick} />
      <div className="main-content">
        <div className="content-header"  >
    
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
