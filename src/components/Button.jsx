import React from 'react';

export default function Button({ color, text, type = 'button', onClick }) {
  return (
    <button
      type={type}
      className=
      {`my-6 rounded-lg bg-${color}-700 px-5 py-2.5 
      text-center text-sm font-medium text-white hover:bg-${color}-800 focus:outline-none 
      focus:ring-4 focus:ring-${color}-300`}

      onClick={onClick}
    >
      {text}
    </button>
  );
};
