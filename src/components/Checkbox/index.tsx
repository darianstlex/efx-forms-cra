import React from 'react';

import styles from './index.module.scss';

type TValue = boolean;
interface CheckboxProps {
  label: string;
  error: string;
  errors: string[];
  value: TValue;
  onChange: (checked: TValue) => void
}

export const Checkbox = ({ label, error, errors, value, onChange, ...rest }: CheckboxProps) => (
  <div className={styles.wrapper}>
    <div className={styles.field}>
      <div className={styles.label}>{label}</div>
      <input
        type="checkbox"
        className={styles.input}
        checked={value}
        onChange={(e) => onChange(e.target.checked)}
        {...rest}
      />
    </div>
    {error && <span className={styles.error}>{error}</span>}
  </div>
);
