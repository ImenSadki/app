import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaRegUser } from "react-icons/fa";
import { RiLockPasswordLine } from "react-icons/ri";
import '../styles/App.css';

const Login = ({ setIsAuthenticated }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const response = await fetch('http://localhost:5000/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });
    const data = await response.json();
    if (data.success) {
      setIsAuthenticated(true);
      localStorage.setItem('userId', data.userId); // Save userId in local storage
      navigate('/');
    } else {
      setError(data.message);
    }
  };

  return (
    <div className="container login-container">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div className="input-group">
          <label>Username</label>
          <div className="input-wrapper">
            <input 
              type="text"
              value={username} 
              onChange={(e) => setUsername(e.target.value)}
              placeholder='write your username'
              required
            />
            <FaRegUser className="icon" />
          </div>
        </div>
        <div className="input-group">
          <label>Password</label>
          <div className="input-wrapper">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder='write your password'
              required
            />
            <RiLockPasswordLine className="icon" />
          </div>
        </div>
        <button type="submit">Login</button>
        {error && <p className="alert">{error}</p>}
      </form>
      <p>
        Don't have an account? <Link to="/register">Register</Link>
      </p>
    </div>
  );
};

export default Login;
