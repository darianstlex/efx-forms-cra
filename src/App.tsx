import React from 'react';
import { Routes, Route, Link, useMatch } from 'react-router-dom';

import { StepOne } from 'pages/StepOne';
import { StepTwo } from 'pages/StepTwo';

import styles from './App.module.scss';

export const App = () => {
  const isHome = useMatch('/');
  return (
    <div className={styles.wrapper}>
      <header className={styles.header}>
        <nav className={styles.nav}>
          <Link to="/">{isHome ? 'Here' : 'There'}</Link>
          <Link to="/two">{isHome ? 'There' : 'Here'}</Link>
        </nav>
        <div className={styles.title}>{isHome ? 'User Form' : 'Customer Form'}</div>
        <div className={styles.form}>
          <Routes>
            <Route element={<StepOne />} path="/" />
            <Route element={<StepTwo />} path="/two" />
          </Routes>
        </div>
      </header>
    </div>
  );
};
