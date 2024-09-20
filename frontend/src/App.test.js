import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

describe('App Component', () => {
  test('renders App component', () => {
    render(<App />);
    expect(screen.getByText(/login/i)).toBeInTheDocument(); // Remplacez par le texte exact présent dans votre composant
  });
});
