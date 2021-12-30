import React from 'react';

import styles from './index.module.scss';

type TValue = string | number;
interface InputProps {
  id: string;
  name: string;
  label: string;
  error: string;
  errors: string[];
  value: TValue;
  onChange: (value: TValue) => void
}

export const Input = ({ id, label, error, errors, onChange, name,  ...rest }: InputProps) => (
  <div className={styles.wrapper}>
    <label htmlFor={id || name}>{label}</label>
    <input
      id={id || name}
      className={styles.input}
      onChange={(e) => onChange(e.target.value)}
      {...rest}
    />
    {error && <span className={styles.error}>{error}</span>}
  </div>
);
