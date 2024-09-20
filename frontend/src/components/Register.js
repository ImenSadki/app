import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { MdOutlineEmail } from "react-icons/md";
import { FaRegUser } from "react-icons/fa";
import { RiLockPasswordLine } from "react-icons/ri";
import 'bootstrap/dist/css/bootstrap.min.css';
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
    <div className="container register-container mt-5">
      <div className="card shadow">
        <div className="card-body">
          <h2 className="text-center mb-4">Create Account</h2>
          <form onSubmit={handleRegister}>
            <div className="mb-3">
              <label className="form-label">Email</label>
              <div className="input-group">
                <input
                  type="email"
                  className="form-control"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder='Enter your email'
                  required
                />
                <span className="input-group-text"><MdOutlineEmail /></span>
              </div>
            </div>
            <div className="mb-3">
              <label className="form-label">Username</label>
              <div className="input-group">
                <input
                  type="text"
                  className="form-control"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder='Enter your username'
                  required
                />
                <span className="input-group-text"><FaRegUser /></span>
              </div>
            </div>
            <div className="mb-3">
              <label className="form-label">Password</label>
              <div className="input-group">
                <input
                  type="password"
                  className="form-control"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder='Enter your password'
                  required
                />
                <span className="input-group-text"><RiLockPasswordLine /></span>
              </div>
            </div>
            <button type="submit" className="btn btn-primary w-100">Register</button>
            {error && <p className="alert alert-danger mt-3">{error}</p>}
          </form>
          <p className="text-center mt-3">
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
