import React from 'react';
import { Line, Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend } from 'chart.js';
import '../styles/App.css'; 

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend);

const Dashboard = ({ selectedFile, stats }) => {

  const fileData = {
    labels: stats.map(stat => stat.label), 
    datasets: [
      {
        label: 'Number of Files',
        data: stats.map(stat => stat.fileCount), 
        fill: false,
        borderColor: '#4caf50',
        tension: 0.1
      }
    ]
  };

  const userData = {
    labels: ['Total Users'], 
    datasets: [
      {
        label: 'Number of Users',
        data: [stats.reduce((total, stat) => total + stat.userCount, 0)], 
        backgroundColor: '#2196f3',
        borderColor: '#2196f3',
        borderWidth: 1
      }
    ]
  };

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
    <div className="dashboard container mt-4">
      <h2 className="text-center mb-4">Dashboard</h2>
      <div className="alert alert-info text-center">
        Selected File: {selectedFile || 'None'}
      </div>
      
      <div className="row">
        <div className="col-lg-6 col-md-12 mb-4">
          <div className="card">
            <div className="card-body">
              <h3 className="card-title text-center">Files Statistics</h3>
              <div style={{ height: '300px' }}>
                <Line data={fileData} options={commonOptions} />
              </div>
            </div>
          </div>
        </div>
        
        <div className="col-lg-6 col-md-12 mb-4">
          <div className="card">
            <div className="card-body">
              <h3 className="card-title text-center">Users Statistics</h3>
              <div style={{ height: '300px' }}>
                <Bar data={userData} options={commonOptions} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
