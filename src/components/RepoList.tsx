import React from 'react';
import { GitHubRepo } from '../types';

interface Props {
  repos: GitHubRepo[];
}

const RepoList: React.FC<Props> = ({ repos }) => {
  if (!repos || repos.length === 0) return <div className="empty">No repositories to show.</div>;

  return (
    <div className="repo-container">
      <h2>Repositories ({repos.length})</h2>
      <ul className="repo-list">
        {repos.map((r) => (
          <li key={r.id} className="repo-item">
            <a href={r.html_url} target="_blank" rel="noopener noreferrer" className="repo-name">
              {r.name}
            </a>
            {r.description && <p className="repo-desc">{r.description}</p>}
            <div className="repo-meta">
              <span>{r.language ?? '—'}</span>
              <span>★ {r.stargazers_count}</span>
              <span>Forks: {r.forks_count}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RepoList;
