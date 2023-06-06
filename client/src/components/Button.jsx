import React from 'react';

const Button = ({ children }) => {
  return (
    <button className='text-white py-1 px-6 text-xl bg-pink-600 font-bold rounded hover:bg-cyan-400 transition-all hover:text-pink-800'>
      {children}
    </button>
  );
};

export default Button;
