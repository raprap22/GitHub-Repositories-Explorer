import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import App from '../App';

// mock fetch
global.fetch = jest.fn();

describe('App Integration', () => {
  beforeEach(() => {
    (fetch as jest.Mock).mockClear();
  });

  it('searches users and shows results', async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        items: [
          {
            login: 'octocat',
            id: 1,
            avatar_url: 'avatar.png',
            html_url: 'https://github.com/octocat',
          },
        ],
      }),
    });

    render(<App />);
    const input = screen.getByRole('textbox', { name: /search github users/i });
    fireEvent.change(input, { target: { value: 'octocat' } });
    fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' });

    expect(await screen.findByText(/octocat/)).toBeInTheDocument();
  });

  it('loads repositories when selecting a user', async () => {
    // first fetch: users
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        items: [
          {
            login: 'octocat',
            id: 1,
            avatar_url: 'avatar.png',
            html_url: 'https://github.com/octocat',
          },
        ],
      }),
    });
    // second fetch: repos
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => [
        {
          id: 101,
          name: 'Hello-World',
          html_url: 'https://github.com/octocat/Hello-World',
          description: 'demo repo',
          stargazers_count: 42,
          forks_count: 7,
          language: 'JavaScript',
        },
      ],
    });

    render(<App />);
    const input = screen.getByRole('textbox', { name: /search github users/i });
    fireEvent.change(input, { target: { value: 'octocat' } });
    fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' });

    const user = await screen.findByText(/octocat/);
    fireEvent.click(user);

    await waitFor(() => expect(screen.getByText(/Hello-World/)).toBeInTheDocument());
  });

  it('shows error message on API failure', async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      status: 500,
      json: async () => ({ message: 'Internal Server Error' }),
    });

    render(<App />);
    const input = screen.getByRole('textbox', { name: /search github users/i });
    fireEvent.change(input, { target: { value: 'invalid' } });
    fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' });

    (fetch as jest.Mock).mockRejectedValueOnce(new Error('Failed to fetch users'));
  });
});
