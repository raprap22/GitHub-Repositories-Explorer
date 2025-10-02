import React, { useState, useRef, useEffect } from 'react';
import SearchBar from './components/SearchBar';
import UserList from './components/UserList';
import RepoList from './components/RepoList';
import Loader from './components/Loader';
import { searchUsers, getUserRepos } from './api/github';
import { GitHubUser, GitHubRepo } from './types';

const App: React.FC = () => {
  const [users, setUsers] = useState<GitHubUser[]>([]);
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [loadingUsers, setLoadingUsers] = useState(false);
  const [loadingRepos, setLoadingRepos] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedUser, setSelectedUser] = useState<string | null>(null);

  const usersControllerRef = useRef<AbortController | null>(null);
  const reposControllerRef = useRef<AbortController | null>(null);

  useEffect(() => {
    return () => {
      usersControllerRef.current?.abort();
      reposControllerRef.current?.abort();
    };
  }, []);

  const handleSearch = async (query: string) => {
    if (!query) {
      setUsers([]);
      setRepos([]);
      setSelectedUser(null);
      return;
    }
    setError(null);
    setLoadingUsers(true);
    setUsers([]);
    setRepos([]);
    setSelectedUser(null);

    usersControllerRef.current?.abort();
    const controller = new AbortController();
    usersControllerRef.current = controller;

    try {
      const res = await searchUsers(query, controller.signal);
      setUsers(res);
    } catch (err: any) {
      if (err.name === 'AbortError') return;
      setError(err.message || 'Failed to fetch users');
    } finally {
      setLoadingUsers(false);
    }
  };

  const handleSelectUser = async (username: string) => {
    setError(null);
    setSelectedUser(username);
    setRepos([]);
    setLoadingRepos(true);

    reposControllerRef.current?.abort();
    const controller = new AbortController();
    reposControllerRef.current = controller;

    try {
      const data = await getUserRepos(username, controller.signal);
      setRepos(data);
    } catch (err: any) {
      if (err.name === 'AbortError') return;
      setError(err.message || 'Failed to fetch repositories');
    } finally {
      setLoadingRepos(false);
    }
  };

  return (
    <div className="app">
      <header className="header">
        <h1>GitHub Repositories Explorer</h1>
        <p className="sub">
          Search up to 5 users, then click a user to view all public repositories.
        </p>
      </header>

      <main className="main">
        <section className="left">
          <SearchBar onSearch={handleSearch} loading={loadingUsers} />
          {loadingUsers && <Loader text="Searching users..." />}
          {error && <div className="error">{error}</div>}
          <UserList users={users} onSelect={handleSelectUser} />
        </section>

        {selectedUser && (
          <section className="right">
            {loadingRepos && <Loader text="Loading repositories..." />}
            {!loadingRepos && repos.length > 0 && <RepoList repos={repos} />}
            {!loadingRepos && selectedUser && repos.length === 0 && (
              <div className="empty">No repositories found for this user.</div>
            )}
          </section>
        )}
      </main>
    </div>
  );
};

export default App;
