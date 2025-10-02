import React from 'react';

const Loader: React.FC<{ text?: string }> = ({ text = 'Loading...' }) => {
  return (
    <div className="loader" role="status" aria-live="polite">
      <div className="spinner" aria-hidden="true"></div>
      <span className="loader-text">{text}</span>
    </div>
  );
};

export default Loader;
