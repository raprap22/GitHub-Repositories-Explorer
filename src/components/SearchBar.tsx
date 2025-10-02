import React, { useState, useEffect } from 'react';

interface Props {
  onSearch: (q: string) => void;
  loading?: boolean;
}

const SearchBar: React.FC<Props> = ({ onSearch, loading = false }) => {
  const [input, setInput] = useState('');

  useEffect(() => {
    const t = setTimeout(() => {
      const trimmed = input.trim();
      if (trimmed.length > 0) onSearch(trimmed);
    }, 450);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [input]);

  return (
    <div className="searchbar">
      <input
        id="search"
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Enter Username"
        className="input"
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            e.preventDefault();
            onSearch(input.trim());
          }
        }}
        aria-label="Search GitHub users"
      />
      <button
        className="btn"
        onClick={() => onSearch(input.trim())}
        disabled={loading}
        aria-label="Search button"
      >
        {loading ? 'Searching...' : 'Search'}
      </button>
    </div>
  );
};

export default SearchBar;
