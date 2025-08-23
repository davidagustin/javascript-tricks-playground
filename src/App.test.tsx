import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders JavaScript Tricks title', () => {
  render(<App />);
  const titleElement = screen.getByText(/JavaScript Tricks & One-Liners Tutorial/i);
  expect(titleElement).toBeInTheDocument();
});

test('renders category navigation', () => {
  render(<App />);
  const arrayCategory = screen.getByRole('button', { name: /Array Manipulation/i });
  expect(arrayCategory).toBeInTheDocument();
});

test('renders footer with tip', () => {
  render(<App />);
  const footerTip = screen.getByText(/Click on any code example to copy/i);
  expect(footerTip).toBeInTheDocument();
});