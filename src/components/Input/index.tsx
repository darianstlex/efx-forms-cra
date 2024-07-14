import React from 'react';

import styles from './index.module.scss';

type TValue = string | number;
interface InputProps {
  id: string;
  name: string;
  label: string;
  error: string;
  onChange: (value: TValue) => void
}

export const Input = ({ id, label, error, onChange, name,  ...rest }: InputProps) => (
  <div className={styles.wrapper}>
    <label htmlFor={id || name}>{label}</label>
    <input
      name={name}
      id={id || name}
      className={styles.input}
      onChange={(e) => onChange(e.target.value)}
      {...rest}
    />
    {error && <span className={styles.error}>{error}</span>}
  </div>
);
