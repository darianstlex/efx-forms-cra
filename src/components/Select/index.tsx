import React from 'react';

import styles from './index.module.scss';

type TValue = string | number;
interface SelectProps {
  id: string;
  name: string;
  label: string;
  error: string;
  errors: string[];
  options: { value: string, label: string }[];
  onChange: (value: TValue) => void
  value: any;
}

export const Select = ({ id, label, error, errors, onChange, name, options, value, ...rest }: SelectProps) => (
  <div className={styles.wrapper}>
    <label htmlFor={id || name}>{label}</label>
    <select
      name={name}
      id={id || name}
      className={styles.input}
      value={value || ''}
      onChange={(e) => onChange(e.target.value)}
      {...rest}
    >
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>{opt.label}</option>
      ))}
    </select>
    {error && <span className={styles.error}>{error}</span>}
  </div>
);
