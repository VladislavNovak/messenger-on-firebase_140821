import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Navbar } from './components';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
    </BrowserRouter>
  );
}

export default App;
