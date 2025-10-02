# GitHub Repositories Explorer

A React + TypeScript application to search GitHub users and explore their repositories.  
Built as part of a coding test requirement.

---

## 🚀 Features

- Search GitHub users by username (using GitHub REST API v3).
- Shows up to **5 matching users**.
- Click a user → see **all public repositories** of that user.
- Error handling and loading states.
- Responsive (mobile-friendly).
- Supports **keyboard navigation** (press Enter to search).
- Includes **unit and integration tests** with React Testing Library & Jest.

---

## 📂 Project Structure

```
src/
  components/
    SearchBar.tsx
    UserList.tsx
    RepoList.tsx
  types/
    index.ts
  App.tsx
  index.tsx
tests/
  SearchBar.test.tsx
  App.test.tsx
```

---

## 🛠️ Tech Stack

- **React 18**
- **TypeScript**
- **Jest** (for unit & integration tests)
- **React Testing Library** (testing utilities)
- **CSS**

---

## ⚙️ Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/<your-username>/github-repo-explorer.git
   cd github-repo-explorer
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

4. Open your browser:
   ```
   http://localhost:3000
   ```

---

## 🔍 Usage

1. Type a GitHub username in the search bar.
2. Press **Enter** or click **Search**.
3. Up to 5 matching users will appear.
4. Click a user to load their repositories.

---

## ✅ Testing

We use **Jest + React Testing Library**.

### Run all tests:
```bash
npm test
```

### Example Unit Test (SearchBar)
```tsx
it('calls onSearch when pressing Enter', () => {
  const mockSearch = jest.fn();
  render(<SearchBar onSearch={mockSearch} />);
  const input = screen.getByRole('textbox', { name: /search github users/i });

  fireEvent.change(input, { target: { value: 'octocat' } });
  fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' });

  expect(mockSearch).toHaveBeenCalledWith('octocat');
});
```

### Example Integration Test (App)
```tsx
it('searches users and shows results', async () => {
  (fetch as jest.Mock).mockResolvedValueOnce({
    ok: true,
    json: async () => ({
      items: [{ login: 'octocat', id: 1, avatar_url: 'avatar.png', html_url: 'https://github.com/octocat' }]
    }),
  });

  render(<App />);
  const input = screen.getByRole('textbox', { name: /search github users/i });
  fireEvent.change(input, { target: { value: 'octocat' } });
  fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' });

  expect(await screen.findByText(/octocat/)).toBeInTheDocument();
});
```

---

## 🌍 Deployment

The app is deployed and publicly accessible at:  
👉 **[Live Demo on Vercel](https://git-hub-repositories-explorer-five.vercel.app/)**

Example (GitHub Pages local preview):
```bash
npm run build
npm install -g serve
serve -s build
```

---

## 🧩 Improvements (Future Work)

- Add pagination for repositories.
- Implement caching (React Query).
- Add more filters (by language, stars).
- Write more integration tests.

---

## 👨‍💻 Author

Built by **Ridho Anugrah Putra** ✨
