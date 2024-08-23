import React from 'react';
import { Line, Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend } from 'chart.js';
import '../styles/App.css'; // Assurez-vous que le CSS pour Dashboard est dans ce fichier

// Enregistrez les composants nécessaires de Chart.js
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend);

const Dashboard = ({ selectedFile, stats }) => {
  // Préparer les données pour le graphique en courbe des fichiers
  const fileData = {
    labels: stats.map(stat => stat.label), // Modifiez ceci selon vos données
    datasets: [
      {
        label: 'Number of Files',
        data: stats.map(stat => stat.fileCount), // Modifiez ceci selon vos données
        fill: false,
        borderColor: '#4caf50',
        tension: 0.1
      }
    ]
  };

  // Préparer les données pour le graphique en barres des utilisateurs
  const userData = {
    labels: ['Total Users'], // Utilisez un seul label pour le total des utilisateurs
    datasets: [
      {
        label: 'Number of Users',
        data: [stats.reduce((total, stat) => total + stat.userCount, 0)], // Calculez le total des utilisateurs
        backgroundColor: '#2196f3',
        borderColor: '#2196f3',
        borderWidth: 1
      }
    ]
  };

  // Options pour les graphiques
  const commonOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true
      },
      tooltip: {
        callbacks: {
          label: (context) => `Count: ${context.raw}`
        }
      }
    },
    scales: {
      x: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Labels'
        }
      },
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Counts'
        }
      }
    }
  };

  return (
    <div className="dashboard">
      <div className="dashboard-section">
        <h2 className="dashboard-title">Dashboard</h2>
        <div className="dashboard-stat">Selected File: {selectedFile || 'None'}</div>
        <div className="dashboard-charts-container">
          <div className="dashboard-chart">
            <h3>Files Statistics</h3>
            <Line data={fileData} options={commonOptions} />
          </div>
          <div className="dashboard-chart">
            <h3>Users Statistics</h3>
            <Bar data={userData} options={commonOptions} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
