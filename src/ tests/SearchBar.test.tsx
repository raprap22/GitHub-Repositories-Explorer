import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import SearchBar from '../components/SearchBar';

describe('SearchBar', () => {
  it('renders input and button', () => {
    render(<SearchBar onSearch={() => {}} />);
    expect(screen.getByRole('textbox', { name: /search github users/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /search/i })).toBeInTheDocument();
  });

  it('calls onSearch when pressing Enter', () => {
    const mockSearch = jest.fn();
    render(<SearchBar onSearch={mockSearch} />);
    const input = screen.getByRole('textbox', { name: /search github users/i });

    fireEvent.change(input, { target: { value: 'octocat' } });
    fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' });

    expect(mockSearch).toHaveBeenCalledWith('octocat');
  });

  it('calls onSearch when clicking Search button', () => {
    const mockSearch = jest.fn();
    render(<SearchBar onSearch={mockSearch} />);
    const input = screen.getByRole('textbox', { name: /search github users/i });
    const button = screen.getByRole('button', { name: /search/i });

    fireEvent.change(input, { target: { value: 'testuser' } });
    fireEvent.click(button);

    expect(mockSearch).toHaveBeenCalledWith('testuser');
  });
});
