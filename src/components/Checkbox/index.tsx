import React from 'react';

import styles from './index.module.scss';

type TValue = boolean;
interface CheckboxProps {
  id: string;
  name: string;
  label: string;
  error: string;
  errors: string[];
  value: any;
  onChange: (checked: TValue) => void;
}

export const Checkbox = ({ id, label, error, errors, value, onChange, name, ...rest }: CheckboxProps) => (
  <div className={styles.wrapper}>
    <div className={styles.field}>
      <label htmlFor={id || name} className={styles.label}>{label}</label>
      <input
        id={id || name}
        type="checkbox"
        className={styles.input}
        checked={value || false}
        onChange={(e) => onChange(e.target.checked)}
        {...rest}
      />
    </div>
    {error && <span className={styles.error}>{error}</span>}
  </div>
);
