import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Home from './components/Home';
import Library from './components/Library';
import FormPage from './components/FormPage';
import './styles/App.css';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);

  return (
    <Router>
      <Routes>
        <Route
          path="/login"
          element={<Login setIsAuthenticated={setIsAuthenticated} />}
        />
        <Route path="/register" element={<Register />} />
        <Route
          path="/"
          element={
            isAuthenticated ? (
              <Home />
            ) : (
              <Login setIsAuthenticated={setIsAuthenticated} />
            )
          }
        />
        <Route path="/library" element={<Library />} />
        <Route path="/form/:fileName" element={<FormPage />} />
      </Routes>
    </Router>
  );
};

export default App;