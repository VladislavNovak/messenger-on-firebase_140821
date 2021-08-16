import React from 'react';
import './loader.scss';

const Loader = () => {
  return (
    <div className="loader__wrapper">
      <div className="loader__container">
        <span className="loadtext">LOADING</span>
        <div className="spinner"></div>
      </div>
    </div>
  );
};

export default Loader;
