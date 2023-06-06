import React from 'react';

const SectionTitle = ({ children, dark }) => {
  return (
    <h1
      className={`text-5xl text-center mb-10 font-extrabold ${
        dark && 'text-cyan-500'
      }`}
    >
      {children}
    </h1>
  );
};

export default SectionTitle;
