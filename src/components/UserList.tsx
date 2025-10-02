import React, { useState, useRef, useEffect } from 'react';
import { GitHubUser } from '../types';

interface Props {
  users: GitHubUser[];
  onSelect: (username: string) => void;
}

const UserList: React.FC<Props> = ({ users, onSelect }) => {
  const [highlight, setHighlight] = useState<number>(-1);
  const listRef = useRef<HTMLUListElement | null>(null);

  useEffect(() => setHighlight(-1), [users]);

  useEffect(() => {
    if (highlight >= 0 && listRef.current) {
      const el = listRef.current.children[highlight] as HTMLElement | undefined;
      el?.focus();
    }
  }, [highlight]);

  const keyHandler = (e: React.KeyboardEvent, idx: number) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setHighlight((h) => Math.min(h + 1, users.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setHighlight((h) => Math.max(h - 1, 0));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      onSelect(users[idx].login);
    }
  };

  if (users.length === 0) return null;

  return (
    <div className="userlist-container">
      <h2>Users</h2>
      <ul ref={listRef} className="user-list" role="listbox" aria-label="Search results">
        {users.map((u, i) => (
          <li
            key={u.id}
            tabIndex={0}
            role="option"
            aria-selected={highlight === i}
            className={`user-item ${highlight === i ? 'active' : ''}`}
            onClick={() => onSelect(u.login)}
            onKeyDown={(e) => keyHandler(e, i)}
            onMouseEnter={() => setHighlight(i)}
          >
            <img src={u.avatar_url} alt={`${u.login} avatar`} className="avatar" />
            <div className="meta">
              <div className="login">{u.login}</div>
              <a href={u.html_url} target="_blank" rel="noopener noreferrer" className="small">
                View profile
              </a>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;
