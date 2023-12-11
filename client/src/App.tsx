import React from 'react';
import logo from './logo.svg';
import './App.css';

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { LandingPage, LandingPageBlank  } from './pages';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* <Route path="/" element={<LandingPage/>}/> */}
        <Route path="/" element={<LandingPageBlank/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
