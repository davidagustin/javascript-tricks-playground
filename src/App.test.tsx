import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';
import { FavoritesProvider } from './contexts/FavoritesContext';

test('renders JavaScript Tricks title', () => {
  render(
    <FavoritesProvider>
      <App />
    </FavoritesProvider>
  );
  const titleElement = screen.getByText(/JavaScript Tricks & One-Liners Tutorial/i);
  expect(titleElement).toBeInTheDocument();
});

test('renders category navigation', () => {
  render(
    <FavoritesProvider>
      <App />
    </FavoritesProvider>
  );
  const arrayCategory = screen.getByRole('button', { name: /Array Manipulation/i });
  expect(arrayCategory).toBeInTheDocument();
});

test('renders footer with tip', () => {
  render(
    <FavoritesProvider>
      <App />
    </FavoritesProvider>
  );
  const footerTip = screen.getByText(/Click on any code example to copy/i);
  expect(footerTip).toBeInTheDocument();
});