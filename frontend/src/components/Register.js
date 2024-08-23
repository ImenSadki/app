import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { MdOutlineEmail } from "react-icons/md";
import { FaRegUser } from "react-icons/fa";
import { RiLockPasswordLine } from "react-icons/ri";
import '../styles/App.css';

const Register = () => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    const response = await fetch('http://localhost:5000/api/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password, email }),
    });
    const data = await response.json();
    if (data.success) {
      navigate('/login');
    } else {
      setError(data.message);
    }
  };

  return (
    <div className="container register-container">
      <h2>Register</h2>
      <form onSubmit={handleRegister}>
        <div className="input-group">
          <label>Email</label>
          <div className="input-wrapper">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder='write your email'
              required
            />
            <MdOutlineEmail className="icon" />
          </div>
        </div>
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
        <button type="submit">Register</button>
        {error && <p className="alert">{error}</p>}
      </form>
      <p>
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </div>
  );
};

export default Register;
