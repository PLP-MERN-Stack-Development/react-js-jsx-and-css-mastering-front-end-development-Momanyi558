import React from 'react';

const Button = ({ children, onClick, className }) => {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-lg shadow text-white bg-indigo-500 hover:bg-indigo-600 transition-all duration-300 transform hover:scale-105 ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
