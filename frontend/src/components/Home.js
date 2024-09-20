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
    <div className="container-fluid">
      <div className="row">
        
        {/* Sidebar */}
        <div className="col-md-3 p-0 bg-dark">
          <Sidebar onFileClick={handleFileClick} onLibraryClick={handleLibraryClick} />
        </div>
        
        {/* Main Content */}
        <div className="col-md-9">
          <div className="d-flex justify-content-between align-items-center p-3 bg-light border-bottom">
            <h1 className="h3">
              {selectedFile ? `Editing ${selectedFile}` : 'Welcome!'}
            </h1>
            <button onClick={handleLogoutClick} className="btn btn-danger">
              Logout <RiLogoutCircleRLine />
            </button>
          </div>
          
          {/* Dashboard */}
          <div className="p-4">
            <Dashboard selectedFile={selectedFile} stats={stats} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
