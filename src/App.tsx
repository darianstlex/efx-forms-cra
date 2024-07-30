import React from 'react';
import { Routes, Route, NavLink, useMatch } from 'react-router-dom';
import { Provider } from 'effector-react';

import { StepOne } from 'pages/StepOne';
import { StepTwo } from 'pages/StepTwo';
import { StepThree } from 'pages/StepThree';
import { Hooks } from 'pages/Hooks';
import { Test } from 'pages/Test';

import styles from './App.module.scss';
import { fork } from 'effector';

const isActiveNav = ({ isActive }: { isActive: boolean }) => (isActive ? styles.active : '');

const scope = fork();

export const App = () => {
  const isHome = useMatch('/');
  return (
    <Provider value={scope} >
      <div className={styles.wrapper}>
        <header className={styles.header}>
          <nav className={styles.nav}>
            <NavLink className={isActiveNav} to="/">User</NavLink>
            <NavLink className={isActiveNav} to="/customer">Customer</NavLink>
            <NavLink className={isActiveNav} to="/hooks">Hooks</NavLink>
            <NavLink className={isActiveNav} to="/test">Test</NavLink>
            <NavLink className={isActiveNav} to="/three">Three</NavLink>
          </nav>
          <div className={styles.title}>{isHome ? 'User Form' : 'Customer Form'}</div>
          <div className={styles.form}>
            <Routes>
              <Route element={<StepOne/>} path="/"/>
              <Route element={<StepTwo/>} path="/customer"/>
              <Route element={<Hooks/>} path="/hooks"/>
              <Route element={<Test/>} path="/test"/>
              <Route element={<StepThree/>} path="/three"/>
            </Routes>
          </div>
        </header>
      </div>
    </Provider>
  );
};
