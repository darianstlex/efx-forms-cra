import React from 'react';

import styles from './index.module.scss';

type TValue = string | number;
interface InputProps {
  label: string;
  error: string;
  errors: string[];
  value: TValue;
  onChange: (value: TValue) => void
}

export const Input = ({ label, error, errors, onChange, ...rest }: InputProps) => (
  <div className={styles.wrapper}>
    <div className={styles.label}>{label}</div>
    <input
      className={styles.field}
      onChange={(e) => onChange(e.target.value)}
      {...rest}
    />
    {error && <span className={styles.error}>{error}</span>}
  </div>
);
