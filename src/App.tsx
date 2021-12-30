import React from 'react';
import { Routes, Route, NavLink, useMatch } from 'react-router-dom';

import { StepOne } from 'pages/StepOne';
import { StepTwo } from 'pages/StepTwo';

import styles from './App.module.scss';

const isActiveNav = ({ isActive }: { isActive: boolean }) => (isActive ? styles.active : '');

export const App = () => {
  const isHome = useMatch('/');
  return (
    <div className={styles.wrapper}>
      <header className={styles.header}>
        <nav className={styles.nav}>
          <NavLink className={isActiveNav} to="/">User</NavLink>
          <NavLink className={isActiveNav} to="/customer">Customer</NavLink>
        </nav>
        <div className={styles.title}>{isHome ? 'User Form' : 'Customer Form'}</div>
        <div className={styles.form}>
          <Routes>
            <Route element={<StepOne />} path="/" />
            <Route element={<StepTwo />} path="/customer" />
          </Routes>
        </div>
      </header>
    </div>
  );
};
