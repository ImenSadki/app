import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter as Router } from 'react-router-dom';
import Login from '../Login';

describe('Login Component', () => {
  let setIsAuthenticated;

  beforeEach(() => {
    setIsAuthenticated = jest.fn();
    render(
      <Router>
        <Login setIsAuthenticated={setIsAuthenticated} />
      </Router>
    );
  });

  test('renders Login component', () => {
    const titleElement = screen.getByText(/login/i);
    expect(titleElement).toBeInTheDocument();
  });

  test('submits the form successfully', () => {
    const submitButton = screen.getByRole('button', { name: /login/i });

    // Simuler la saisie des informations
    fireEvent.change(screen.getByPlaceholderText(/enter your username/i), { target: { value: 'testuser' } });
    fireEvent.change(screen.getByPlaceholderText(/enter your password/i), { target: { value: 'password' } });

    fireEvent.click(submitButton);

    expect(setIsAuthenticated).toHaveBeenCalledWith(true);
    expect(localStorage.getItem('userId')).toBe('123'); // Assurez-vous que la valeur correspond à ce qui est attendu
  });
});
