import React from 'react';
import { Routes, Route, Link, useMatch } from 'react-router-dom';
import { StepOne } from 'pages/StepOne';
import { StepTwo } from 'pages/StepTwo';
import './App.css';

export const App = () => {
  const isHome = useMatch('/');
  return (
    <div className="App">
      <header className="App-header">
        <nav className="App-nav">
          <Link to="/">{isHome ? 'Here' : 'There'}</Link>
          <Link to="/two">{isHome ? 'There' : 'Here'}</Link>
        </nav>
        <div className="App-title">{isHome ? 'User Form' : 'Customer Form'}</div>
        <div className="App-form">
          <Routes>
            <Route element={<StepOne />} path="/" />
            <Route element={<StepTwo />} path="/two" />
          </Routes>
        </div>
      </header>
    </div>
  );
};
