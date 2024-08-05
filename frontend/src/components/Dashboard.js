import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import '../styles/App.css'; // Assurez-vous que le CSS pour Dashboard est dans ce fichier

// Enregistrez les composants nécessaires dye Chart.js
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const Dashboard = ({ selectedFile, stats }) => {
  // Préparer les données pour le graphique
  const data = {
    labels: stats.map(stat => stat.month),
    datasets: [
      {
        label: 'Number of Files',
        data: stats.map(stat => stat.count),
        fill: false,
        borderColor: '#4caf50',
        tension: 0.1
      }
    ]
  };

  return (
    <div className="dashboard">
      <div className="dashboard-section">
        <h2 className="dashboard-title">Dashboard</h2>
        <div className="dashboard-stat">Selected File: {selectedFile || 'None'}</div>
        <div className="dashboard-chart">
          <Line data={data} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
